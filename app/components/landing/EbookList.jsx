import Reveal from "./Reveal";

export default function EbookList({ ebooks = [] }) {
  const mainEbooks = ebooks.filter(
    (ebook) =>
      !ebook.title?.toLowerCase().includes("receta") &&
      !ebook.title?.toLowerCase().includes("desayuno") &&
      !ebook.title?.toLowerCase().includes("almuerzo") &&
      !ebook.title?.toLowerCase().includes("cena")
  );

  const recipeEbooks = ebooks.filter(
    (ebook) =>
      ebook.title?.toLowerCase().includes("receta") ||
      ebook.title?.toLowerCase().includes("desayuno") ||
      ebook.title?.toLowerCase().includes("almuerzo") ||
      ebook.title?.toLowerCase().includes("cena")
  );

  return (
    <section className="px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-lime-400">
              Tu compra incluye
            </p>

            <h2 className="mt-4 text-3xl font-black uppercase text-white sm:text-5xl">
              Plan + Guía Keto
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-zinc-400">
              Todo lo que necesitás para empezar a organizar tu alimentación
              Keto de una manera práctica y sencilla.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {mainEbooks.map((ebook, index) => (
            <Reveal key={ebook.id} delay={index * 80}>
              <article className="group flex h-full gap-5 rounded-3xl border border-lime-400/20 bg-[#0b0d0b] p-6 transition hover:border-lime-400/40">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-lime-400 text-2xl">
                  {ebook.icon}
                </div>

                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-lime-400">
                    Incluido con tu compra
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

        <Reveal delay={200}>
          <div className="mt-16 rounded-[2rem] border border-lime-400/40 bg-lime-400/10 p-7 text-center sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-lime-400">
              Oferta por tiempo limitado
            </p>

            <h3 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
              🎁 Comprá hoy y llevate
            </h3>

            <p className="mt-2 text-4xl font-black uppercase text-lime-400 sm:text-5xl">
              300 recetas Keto de regalo
            </p>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-300">
              Tres ebooks con recetas para acompañarte durante tu planificación
              semanal:
            </p>

            <div className="mx-auto mt-7 grid max-w-3xl gap-3 sm:grid-cols-3">
              {[
                "100 recetas para desayunos",
                "100 recetas para almuerzos",
                "100 recetas para cenas",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm font-bold text-white"
                >
                  <span className="mr-2 text-lime-400">✓</span>
                  {item}
                </div>
              ))}
            </div>

            {recipeEbooks.length > 0 && (
              <p className="mx-auto mt-6 max-w-xl text-xs text-zinc-500">
                Los 3 ebooks de recetas forman parte del regalo especial de
                300 recetas.
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
