import { NextResponse } from "next/server";
import { createPayment } from "../../../services/payment.service";
import { getProductById } from "../../../services/product.service";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      productId,
      token,
      issuer_id,
      payment_method_id,
      installments,
      payer,
    } = body;

    if (typeof productId !== "string" || !productId.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "productId es obligatorio",
        },
        { status: 400 }
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
      !payment_method_id ||
      !payer?.email
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Faltan datos necesarios para procesar el pago",
        },
        { status: 400 }
      );
    }

    const paymentData = {
      transaction_amount: product.price,
      token,
      description: product.name,
      installments,
      payment_method_id,
      payer: {
        email: payer.email,
        identification: payer.identification,
      },
      external_reference: product.id,
    };

    if (issuer_id) {
      paymentData.issuer_id = issuer_id;
    }

    const payment = await createPayment(paymentData);
    console.log("Pago creado en Mercado Pago:", {
  id: payment.id,
  status: payment.status,
  status_detail: payment.status_detail,
  external_reference: payment.external_reference,
});

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        status: payment.status,
        status_detail: payment.status_detail,
      },
    });
  } catch (error) {
    console.error("Error procesando pago:", error);

    return NextResponse.json(
      {
        success: false,
        message: "No se pudo procesar el pago",
      },
      { status: 500 }
    );
  }
}