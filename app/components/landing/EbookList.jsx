import Reveal from "./Reveal";

export default function EbookList({ ebooks = [] }) {
  return (
    <section className="px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-lime-400">
              Todo en un solo pack
            </p>

            <h2 className="mt-4 text-3xl font-black uppercase text-white sm:text-5xl">
              5 productos
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-zinc-400">
              Material práctico para ayudarte a organizar tus comidas,
              descubrir nuevas recetas y empezar con una estructura clara.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {ebooks.map((ebook, index) => (
            <Reveal key={ebook.id} delay={index * 80}>
              <article className="group flex h-full gap-5 rounded-3xl border border-white/10 bg-[#0b0d0b] p-6 transition hover:border-lime-400/40">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-lime-400 text-2xl">
                  {ebook.icon}
                </div>

                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-lime-400">
                    Incluido
                  </p>

                  <h3 className="text-lg font-black text-white sm:text-xl">
                    {ebook.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {ebook.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-8 rounded-3xl border border-lime-400/30 bg-lime-400/10 p-6 text-center sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-lime-400">
              Bonus
            </p>

            <h3 className="mt-2 text-2xl font-black uppercase text-white">
              🎁 300 recetas keto extra
            </h3>

            <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-400">
              Más ideas para que nunca te quedes sin opciones para tus comidas.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
