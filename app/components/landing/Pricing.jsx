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
              Accedé al pack completo
            </p>

            <h2 className="mt-4 text-3xl font-black uppercase text-white sm:text-5xl">
              Empezá hoy
            </h2>

            <div className="mt-8">
              <span className="text-4xl font-black text-lime-400 sm:text-6xl">
                {currency} {price.toLocaleString("es-AR")}
              </span>
            </div>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-zinc-400">
              Pago único. Recibís todo el material digital incluido en el
              pack.
            </p>

            <button
              type="button"
              onClick={onBuy}
              disabled={!product}
              className="mt-8 w-full rounded-2xl bg-lime-400 px-8 py-5 text-lg font-black text-black transition hover:scale-[1.01] hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              QUIERO MI PACK KETO
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
