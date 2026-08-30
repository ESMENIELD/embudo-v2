import { NextResponse } from "next/server";
import { getPaymentById } from "../../../../services/payment.service";
import {
  createOrder,
  getOrderByPaymentId,
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

    const productId = payment.external_reference;

    if (!productId) {
      throw new Error(
        `El pago ${payment.id} no tiene external_reference`
      );
    }

    const product = getProductById(productId);

    if (!product) {
      throw new Error(
        `Producto no encontrado: ${productId}`
      );
    }

    // Verificamos que el importe sea el correcto.
    if (
      Number(payment.transaction_amount) !==
      Number(product.price)
    ) {
      throw new Error(
        `El monto del pago ${payment.id} no coincide con el producto`
      );
    }

    // Buscamos si ya procesamos este pago.
    const existingOrder = await getOrderByPaymentId(payment.id);

    if (existingOrder) {
      console.log(
        `La venta ${existingOrder.id} ya existe para el pago ${payment.id}`
      );

      // Si ya fue entregada, no enviamos otro email.
      if (existingOrder.delivery_status === "sent") {
        return NextResponse.json({
          success: true,
          message: "Venta ya procesada y entregada",
          order: existingOrder,
        });
      }

      // Si existe pero quedó pendiente, intentamos entregar.
      const delivery = await deliverProduct({
        productId: existingOrder.product_id,
        buyerEmail: existingOrder.buyer_email,
      });

      const updatedOrder = await markOrderAsDelivered(
        existingOrder.id
      );

      console.log("Entrega completada:", {
        orderId: updatedOrder.id,
        email: existingOrder.buyer_email,
        deliveryUrl: delivery.deliveryUrl,
      });

      return NextResponse.json({
        success: true,
        message: "Venta pendiente entregada correctamente",
        order: updatedOrder,
      });
    }

    const buyerEmail = payment.payer?.email;

    if (!buyerEmail) {
      throw new Error(
        `El pago ${payment.id} no contiene el email del comprador`
      );
    }

    // Registramos la venta.
    const order = await createOrder({
      paymentId: payment.id,
      productId: product.id,
      buyerEmail,
      amount: payment.transaction_amount,
      currency: payment.currency_id || product.currency,
      paymentStatus: payment.status,
    });

    console.log("Venta registrada en Supabase:", order);

    // Enviamos el acceso por email.
    const delivery = await deliverProduct({
      productId: product.id,
      buyerEmail,
    });

    // Marcamos la entrega como realizada.
    const updatedOrder = await markOrderAsDelivered(
      order.id
    );

    console.log("Venta procesada completamente:", {
      orderId: updatedOrder.id,
      paymentId: payment.id,
      productId: product.id,
      buyerEmail,
      deliveryUrl: delivery.deliveryUrl,
    });

    return NextResponse.json({
      success: true,
      message: "Pago procesado y producto entregado correctamente",
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
