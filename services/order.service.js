import { getSupabaseAdmin } from "../lib/supabase";

export async function getOrderById(orderId) {
  if (!orderId) {
    throw new Error("orderId es obligatorio");
  }

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .maybeSingle();

  if (error) {
    throw new Error(`Error buscando la venta: ${error.message}`);
  }

  return data;
}

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
  productId,
  buyerEmail,
  amount,
  currency,
}) {
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
      product_id: productId,
      buyer_email: buyerEmail,
      amount,
      currency,
      payment_status: "pending",
      delivery_status: "pending",
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Error creando la venta: ${error.message}`);
  }

  return data;
}

export async function attachPaymentToOrder({
  orderId,
  paymentId,
  paymentStatus,
}) {
  if (!orderId) {
    throw new Error("orderId es obligatorio");
  }

  if (!paymentId) {
    throw new Error("paymentId es obligatorio");
  }

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("orders")
    .update({
      payment_id: paymentId,
      payment_status: paymentStatus,
    })
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error asociando el pago a la venta: ${error.message}`
    );
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