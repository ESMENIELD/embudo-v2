import { NextResponse } from "next/server";
import { Preference } from "mercadopago";

import {
  createMercadoPagoClient,
} from "../../../lib/mercadopago";

import {
  getProductById,
} from "../../../services/product.service";

import {
  createOrder,
} from "../../../services/order.service";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      productId,
      buyerEmail,
    } = body;

    /*
     * Validamos producto
     */
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

    /*
     * Validamos email
     */
    if (
      typeof buyerEmail !== "string" ||
      !buyerEmail.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "El email es obligatorio",
        },
        { status: 400 }
      );
    }

    const normalizedEmail = buyerEmail
      .trim()
      .toLowerCase();

    /*
     * Buscamos el producto
     */
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

    /*
     * PRIMERO:
     * Creamos nuestra orden en Supabase.
     *
     * En este momento:
     *
     * payment_id = NULL
     * payment_status = pending
     *
     * El ID generado por Supabase será
     * nuestra referencia única.
     */
    const order = await createOrder({
      productId: product.id,
      buyerEmail: normalizedEmail,
      amount: product.price,
      currency: product.currency,
    });

    console.log(
      "Orden creada:",
      {
        orderId: order.id,
        productId: order.product_id,
        buyerEmail: order.buyer_email,
      }
    );

    /*
     * SEGUNDO:
     * Creamos la preferencia de Mercado Pago.
     *
     * external_reference = order.id
     *
     * Esto permite que cuando llegue el webhook
     * podamos saber exactamente a qué orden
     * pertenece el pago.
     */
    const client = createMercadoPagoClient();

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        purpose: "wallet_purchase",

        items: [
          {
            id: product.id,
            title: product.name,
            quantity: 1,
            currency_id: product.currency,
            unit_price: product.price,
          },
        ],

        external_reference: String(order.id),

        back_urls: {
          success:
            "https://recetasketosye.vercel.app/",
          failure:
            "https://recetasketosye.vercel.app/",
          pending:
            "https://recetasketosye.vercel.app/",
        },

        auto_return: "approved",

        binary_mode: false,
      },
    });

    console.log(
      "Orden y preferencia creadas:",
      {
        orderId: order.id,
        productId: product.id,
        buyerEmail: normalizedEmail,
        preferenceId: response.id,
        externalReference: String(order.id),
      }
    );

    return NextResponse.json({
      success: true,
      preferenceId: response.id,
      orderId: order.id,
    });
  } catch (error) {
    console.error(
      "Error creando orden/preferencia:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "No se pudo preparar el medio de pago",
      },
      { status: 500 }
    );
  }
}