import { getSupabaseAdmin } from "../lib/supabase";

export async function getOrderByPaymentId(paymentId) {
  if (!paymentId) {
    throw new Error("paymentId es obligatorio");
  }

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("payment_id", paymentId)
    .maybeSingle();

  if (error) {
    throw new Error(`Error buscando la venta: ${error.message}`);
  }

  return data;
}

export async function createOrder({
  paymentId,
  productId,
  buyerEmail,
  amount,
  currency,
  paymentStatus,
}) {
  if (!paymentId) {
    throw new Error("paymentId es obligatorio");
  }

  if (!productId) {
    throw new Error("productId es obligatorio");
  }

  if (!buyerEmail) {
    throw new Error("buyerEmail es obligatorio");
  }

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("orders")
    .insert({
      payment_id: paymentId,
      product_id: productId,
      buyer_email: buyerEmail,
      amount,
      currency,
      payment_status: paymentStatus,
      delivery_status: "pending",
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Error creando la venta: ${error.message}`);
  }

  return data;
}

export async function markOrderAsDelivered(orderId) {
  if (!orderId) {
    throw new Error("orderId es obligatorio");
  }

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("orders")
    .update({
      delivery_status: "sent",
      delivered_at: new Date().toISOString(),
    })
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    throw new Error(`Error actualizando la entrega: ${error.message}`);
  }

  return data;
}