import { NextResponse } from "next/server";

import { getPaymentById } from "../../../../services/payment.service";

import {
  getOrderById,
  attachPaymentToOrder,
  markOrderAsDelivered,
} from "../../../../services/order.service";

import { getProductById } from "../../../../services/product.service";

import { deliverProduct } from "../../../../services/delivery.service";

export async function POST(request) {
  try {
    const body = await request.json();

    console.log(
      "Webhook recibido de Mercado Pago:",
      body
    );

    const paymentId = body?.data?.id;

    if (!paymentId) {
      console.log(
        "Webhook sin payment ID"
      );

      return NextResponse.json({
        success: true,
        message:
          "Notificación recibida sin payment ID",
      });
    }

    /*
     * Consultamos el pago directamente
     * en Mercado Pago.
     */
    const payment =
      await getPaymentById(paymentId);

    console.log(
      "Pago consultado en Mercado Pago:",
      {
        id: payment.id,
        status: payment.status,
        status_detail:
          payment.status_detail,
        external_reference:
          payment.external_reference,
        transaction_amount:
          payment.transaction_amount,
        payer_email:
          payment.payer?.email,
      }
    );

    /*
     * La external_reference contiene
     * EL ID DE NUESTRA ORDEN.
     *
     * Ejemplo:
     *
     * external_reference = "4"
     *
     * Entonces buscamos:
     *
     * orders.id = 4
     */
    const orderId =
      payment.external_reference;

    if (!orderId) {
      throw new Error(
        `El pago ${payment.id} no tiene external_reference`
      );
    }

    const order =
      await getOrderById(orderId);

    if (!order) {
      throw new Error(
        `No existe la orden ${orderId} asociada al pago ${payment.id}`
      );
    }

    console.log(
      "Orden encontrada:",
      {
        orderId: order.id,
        productId: order.product_id,
        buyerEmail: order.buyer_email,
        paymentId: order.payment_id,
        paymentStatus:
          order.payment_status,
        deliveryStatus:
          order.delivery_status,
      }
    );

    /*
     * Verificamos que el producto exista.
     */
    const product =
      getProductById(order.product_id);

    if (!product) {
      throw new Error(
        `Producto no encontrado: ${order.product_id}`
      );
    }

    /*
     * Verificamos el importe.
     */
    if (
      Number(payment.transaction_amount) !==
      Number(product.price)
    ) {
      throw new Error(
        `El monto del pago ${payment.id} no coincide con el producto`
      );
    }

    /*
     * Actualizamos payment_id y estado
     * de nuestra orden.
     *
     * Esto ocurre incluso si el pago todavía
     * está pendiente/rechazado.
     */
    let updatedOrder =
      await attachPaymentToOrder({
        orderId: order.id,
        paymentId: payment.id,
        paymentStatus:
          payment.status,
      });

    /*
     * Si todavía no está aprobado,
     * NO entregamos.
     */
    if (payment.status !== "approved") {
      console.log(
        "Pago todavía no aprobado:",
        {
          orderId: order.id,
          paymentId: payment.id,
          status: payment.status,
        }
      );

      return NextResponse.json({
        success: true,
        message:
          "Pago recibido pero todavía no está aprobado",

        order: updatedOrder,

        payment: {
          id: payment.id,
          status: payment.status,
          status_detail:
            payment.status_detail,
        },
      });
    }

    /*
     * Si ya enviamos el producto,
     * no mandamos otro email.
     */
    if (
      updatedOrder.delivery_status ===
      "sent"
    ) {
      console.log(
        "La orden ya fue entregada:",
        {
          orderId: updatedOrder.id,
          paymentId: payment.id,
        }
      );

      return NextResponse.json({
        success: true,
        message:
          "Venta ya procesada y entregada",
        order: updatedOrder,
      });
    }

    /*
     * MUY IMPORTANTE:
     *
     * El email utilizado para entregar
     * SIEMPRE sale de nuestra orden.
     *
     * NO usamos payment.payer.email.
     */
    const buyerEmail =
      updatedOrder.buyer_email;

    console.log(
      "Enviando producto al email confirmado:",
      {
        orderId: updatedOrder.id,
        email: buyerEmail,
      }
    );

    const delivery =
      await deliverProduct({
        productId:
          updatedOrder.product_id,
        buyerEmail,
      });

    /*
     * Marcamos la orden como entregada.
     */
    updatedOrder =
      await markOrderAsDelivered(
        updatedOrder.id
      );

    console.log(
      "Venta procesada completamente:",
      {
        orderId: updatedOrder.id,
        paymentId: payment.id,
        productId:
          updatedOrder.product_id,
        buyerEmail:
          updatedOrder.buyer_email,
        deliveryUrl:
          delivery.deliveryUrl,
        emailMessageId:
          delivery.emailMessageId,
      }
    );

    return NextResponse.json({
      success: true,

      message:
        "Pago aprobado y producto entregado correctamente",

      order: updatedOrder,

      delivery: {
        email: buyerEmail,
        deliveryUrl:
          delivery.deliveryUrl,
        emailMessageId:
          delivery.emailMessageId,
      },
    });
  } catch (error) {
    console.error(
      "Error procesando webhook:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "No se pudo procesar la notificación",
      },
      {
        status: 500,
      }
    );
  }
}
