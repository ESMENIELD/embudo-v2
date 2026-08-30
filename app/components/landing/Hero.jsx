export default function Hero({ product }) {
  return (
    <section className="px-6 py-16 text-center">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-purple-600">
          Producto digital
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {product?.name}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          {product?.description}
        </p>

        <div className="mt-8">
          <span className="text-3xl font-bold text-gray-900">
            {product?.currency}{" "}
            {product?.price?.toLocaleString("es-AR")}
          </span>
        </div>
      </div>
    </section>
  );
}