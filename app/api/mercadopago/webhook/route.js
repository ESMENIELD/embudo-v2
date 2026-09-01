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

    const paymentId = body?.data?.id;

    if (!paymentId) {
      return NextResponse.json({
        success: true,
        message: "Notificación recibida sin payment ID",
      });
    }

    /*
     * Consultamos el pago directamente
     * en Mercado Pago.
     */
    const payment = await getPaymentById(paymentId);

    /*
     * La external_reference contiene
     * el ID de nuestra orden.
     */
    const orderId = payment.external_reference;

    if (!orderId) {
      throw new Error(
        `El pago ${payment.id} no tiene external_reference`
      );
    }

    /*
     * Buscamos nuestra orden.
     */
    const order = await getOrderById(orderId);

    if (!order) {
      throw new Error(
        `No existe la orden asociada al pago`
      );
    }

    /*
     * Verificamos que el producto exista.
     */
    const product = getProductById(order.product_id);

    if (!product) {
      throw new Error(
        `Producto no encontrado: ${order.product_id}`
      );
    }

    /*
     * Verificamos que el importe coincida.
     */
    if (
      Number(payment.transaction_amount) !==
      Number(product.price)
    ) {
      throw new Error(
        "El monto del pago no coincide con el producto"
      );
    }

    /*
     * Actualizamos payment_id y estado
     * de nuestra orden.
     */
    let updatedOrder = await attachPaymentToOrder({
      orderId: order.id,
      paymentId: payment.id,
      paymentStatus: payment.status,
    });

    /*
     * Si el pago todavía no está aprobado,
     * no entregamos el producto.
     */
    if (payment.status !== "approved") {
      return NextResponse.json({
        success: true,
        message: "Pago recibido pero todavía no está aprobado",
        order: updatedOrder,
        payment: {
          id: payment.id,
          status: payment.status,
          status_detail: payment.status_detail,
        },
      });
    }

    /*
     * Si ya enviamos el producto,
     * no mandamos otro email.
     */
    if (updatedOrder.delivery_status === "sent") {
      return NextResponse.json({
        success: true,
        message: "Venta ya procesada y entregada",
        order: updatedOrder,
      });
    }

    /*
     * El email utilizado para entregar
     * siempre sale de nuestra orden.
     */
    const buyerEmail = updatedOrder.buyer_email;

    /*
     * Entregamos el producto incluyendo
     * el número de orden.
     */
    const delivery = await deliverProduct({
      productId: updatedOrder.product_id,
      buyerEmail,
      orderId: updatedOrder.id,
    });

    /*
     * Marcamos la orden como entregada
     * solamente después de enviar el email.
     */
    updatedOrder = await markOrderAsDelivered(
      updatedOrder.id
    );

    return NextResponse.json({
      success: true,
      message: "Pago aprobado y producto entregado correctamente",
      order: updatedOrder,
      delivery: {
        email: buyerEmail,
        deliveryUrl: delivery.deliveryUrl,
        emailMessageId: delivery.emailMessageId,
      },
    });
  } catch (error) {
    console.error(
      "Error procesando webhook:",
      error.message
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
