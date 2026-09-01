"use client";

import Reveal from "./Reveal";

export default function CTA({
  title = "¿LISTA/O PARA COMENZAR?",
  description = "Accedé ahora al Pack Keto y empezá a organizar tus comidas de una manera simple.",
  buttonText = "QUIERO MI PACK KETO",
  onClick,
}) {
  return (
    <section className="px-6 py-20 sm:py-28">
      <Reveal>
        <div className="mx-auto max-w-4xl rounded-3xl border border-lime-400/30 bg-lime-400 px-6 py-12 text-center text-black shadow-[0_0_60px_rgba(163,230,53,0.12)] sm:px-10">
          <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
            {title}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base font-medium sm:text-lg">
            {description}
          </p>

          <button
            type="button"
            onClick={onClick}
            className="mt-8 rounded-xl bg-black px-8 py-4 text-base font-bold text-white transition hover:scale-[1.02] hover:bg-zinc-900"
          >
            {buttonText}
          </button>
        </div>
      </Reveal>
    </section>
  );
}
