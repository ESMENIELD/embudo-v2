import { NextResponse } from "next/server";
import { getPaymentById } from "../../../../services/payment.service";
import {
  getOrderById,
  getOrderByPaymentId,
  attachPaymentToOrder,
  markOrderAsDelivered,
} from "../../../../services/order.service";
import { getProductById } from "../../../../services/product.service";
import { deliverProduct } from "../../../../services/delivery.service";

export async function POST(request) {
  try {
    const body = await request.json();

    console.log("Webhook recibido de Mercado Pago:", body);

    const paymentId = body?.data?.id;

    if (!paymentId) {
      console.log("Webhook sin payment ID");

      return NextResponse.json({
        success: true,
        message: "Notificación recibida sin payment ID",
      });
    }

    // Consultamos el pago directamente a Mercado Pago.
    const payment = await getPaymentById(paymentId);

    console.log("Pago consultado en Mercado Pago:", {
      id: payment.id,
      status: payment.status,
      status_detail: payment.status_detail,
      external_reference: payment.external_reference,
      transaction_amount: payment.transaction_amount,
      payer_email: payment.payer?.email,
    });

    // Solo procesamos pagos aprobados.
    if (payment.status !== "approved") {
      return NextResponse.json({
        success: true,
        message: "Pago recibido pero todavía no está aprobado",
        payment: {
          id: payment.id,
          status: payment.status,
          status_detail: payment.status_detail,
        },
      });
    }

    /*
     * IMPORTANTÍSIMO:
     *
     * external_reference ya NO contiene el productId.
     *
     * Ahora contiene el ID de nuestra orden.
     *
     * Ejemplo:
     * external_reference = "4"
     *
     * Entonces buscamos:
     * orders.id = 4
     */
    const orderId = payment.external_reference;

    if (!orderId) {
      throw new Error(
        `El pago ${payment.id} no tiene external_reference`
      );
    }

    const order = await getOrderById(orderId);

    if (!order) {
      throw new Error(
        `No se encontró la orden ${orderId} asociada al pago ${payment.id}`
      );
    }

    console.log("Orden encontrada:", {
      orderId: order.id,
      buyerEmail: order.buyer_email,
      productId: order.product_id,
      paymentId: order.payment_id,
      paymentStatus: order.payment_status,
      deliveryStatus: order.delivery_status,
    });

    // Verificación adicional:
    // si este payment.id ya está asociado a otra orden,
    // no procesamos el pago nuevamente.
    const existingPaymentOrder = await getOrderByPaymentId(
      payment.id
    );

    if (
      existingPaymentOrder &&
      Number(existingPaymentOrder.id) !== Number(order.id)
    ) {
      throw new Error(
        `El pago ${payment.id} ya está asociado a otra orden (${existingPaymentOrder.id})`
      );
    }

    const product = getProductById(order.product_id);

    if (!product) {
      throw new Error(
        `Producto no encontrado: ${order.product_id}`
      );
    }

    // Verificamos que el importe pagado coincida con el producto.
    if (
      Number(payment.transaction_amount) !==
      Number(product.price)
    ) {
      throw new Error(
        `El monto del pago ${payment.id} no coincide con el producto`
      );
    }

    /*
     * ASOCIAMOS EL PAYMENT.ID A NUESTRA ORDEN.
     *
     * El email utilizado sigue siendo:
     * order.buyer_email
     *
     * NO utilizamos payment.payer.email
     */
    let updatedOrder = await attachPaymentToOrder({
      orderId: order.id,
      paymentId: payment.id,
      paymentStatus: payment.status,
    });

    console.log("Pago asociado a la orden:", {
      orderId: updatedOrder.id,
      paymentId: updatedOrder.payment_id,
      buyerEmail: updatedOrder.buyer_email,
      paymentStatus: updatedOrder.payment_status,
    });

    // Si ya fue entregada, no enviamos otro email.
    if (updatedOrder.delivery_status === "sent") {
      console.log(
        `La orden ${updatedOrder.id} ya fue entregada. No se envía otro email.`
      );

      return NextResponse.json({
        success: true,
        message: "Venta ya procesada y entregada",
        order: updatedOrder,
      });
    }

    /*
     * ENTREGA
     *
     * Usamos EXCLUSIVAMENTE el email que el cliente
     * introdujo y confirmó en nuestro checkout.
     */
    const delivery = await deliverProduct({
      productId: updatedOrder.product_id,
      buyerEmail: updatedOrder.buyer_email,
    });

    // Marcamos la orden como entregada.
    updatedOrder = await markOrderAsDelivered(
      updatedOrder.id
    );

    console.log("Venta procesada completamente:", {
      orderId: updatedOrder.id,
      paymentId: payment.id,
      productId: updatedOrder.product_id,
      buyerEmail: updatedOrder.buyer_email,
      deliveryUrl: delivery.deliveryUrl,
      emailMessageId: delivery.emailMessageId,
    });

    return NextResponse.json({
      success: true,
      message: "Pago aprobado y producto entregado correctamente",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error procesando webhook:", error);

    return NextResponse.json(
      {
        success: false,
        message: "No se pudo procesar la notificación",
      },
      { status: 500 }
    );
  }
}
