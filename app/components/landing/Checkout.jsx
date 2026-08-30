"use client";

import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { useState } from "react";

const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;

if (publicKey) {
  initMercadoPago(publicKey);
}

export default function Checkout({ product }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!product) {
    return null;
  }

  if (!publicKey) {
    return (
      <section className="px-6 py-16">
        <div className="mx-auto max-w-xl rounded-2xl border border-yellow-300 bg-yellow-50 p-6">
          <h2 className="text-xl font-bold">
            Checkout no configurado
          </h2>

          <p className="mt-2 text-gray-700">
            Falta configurar NEXT_PUBLIC_MP_PUBLIC_KEY.
          </p>
        </div>
      </section>
    );
  }

  async function handleSubmit({ paymentMethod, formData }) {
    setLoading(true);
    setMessage("Procesando pago...");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "No se pudo procesar el pago"
        );
      }

      if (data.payment?.status === "approved") {
        setMessage(
          "¡Pago aprobado! Estamos preparando tu acceso."
        );
      } else if (data.payment?.status === "pending") {
        setMessage(
          "El pago está pendiente de confirmación."
        );
      } else if (data.payment?.status === "rejected") {
        setMessage(
          "El pago fue rechazado. Podés intentar nuevamente."
        );
      } else {
        setMessage(
          `Estado del pago: ${
            data.payment?.status || "desconocido"
          }`
        );
      }
    } catch (error) {
      console.error("Error procesando el pago:", error);

      setMessage(
        error.message ||
          "Ocurrió un error al procesar el pago."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-xl">
        <h2 className="mb-2 text-2xl font-bold">
          Finalizá tu compra
        </h2>

        <p className="mb-6 text-gray-600">
          Total:{" "}
          <strong>
            {product.currency}{" "}
            {product.price.toLocaleString("es-AR")}
          </strong>
        </p>

        <Payment
          initialization={{
            amount: product.price,
          }}
          customization={{
            paymentMethods: {
              creditCard: "all",
              debitCard: "all",
              mercadoPago: ["wallet_purchase"],
            },
          }}
          onSubmit={handleSubmit}
          onError={(error) => {
            console.error(
              "Error en Checkout Brick:",
              error
            );

            setMessage(
              "Ocurrió un error en el formulario de pago."
            );
          }}
        />

        {loading && (
          <p className="mt-4 text-sm text-gray-600">
            Procesando pago...
          </p>
        )}

        {message && !loading && (
          <p className="mt-4 text-sm text-gray-600">
            {message}
          </p>
        )}
      </div>
    </section>
  );
}