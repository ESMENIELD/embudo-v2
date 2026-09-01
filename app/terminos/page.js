export default function TerminosPage() {
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
          Términos y condiciones
        </h1>

        <div className="mt-10 space-y-8 text-sm leading-7 text-white/70">
          <section>
            <h2 className="text-xl font-bold text-white">
              1. Identificación del vendedor
            </h2>

            <p className="mt-3">
              El producto es comercializado por:
            </p>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p>
                <strong className="text-white">Nombre:</strong> Solange Ferrin
              </p>

              <p>
                <strong className="text-white">CUIT:</strong>{" "}
                27-33772433-2
              </p>

            
              <p>
                <strong className="text-white">Email:</strong>{" "}
                emprendiendo.ebooks@gmail.com
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">
              2. Producto
            </h2>

            <p className="mt-3">
              El producto ofrecido es el <strong className="text-white">
                Plan Keto 28 Días
              </strong>
              , un material digital diseñado para acompañar la organización
              de las comidas durante un período de 28 días.
            </p>

            <p className="mt-4">
              Con la compra del Plan Keto 28 Días se incluye también la{" "}
              <strong className="text-white">
                Guía de Alimentación Keto
              </strong>
              .
            </p>

            <p className="mt-4">
              Adicionalmente, de acuerdo con la oferta vigente al momento de
              la compra, el comprador recibe{" "}
              <strong className="text-white">
                300 recetas Keto de regalo
              </strong>
              , correspondientes a 100 recetas para desayunos, 100 recetas
              para almuerzos y 100 recetas para cenas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">
              3. Precio y forma de pago
            </h2>

            <p className="mt-3">
              El precio vigente del producto es de{" "}
              <strong className="text-white">$7.000 ARS</strong>.
              El pago se procesa mediante Mercado Pago.
            </p>

            <p className="mt-4">
              El precio aplicable será el que se encuentre informado en el
              sitio al momento de realizar la compra.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">
              4. Entrega del producto
            </h2>

            <p className="mt-3">
              Una vez confirmado el pago, el acceso al contenido digital será
              enviado al correo electrónico informado durante el proceso de
              compra.
            </p>

            <p className="mt-4">
              Es responsabilidad del comprador proporcionar una dirección de
              correo electrónico válida y verificar también las carpetas de
              correo no deseado o spam.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">
              5. Uso del contenido
            </h2>

            <p className="mt-3">
              El material adquirido está destinado al uso personal del
              comprador. No está permitida su reproducción, distribución,
              reventa, publicación o comercialización sin autorización.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">
              6. Información sobre alimentación
            </h2>

            <p className="mt-3">
              El contenido tiene finalidad informativa y educativa. No
              constituye asesoramiento médico, nutricional ni profesional
              personalizado.
            </p>

            <p className="mt-4">
              Ante condiciones particulares de salud, embarazo, medicación o
              cualquier otra situación que requiera atención profesional, se
              recomienda consultar con un profesional de la salud antes de
              realizar cambios en la alimentación.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">
              7. Arrepentimiento, cancelaciones y reembolsos
            </h2>

            <p className="mt-3">
              Las solicitudes relacionadas con arrepentimiento, cancelaciones
              o reembolsos serán gestionadas de acuerdo con la normativa
              aplicable y las condiciones correspondientes a la compra.
            </p>

            <p className="mt-4">
              El comprador puede iniciar una solicitud utilizando nuestro{" "}
              <a
                href="/arrepentimiento"
                className="font-semibold text-lime-400 hover:text-lime-300"
              >
                Botón de arrepentimiento
              </a>
              .
            </p>

            <p className="mt-4">
              Las solicitudes recibidas a través de dicho formulario serán
              enviadas para su gestión al email de contacto del vendedor:
            </p>

            <p className="mt-3 font-semibold text-white">
              emprendiendo.ebooks@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">
              8. Contacto
            </h2>

            <p className="mt-3">
              Para consultas relacionadas con la compra, el acceso al
              producto o cualquier otra cuestión vinculada con el servicio,
              podés comunicarte mediante:
            </p>

            <p className="mt-3 font-semibold text-white">
              emprendiendo.ebooks@gmail.com
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
