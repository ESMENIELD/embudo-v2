import { Payment } from "mercadopago";
import {
  createMercadoPagoClient,
  getMercadoPagoAccessToken,
} from "../lib/mercadopago";

export async function createPayment(paymentData) {
  const client = createMercadoPagoClient();

  const payment = new Payment(client);

  return payment.create({
    body: paymentData,
  });
}

export async function getPaymentById(paymentId) {
  if (!paymentId) {
    throw new Error("paymentId es obligatorio");
  }

  const accessToken = getMercadoPagoAccessToken();

  const response = await fetch(
    `https://api.mercadopago.com/v1/payments/${paymentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Mercado Pago respondió ${response.status}: ${errorText}`
    );
  }

  return response.json();
}