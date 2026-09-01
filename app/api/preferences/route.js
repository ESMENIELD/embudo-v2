
import { NextResponse } from "next/server";
import { Preference } from "mercadopago";
import {
  createMercadoPagoClient,
} from "../../../lib/mercadopago";
import { getProductById } from "../../../services/product.service";

export async function POST(request) {
  try {
    const body = await request.json();
    const { productId } = body;

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

        back_urls: {
          success: "https://recetasketosye.vercel.app/",
          failure: "https://recetasketosye.vercel.app/",
          pending: "https://recetasketosye.vercel.app/",
        },

        auto_return: "approved",

        binary_mode: false,
      },
    });

    console.log("Preferencia creada:", {
      id: response.id,
      productId: product.id,
    });

    return NextResponse.json({
      success: true,
      preferenceId: response.id,
    });
  } catch (error) {
    console.error("Error creando preferencia:", error);

    return NextResponse.json(
      {
        success: false,
        message: "No se pudo crear la preferencia de Mercado Pago",
      },
      { status: 500 }
    );
  }
}

