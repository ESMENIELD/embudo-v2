"use client";

import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { useState } from "react";

const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;

if (publicKey) {
  initMercadoPago(publicKey, {
    locale: "es-AR",
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Checkout({ product }) {
  const [step, setStep] = useState(1);

  const [buyerEmail, setBuyerEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  const [loading, setLoading] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [orderId, setOrderId] = useState(null);

  if (!product) {
    return null;
  }

  if (!publicKey) {
    return (
      <section className="bg-[#050605] px-6 py-16 text-white">
        <div className="mx-auto max-w-xl rounded-3xl border border-red-500/30 bg-[#101310] p-6">
          <h2 className="text-xl font-bold">
            Checkout no configurado
          </h2>

          <p className="mt-2 text-gray-400">
            Falta configurar NEXT_PUBLIC_MP_PUBLIC_KEY.
          </p>
        </div>
      </section>
    );
  }

  async function handleContinue() {
    setEmailError("");
    setMessage("");

    const email = buyerEmail.trim().toLowerCase();
    const confirmation = confirmEmail.trim().toLowerCase();

    if (!email) {
      setEmailError("Ingresá tu email.");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Ingresá un email válido.");
      return;
    }

    if (!confirmation) {
      setEmailError("Confirmá tu email.");
      return;
    }

    if (email !== confirmation) {
      setEmailError("Los emails no coinciden.");
      return;
    }

    try {
      setLoading(true);
      setMessage("Preparando tu pago...");

      const response = await fetch("/api/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          buyerEmail: email,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "No se pudo preparar el medio de pago."
        );
      }

      setPreferenceId(data.preferenceId);
      setOrderId(data.orderId);
      setStep(2);
      setMessage("");
    } catch (error) {
      console.error("Error preparando checkout:", error);

      setMessage(
        error.message ||
          "No se pudo preparar el medio de pago."
      );
    } finally {
      setLoading(false);
    }
  }

  function handlePaymentSubmit() {
    setLoading(true);
    setMessage(
      "Procesando tu pago. No cierres esta ventana..."
    );
  }

  function handlePaymentError(error) {
    console.error("Error en Checkout Brick:", error);

    setLoading(false);

    setMessage(
      "Ocurrió un error en el formulario de pago. Podés intentar nuevamente."
    );
  }

  return (
    <section
      id="checkout"
      className="bg-[#050605] px-6 py-20 text-white"
    >
      <div className="mx-auto max-w-2xl">

        {/* CABECERA */}

        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#B7FF00]">
            Compra segura
          </p>

          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            Finalizá tu compra
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-gray-400">
            Completá tus datos y recibí el acceso al Pack
            Keto directamente en tu email.
          </p>
        </div>

        {/* TARJETA */}

        <div className="rounded-3xl border border-white/10 bg-[#0D100D] p-6 shadow-2xl md:p-8">

          {/* PRODUCTO / PRECIO */}

          <div className="mb-8 flex items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <p className="text-sm text-gray-400">
                Estás comprando
              </p>

              <p className="mt-1 font-bold">
                {product.name}
              </p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-black text-[#B7FF00]">
                {product.currency}{" "}
                {product.price.toLocaleString("es-AR")}
              </p>
            </div>
          </div>

          {/* PASO 1 */}

          {step === 1 && (
            <div>

              <div className="mb-6">
                <div className="mb-1 text-xs font-bold uppercase tracking-widest text-[#B7FF00]">
                  Paso 1 de 2
                </div>

                <h3 className="text-2xl font-black">
                  ¿Dónde querés recibir tu compra?
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  Este es el email al que enviaremos el
                  acceso después de confirmar tu pago.
                </p>
              </div>

              <div className="space-y-5">

                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="buyerEmail"
                    className="mb-2 block text-sm font-bold"
                  >
                    Tu email
                  </label>

                  <input
                    id="buyerEmail"
                    type="email"
                    value={buyerEmail}
                    onChange={(event) =>
                      setBuyerEmail(event.target.value)
                    }
                    placeholder="nombre@email.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-white/10 bg-[#050605] px-4 py-4 text-white outline-none transition placeholder:text-gray-600 focus:border-[#B7FF00] focus:ring-2 focus:ring-[#B7FF00]/20"
                  />
                </div>

                {/* CONFIRMACION */}

                <div>
                  <label
                    htmlFor="confirmEmail"
                    className="mb-2 block text-sm font-bold"
                  >
                    Confirmá tu email
                  </label>

                  <input
                    id="confirmEmail"
                    type="email"
                    value={confirmEmail}
                    onChange={(event) =>
                      setConfirmEmail(event.target.value)
                    }
                    placeholder="Volvé a escribir tu email"
                    autoComplete="email"
                    className="w-full rounded-xl border border-white/10 bg-[#050605] px-4 py-4 text-white outline-none transition placeholder:text-gray-600 focus:border-[#B7FF00] focus:ring-2 focus:ring-[#B7FF00]/20"
                  />
                </div>

                {/* ERROR */}

                {emailError && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300">
                    {emailError}
                  </div>
                )}

                {/* AVISO */}

                <div className="rounded-xl border border-[#B7FF00]/10 bg-[#B7FF00]/5 p-4 text-sm text-gray-300">
                  <span className="mr-2 font-bold text-[#B7FF00]">
                    ✓
                  </span>

                  Revisá bien tu email. El enlace de
                  acceso será enviado exactamente a esta
                  dirección.
                </div>

                {/* BOTON */}

                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={loading}
                  className="w-full rounded-xl bg-[#B7FF00] px-6 py-4 font-black uppercase tracking-wide text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "PREPARANDO..."
                    : "CONTINUAR AL PAGO →"}
                </button>

              </div>
            </div>
          )}

          {/* PASO 2 */}

          {step === 2 && preferenceId && (
            <div>

              <div className="mb-6 flex items-center justify-between gap-4">

                <div>
                  <div className="mb-1 text-xs font-bold uppercase tracking-widest text-[#B7FF00]">
                    Paso 2 de 2
                  </div>

                  <h3 className="text-2xl font-black">
                    Elegí cómo pagar
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setMessage("");
                    setPreferenceId(null);
                    setOrderId(null);
                  }}
                  className="text-sm text-gray-400 underline underline-offset-4 transition hover:text-[#B7FF00]"
                >
                  Cambiar email
                </button>

              </div>

              {/* EMAIL CONFIRMADO */}

              <div className="mb-6 rounded-xl border border-[#B7FF00]/20 bg-[#B7FF00]/5 p-4">

                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Tu compra será enviada a
                </p>

                <p className="mt-1 break-all font-semibold text-[#B7FF00]">
                  {buyerEmail}
                </p>

              </div>

              {/* MERCADO PAGO */}

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#050605] p-3">

                <Payment
                  initialization={{
                    amount: product.price,
                    preferenceId,
                  }}

                  customization={{
                    paymentMethods: {
                      creditCard: "all",
                      debitCard: "all",
                      mercadoPago: ["wallet_purchase"],
                    },

                    visual: {
                      style: {
                        theme: "dark",
                      },

                      texts: {
                        formTitle: "Elegí cómo pagar",
                        emailSectionTitle:
                          "Datos de contacto",
                        installmentsSectionTitle:
                          "Elegí las cuotas",
                        formSubmit: "Pagar ahora",
                      },
                    },
                  }}

                  onSubmit={handlePaymentSubmit}

                  onError={handlePaymentError}
                />

              </div>

              {/* SEGURIDAD */}

              <div className="mt-5 space-y-2 text-center text-xs text-gray-500">

                <p>
                  🔒 Pago procesado de forma segura por
                  Mercado Pago.
                </p>

                <p>
                  Tu acceso será enviado al email que
                  confirmaste anteriormente.
                </p>

                {orderId && (
                  <p className="text-[10px] text-gray-700">
                    Orden #{orderId}
                  </p>
                )}

              </div>

            </div>
          )}

          {/* MENSAJE */}

          {message && (
            <div className="mt-6 rounded-xl border border-[#B7FF00]/20 bg-[#B7FF00]/5 p-4 text-center text-sm text-gray-300">
              {message}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
