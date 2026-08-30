import { NextResponse } from "next/server";
import { getAllProducts } from "../../../services/product.service";

export async function GET() {
  try {
    const products = getAllProducts();

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error obteniendo productos:", error);

    return NextResponse.json(
      {
        success: false,
        message: "No se pudieron obtener los productos",
      },
      {
        status: 500,
      }
    );
  }
}