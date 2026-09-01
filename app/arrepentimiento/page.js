"use client";

import { useState } from "react";

export default function ArrepentimientoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    const data = {
      email: formData.get("email"),
      orderId: formData.get("orderId"),
      reason: formData.get("reason"),
    };

    try {
      const response = await fetch("/api/arrepentimiento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "No se pudo enviar la solicitud."
        );
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "No se pudo enviar la solicitud. Intentá nuevamente."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050605] px-6 py-16 text-white">
      <div className="mx-auto max-w-xl">
        <a
          href="/"
          className="text-sm font-semibold text-lime-400 hover:text-lime-300"
        >
          ← Volver al inicio
        </a>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl md:p-10">
          <div className="mb-8">
            <span className="inline-flex rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-lime-400">
              Solicitud de arrepentimiento
            </span>

            <h1 className="mt-5 text-3xl font-black md:text-4xl">
              Botón de arrepentimiento
            </h1>

            <p className="mt-4 text-sm leading-6 text-white/60">
              Completá tus datos para enviar una solicitud relacionada con
              tu compra.
            </p>

            <p className="mt-3 text-sm leading-6 text-white/50">
              La solicitud será enviada al email de contacto del vendedor
              para su gestión.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-lime-400/30 bg-lime-400/10 p-6">
              <h2 className="text-xl font-bold text-lime-400">
                Solicitud enviada correctamente
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/70">
                Recibimos tu solicitud y fue enviada correctamente.
                Será revisada y se pondrán en contacto con vos para
                continuar con la gestión.
              </p>

              <a
                href="/"
                className="mt-6 inline-block rounded-xl bg-lime-400 px-5 py-3 text-sm font-black text-black transition hover:bg-lime-300"
              >
                VOLVER AL INICIO
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email utilizado en la compra
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-lime-400"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="orderId"
                  className="mb-2 block text-sm font-semibold"
                >
                  Número de orden
                </label>

                <input
                  id="orderId"
                  name="orderId"
                  type="text"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-lime-400"
                  placeholder="Ej: 4"
                />
              </div>

              <div>
                <label
                  htmlFor="reason"
                  className="mb-2 block text-sm font-semibold"
                >
                  Motivo
                </label>

                <textarea
                  id="reason"
                  name="reason"
                  rows="4"
                  className="w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-lime-400"
                  placeholder="Podés contarnos brevemente el motivo de tu solicitud."
                />
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-lime-400 px-6 py-4 font-black text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "ENVIANDO..." : "ENVIAR SOLICITUD"}
              </button>
            </form>
          )}

          <p className="mt-6 text-xs leading-5 text-white/40">
            La información enviada será utilizada para identificar la compra
            y gestionar la solicitud correspondiente.
          </p>

          <p className="mt-2 text-xs leading-5 text-white/40">
            Contacto para la gestión de solicitudes:
            emprendiendo.ebooks@gmail.com
          </p>
        </div>
      </div>
    </main>
  );
}
