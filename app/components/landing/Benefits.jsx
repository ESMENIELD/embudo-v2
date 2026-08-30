export default function Benefits({ benefits = [] }) {
  return (
    <section className="bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          ¿Qué vas a encontrar?
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.id}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {benefit.title}
              </h3>

              <p className="mt-3 text-gray-600">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}