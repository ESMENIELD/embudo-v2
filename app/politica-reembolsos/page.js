export default function PoliticaReembolsosPage() {
  return (
    <main className="min-h-screen bg-[#050605] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className="text-sm font-semibold text-lime-400 hover:text-lime-300"
        >
          ← Volver al inicio
        </a>

        <h1 className="mt-8 text-4xl font-black">
          Política de reembolsos
        </h1>

        <div className="mt-10 space-y-8 text-sm leading-7 text-white/70">
          <section>
            <h2 className="text-xl font-bold text-white">
              Producto digital
            </h2>

            <p className="mt-3">
              El Pack Keto 28 Días es un producto digital y su entrega se
              realiza mediante acceso electrónico al contenido.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">
              Garantía de satisfacción
            </h2>

            <p className="mt-3">
              Queremos que tu experiencia con el Pack Keto 28 Días sea
              satisfactoria. Si tenés algún inconveniente con tu compra,
              comunicate con nosotros para que podamos revisar tu caso y
              ayudarte.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">
              Problemas de acceso
            </h2>

            <p className="mt-3">
              Si realizaste el pago y no recibiste el acceso al contenido,
              verificaremos la operación y te ayudaremos a obtenerlo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">
              Compras duplicadas
            </h2>

            <p className="mt-3">
              Si se produce una compra duplicada por error, comunicate con
              nosotros indicando los datos de las operaciones para que podamos
              revisar la situación.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">
              Derecho de arrepentimiento
            </h2>

            <p className="mt-3">
              Cuando corresponda, podés ejercer tu derecho de arrepentimiento
              utilizando el botón disponible en este sitio.
            </p>

            <a
              href="/arrepentimiento"
              className="mt-5 inline-flex rounded-full bg-lime-400 px-6 py-3 font-bold text-black transition hover:bg-lime-300"
            >
              BOTÓN DE ARREPENTIMIENTO
            </a>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">
              Importante
            </h2>

            <p className="mt-3">
              Esta política no limita los derechos que puedan corresponder al
              consumidor de acuerdo con la normativa aplicable.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
