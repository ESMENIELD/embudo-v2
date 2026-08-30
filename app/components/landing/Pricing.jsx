export default function Pricing({ product, onBuy }) {
  const price = product?.price ?? 0;
  const currency = product?.currency || "ARS";

  return (
    <section className="bg-purple-50 px-6 py-16">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Accedé al pack completo
        </h2>

        <p className="mt-6 text-4xl font-bold text-purple-700">
          {currency} {price.toLocaleString("es-AR")}
        </p>

        <button
          type="button"
          onClick={onBuy}
          disabled={!product}
          className="mt-8 rounded-xl bg-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Comprar ahora
        </button>
      </div>
    </section>
  );
}