export default function Guarantee() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-lime-400/20 bg-lime-400/[0.06] p-8 text-center shadow-2xl md:p-12">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-lime-400/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-lime-400/30 bg-lime-400/10 text-3xl">
              🛡️
            </div>

            <h2 className="mt-6 text-3xl font-black text-white md:text-4xl">
              Garantía de satisfacción
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/60">
              Queremos que disfrutes tu Pack Keto 28 Días. Si tenés algún
              inconveniente con tu compra o con el acceso al contenido,
              estamos para ayudarte.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70">
                ✓ Compra segura
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70">
                ✓ Acceso digital
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70">
                ✓ Soporte
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
