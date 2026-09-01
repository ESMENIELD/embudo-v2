import Reveal from "./Reveal";

export default function Testimonials() {
  return (
    <section className="border-y border-white/5 bg-zinc-950 px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-lime-400">
              Experiencias reales
            </p>

            <h2 className="mt-4 text-3xl font-black uppercase text-white sm:text-5xl">
              Lo que dicen
              <span className="block text-lime-400">
                nuestras clientas
              </span>
            </h2>

            <p className="mt-5 text-base leading-7 text-zinc-400 sm:text-lg">
              Conocé las experiencias de personas que ya comenzaron a
              incorporar nuevas ideas y opciones a sus comidas.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b0d0b] p-2 shadow-2xl sm:p-4">
            <img
  src="/Testimonios.png"
  alt="Testimonios de clientas del Pack Keto"
  className="h-auto w-full rounded-2xl"
  loading="lazy"
  decoding="async"
/>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
