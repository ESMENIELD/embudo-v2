import { MercadoPagoConfig } from "mercadopago";

export function createMercadoPagoClient() {
  const accessToken = process.env.MP_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("MP_ACCESS_TOKEN no está configurado");
  }

  return new MercadoPagoConfig({
    accessToken,
  });
}

export function getMercadoPagoAccessToken() {
  const accessToken = process.env.MP_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("MP_ACCESS_TOKEN no está configurado");
  }

  return accessToken;
}