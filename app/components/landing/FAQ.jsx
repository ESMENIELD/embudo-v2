export default function FAQ({ questions = [] }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Preguntas frecuentes
        </h2>

        <div className="mt-10 space-y-4">
          {questions.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-gray-200 p-6"
            >
              <h3 className="font-semibold text-gray-900">
                {item.question}
              </h3>

              <p className="mt-3 text-gray-600">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}