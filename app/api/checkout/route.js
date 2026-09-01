import { NextResponse } from "next/server";
import { createPayment } from "../../../services/payment.service";
import {
  getOrderById,
  attachPaymentToOrder,
} from "../../../services/order.service";
import { getProductById } from "../../../services/product.service";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      orderId,
      productId,
      token,
      issuer_id,
      payment_method_id,
      installments,
      payer,
    } = body;

    console.log("Checkout recibido:", {
      orderId,
      productId,
      payment_method_id,
      installments,
      payerEmail: payer?.email,
    });

    if (!orderId) {
      return NextResponse.json(
        {
          success: false,
          message: "orderId es obligatorio",
        },
        { status: 400 }
      );
    }

    if (
      typeof productId !== "string" ||
      !productId.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "productId es obligatorio",
        },
        { status: 400 }
      );
    }

    const order = await getOrderById(orderId);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Orden no encontrada",
        },
        { status: 404 }
      );
    }

    if (String(order.product_id) !== String(productId)) {
      return NextResponse.json(
        {
          success: false,
          message: "La orden no corresponde al producto",
        },
        { status: 400 }
      );
    }

    if (order.payment_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Esta orden ya tiene un pago asociado",
        },
        { status: 409 }
      );
    }

    const product = getProductById(productId);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Producto no encontrado o inactivo",
        },
        { status: 404 }
      );
    }

    if (
      typeof token !== "string" ||
      !token ||
      typeof payment_method_id !== "string" ||
      !payment_method_id
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Faltan datos necesarios para procesar el pago",
        },
        { status: 400 }
      );
    }

    /*
     * IMPORTANTE:
     *
     * El email utilizado para la entrega NO viene de Mercado Pago.
     * Lo obtenemos de nuestra propia orden creada en el paso anterior.
     */
    const buyerEmail = order.buyer_email;

    const paymentData = {
      transaction_amount: Number(product.price),
      token,
      description: product.name,
      installments: Number(installments) || 1,
      payment_method_id,

      payer: {
        email: buyerEmail,
        identification: payer?.identification,
      },

      /*
       * CLAVE DEL CIRCUITO:
       *
       * Mercado Pago recibirá el ID de nuestra orden.
       * Ejemplo:
       * external_reference = "4"
       */
      external_reference: String(order.id),
    };

    if (issuer_id) {
      paymentData.issuer_id = issuer_id;
    }

    console.log("Enviando pago a Mercado Pago:", {
      orderId: order.id,
      externalReference: paymentData.external_reference,
      buyerEmail,
      amount: paymentData.transaction_amount,
    });

    const payment = await createPayment(paymentData);

    console.log("Pago creado en Mercado Pago:", {
      id: payment.id,
      status: payment.status,
      status_detail: payment.status_detail,
      external_reference: payment.external_reference,
    });

    /*
     * Asociamos inmediatamente el payment.id
     * con nuestra orden.
     *
     * El webhook volverá a verificar todo cuando
     * Mercado Pago notifique el estado definitivo.
     */
    const updatedOrder = await attachPaymentToOrder({
      orderId: order.id,
      paymentId: payment.id,
      paymentStatus: payment.status,
    });

    console.log("Pago asociado a la orden:", {
      orderId: updatedOrder.id,
      paymentId: payment.id,
      paymentStatus: payment.status,
      buyerEmail: updatedOrder.buyer_email,
    });

    return NextResponse.json({
      success: true,

      payment: {
        id: payment.id,
        status: payment.status,
        status_detail: payment.status_detail,
      },

      order: {
        id: updatedOrder.id,
        buyerEmail: updatedOrder.buyer_email,
        paymentId: updatedOrder.payment_id,
        paymentStatus: updatedOrder.payment_status,
      },
    });
  } catch (error) {
    console.error("Error procesando pago:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "No se pudo procesar el pago",
      },
      { status: 500 }
    );
  }
}
