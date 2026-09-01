import Link from "next/link";

export default function LegalFooter() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-lime-400">
              Pack Keto 28 Días
            </p>

            <p className="mt-2 max-w-md text-sm leading-6 text-white/50">
              Contenido digital para acompañarte durante tus 28 días de
              organización y alimentación keto.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/60">
            <Link
              href="/terminos"
              className="transition hover:text-lime-400"
            >
              Términos y condiciones
            </Link>

            <Link
              href="/politica-reembolsos"
              className="transition hover:text-lime-400"
            >
              Política de reembolsos
            </Link>

            <Link
              href="/arrepentimiento"
              className="font-semibold text-lime-400 transition hover:text-lime-300"
            >
              Botón de arrepentimiento
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-xs leading-5 text-white/40">
          <p>
            © {new Date().getFullYear()} Pack Keto 28 Días. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
