"use client";

import Reveal from "./Reveal";

export default function Pricing({ product, onBuy }) {
  const price = product?.price ?? 0;
  const currency = product?.currency || "ARS";

  return (
    <section className="px-5 py-20 sm:px-6 sm:py-28">
      <Reveal>
        <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-lime-400/30 bg-[#0b0d0b] shadow-[0_0_80px_rgba(163,230,53,0.08)]">
          <div className="bg-lime-400 px-6 py-3 text-center text-sm font-black uppercase tracking-widest text-black">
            Oferta especial
          </div>

          <div className="px-6 py-10 text-center sm:px-10 sm:py-14">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">
              Plan Keto 28 Días
            </p>

            <h2 className="mt-4 text-3xl font-black uppercase text-white sm:text-5xl">
              Empezá hoy
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Con tu compra recibís el Plan Keto 28 Días y la Guía de
              Alimentación Keto.
            </p>

            <div className="mt-8">
              <span className="text-4xl font-black text-lime-400 sm:text-6xl">
                {currency} {price.toLocaleString("es-AR")}
              </span>
            </div>

            <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-lime-400/30 bg-lime-400/10 px-5 py-4">
              <p className="text-sm font-black uppercase text-lime-400">
                🎁 Comprando hoy
              </p>

              <p className="mt-1 text-lg font-black text-white">
                Te llevás 300 recetas Keto de regalo
              </p>

              <p className="mt-1 text-xs text-zinc-400">
                100 desayunos + 100 almuerzos + 100 cenas
              </p>
            </div>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-zinc-400">
              Pago único. Acceso digital al material después de completar tu
              compra.
            </p>

            <button
              type="button"
              onClick={onBuy}
              disabled={!product}
              className="mt-8 w-full rounded-2xl bg-lime-400 px-8 py-5 text-lg font-black text-black transition hover:scale-[1.01] hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              QUIERO MI PLAN KETO
            </button>

            <p className="mt-4 text-xs text-zinc-500">
              🔒 Pago procesado de forma segura
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
