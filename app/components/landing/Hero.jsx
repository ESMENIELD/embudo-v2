"use client";

import Reveal from "./Reveal";

export default function Hero({ product }) {
  const price = product?.price ?? 0;
  const currency = product?.currency || "ARS";

  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-12 sm:px-6 sm:pb-28 sm:pt-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-lime-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <span className="inline-flex rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-lime-300">
            Método Keto
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Transformá tu alimentación
            <span className="block text-lime-400">en 28 días</span>
            con el método keto
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-xl sm:leading-8">
            Un plan práctico para organizar tus comidas, saber qué comer y
            avanzar con una estructura clara durante 28 días.
          </p>
        </Reveal>

        <Reveal delay={250}>
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-lime-400/30 bg-lime-400/10 px-6 py-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-lime-400">
              Con tu compra recibís
            </p>

            <p className="mt-2 text-xl font-black uppercase text-white sm:text-2xl">
              Plan Keto 28 Días + Guía de Alimentación Keto
            </p>

            <p className="mt-3 text-base font-bold text-lime-300">
              🎁 Y si comprás hoy, te llevás 300 recetas Keto de regalo
            </p>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="rounded-2xl border border-lime-400/20 bg-zinc-900/80 px-7 py-4">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Oferta especial
              </p>

              <p className="mt-1 text-3xl font-black text-lime-400">
                {currency} {price.toLocaleString("es-AR")}
              </p>
            </div>

            <a
              href="#checkout"
              className="w-full rounded-2xl bg-lime-400 px-8 py-4 text-center text-base font-black text-black transition hover:scale-[1.02] hover:bg-lime-300 sm:w-auto"
            >
              QUIERO MI PLAN KETO
            </a>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              "Plan Keto de 28 días",
              "Guía de alimentación Keto",
              "🎁 300 recetas de regalo",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-zinc-300"
              >
                <span className="mr-2 text-lime-400">✓</span>
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
