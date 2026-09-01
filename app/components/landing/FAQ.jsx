import Reveal from "./Reveal";

export default function FAQ({ questions = [] }) {
  return (
    <section className="border-t border-white/5 px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-lime-400">
              ¿Tenés dudas?
            </p>

            <h2 className="mt-4 text-3xl font-black uppercase text-white sm:text-5xl">
              Preguntas frecuentes
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 space-y-4">
          {questions.map((item, index) => (
            <Reveal key={item.id} delay={index * 70}>
              <details className="group rounded-2xl border border-white/10 bg-[#0b0d0b]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-bold text-white sm:p-6">
                  <span>{item.question}</span>

                  <span className="shrink-0 text-2xl text-lime-400 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="border-t border-white/5 px-5 pb-5 pt-4 text-sm leading-7 text-zinc-400 sm:px-6 sm:pb-6">
                  {item.answer}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
