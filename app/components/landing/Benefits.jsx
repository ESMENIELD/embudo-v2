import Reveal from "./Reveal";

export default function Benefits({ benefits = [] }) {
  return (
    <section className="border-y border-white/5 bg-zinc-950 px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-lime-400">
              Una transformación más simple
            </p>

            <h2 className="mt-4 text-3xl font-black uppercase text-white sm:text-5xl">
              Todo lo que necesitás
              <span className="block text-lime-400">
                en un solo lugar
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.id} delay={index * 100}>
              <article className="h-full rounded-3xl border border-white/10 bg-[#0b0d0b] p-7 transition hover:-translate-y-1 hover:border-lime-400/40">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-400 text-xl font-black text-black">
                  ✓
                </div>

                <h3 className="text-xl font-black text-white">
                  {benefit.title}
                </h3>

                <p className="mt-3 leading-7 text-zinc-400">
                  {benefit.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
