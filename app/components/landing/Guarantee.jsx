import Reveal from "./Reveal";

export default function Guarantee() {
  return (
    <section className="px-5 py-20 sm:px-6 sm:py-28">
      <Reveal>
        <div className="mx-auto max-w-4xl rounded-3xl border border-lime-400/30 bg-lime-400/10 p-8 text-center sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-lime-400 text-4xl">
            🛡️
          </div>

          <p className="mt-7 text-sm font-black uppercase tracking-[0.2em] text-lime-400">
            Compra protegida
          </p>

          <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-5xl">
            Garantía de 7 días
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
            Queremos que puedas conocer el material y decidir si realmente
            es para vos. Por eso tu compra cuenta con una garantía de
            satisfacción de 7 días.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-500">
            Si el contenido no cumple con tus expectativas, podés solicitar
            el reembolso dentro del período establecido.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
