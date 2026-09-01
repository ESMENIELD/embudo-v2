"use client";

import {
  initMercadoPago,
  Payment,
} from "@mercadopago/sdk-react";

import { useState } from "react";

const publicKey =
  process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;

if (publicKey) {
  initMercadoPago(publicKey, {
    locale: "es-AR",
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
}

export default function Checkout({
  product,
}) {
  const [step, setStep] = useState(1);

  const [buyerEmail, setBuyerEmail] =
    useState("");

  const [confirmEmail, setConfirmEmail] =
    useState("");

  const [emailError, setEmailError] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [preferenceId, setPreferenceId] =
    useState(null);

  const [orderId, setOrderId] =
    useState(null);

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
            Falta configurar
            NEXT_PUBLIC_MP_PUBLIC_KEY.
          </p>
        </div>
      </section>
    );
  }

  async function handleContinue() {
    setEmailError("");
    setMessage("");

    const email =
      buyerEmail.trim().toLowerCase();

    const confirmation =
      confirmEmail.trim().toLowerCase();

    if (!email) {
      setEmailError(
        "Ingresá tu email."
      );
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError(
        "Ingresá un email válido."
      );
      return;
    }

    if (!confirmation) {
      setEmailError(
        "Confirmá tu email."
      );
      return;
    }

    if (email !== confirmation) {
      setEmailError(
        "Los emails no coinciden."
      );
      return;
    }

    try {
      setLoading(true);
      setMessage(
        "Preparando tu pago..."
      );

      const response = await fetch(
        "/api/preferences",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            productId: product.id,
            buyerEmail: email,
          }),
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "No se pudo preparar el medio de pago."
        );
      }

      console.log(
        "Checkout preparado:",
        {
          orderId: data.orderId,
          preferenceId:
            data.preferenceId,
        }
      );

      setOrderId(data.orderId);

      setPreferenceId(
        data.preferenceId
      );

      setStep(2);

      setMessage("");
    } catch (error) {
      console.error(
        "Error preparando checkout:",
        error
      );

      setMessage(
        error.message ||
          "No se pudo preparar el medio de pago."
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * IMPORTANTE:
   *
   * Mercado Pago espera que onSubmit
   * devuelva una Promise.
   *
   * La resolvemos cuando nuestro backend
   * terminó de crear el pago.
   */
  async function handleSubmit({
    formData,
  }) {
    setLoading(true);
    setMessage(
      "Procesando tu pago. No cierres esta ventana..."
    );

    try {
      if (!orderId) {
        throw new Error(
          "No se encontró la orden de compra."
        );
      }

      console.log(
        "Enviando pago:",
        {
          orderId,
          productId: product.id,
        }
      );

      const response = await fetch(
        "/api/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            orderId,
            productId: product.id,

            /*
             * Mandamos los datos del Brick.
             */
            ...formData,
          }),
        }
      );

      const data =
        await response.json();

      console.log(
        "Respuesta de /api/checkout:",
        data
      );

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "No se pudo procesar el pago."
        );
      }

      if (
        data.payment?.status ===
        "approved"
      ) {
        setMessage(
          "¡Pago aprobado! Estamos preparando tu acceso."
        );
      } else if (
        data.payment?.status ===
          "pending" ||
        data.payment?.status ===
          "in_process"
      ) {
        setMessage(
          "El pago está pendiente de confirmación."
        );
      } else if (
        data.payment?.status ===
        "rejected"
      ) {
        setMessage(
          "El pago fue rechazado. Podés intentar nuevamente."
        );
      } else {
        setMessage(
          `Estado del pago: ${
            data.payment?.status ||
            "desconocido"
          }`
        );
      }

      /*
       * IMPORTANTE:
       *
       * Le decimos al Payment Brick:
       * "mi backend terminó correctamente".
       *
       * Esto evita que quede infinitamente
       * mostrando "Procesando pago".
       */
      return;
    } catch (error) {
      console.error(
        "Error procesando el pago:",
        error
      );

      setMessage(
        error.message ||
          "Ocurrió un error al procesar el pago."
      );

      /*
       * Al lanzar el error rechazamos
       * la operación del Brick.
       */
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-[#050605] px-6 py-20 text-white">
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
            Completá tus datos y accedé al
            Pack Keto después de que tu
            pago sea aprobado.
          </p>
        </div>

        {/* TARJETA */}

        <div className="rounded-3xl border border-white/10 bg-[#0D100D] p-6 shadow-2xl md:p-8">

          {/* PRECIO */}

          <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">

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
                {product.price.toLocaleString(
                  "es-AR"
                )}
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
                  ¿Dónde recibirás tu Pack?
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  Usaremos este email
                  exclusivamente para
                  enviarte el acceso a tu
                  compra.
                </p>

              </div>

              <div className="space-y-5">

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
                      setBuyerEmail(
                        event.target.value
                      )
                    }
                    placeholder="nombre@email.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-white/10 bg-[#050605] px-4 py-4 text-white outline-none transition placeholder:text-gray-600 focus:border-[#B7FF00] focus:ring-2 focus:ring-[#B7FF00]/20"
                  />
                </div>

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
                      setConfirmEmail(
                        event.target.value
                      )
                    }
                    placeholder="Volvé a escribir tu email"
                    autoComplete="email"
                    className="w-full rounded-xl border border-white/10 bg-[#050605] px-4 py-4 text-white outline-none transition placeholder:text-gray-600 focus:border-[#B7FF00] focus:ring-2 focus:ring-[#B7FF00]/20"
                  />
                </div>

                {emailError && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300">
                    {emailError}
                  </div>
                )}

                <div className="rounded-xl border border-[#B7FF00]/10 bg-[#B7FF00]/5 p-4 text-sm text-gray-300">
                  <span className="mr-2 text-[#B7FF00]">
                    ✓
                  </span>

                  El acceso será enviado a
                  este email después de
                  confirmar el pago.
                </div>

                <button
                  type="button"
                  onClick={
                    handleContinue
                  }
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

          {step === 2 &&
            preferenceId &&
            orderId && (
              <div>

                <div className="mb-6 flex items-center justify-between">

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
                      setPreferenceId(
                        null
                      );
                      setOrderId(null);
                      setMessage("");
                    }}
                    className="text-sm text-gray-400 underline underline-offset-4 transition hover:text-[#B7FF00]"
                  >
                    Cambiar email
                  </button>

                </div>

                <div className="mb-6 rounded-xl border border-white/10 bg-[#050605] p-4">

                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Tu acceso será enviado a
                  </p>

                  <p className="mt-1 break-all font-semibold text-[#B7FF00]">
                    {buyerEmail}
                  </p>

                  <p className="mt-2 text-xs text-gray-600">
                    Orden #{orderId}
                  </p>

                </div>

                {/* MERCADO PAGO */}

                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white p-2">

                  <Payment
                    initialization={{
                      amount:
                        product.price,
                      preferenceId,
                    }}

                    customization={{
                      paymentMethods: {
                        creditCard:
                          "all",
                        debitCard:
                          "all",
                        mercadoPago:
                          [
                            "wallet_purchase",
                          ],
                      },

                      visual: {
                        style: {
                          theme: "dark",
                        },

                        texts: {
                          formTitle:
                            "Elegí cómo pagar",
                          emailSectionTitle:
                            "Datos de contacto",
                          installmentsSectionTitle:
                            "Cuotas",
                          formSubmit:
                            "Pagar ahora",
                        },
                      },
                    }}

                    onSubmit={
                      handleSubmit
                    }

                    onError={(error) => {
                      console.error(
                        "Error en Checkout Brick:",
                        error
                      );

                      setMessage(
                        "Ocurrió un error en el formulario de pago."
                      );
                    }}

                    onReady={() => {
                      console.log(
                        "Mercado Pago Brick listo"
                      );
                    }}
                  />

                </div>

                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <span>🔒</span>

                  <span>
                    Pago procesado de forma
                    segura por Mercado
                    Pago
                  </span>
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
