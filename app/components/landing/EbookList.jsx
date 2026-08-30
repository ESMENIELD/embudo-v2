export default function EbookList({ ebooks = [] }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          ¿Qué incluye el pack?
        </h2>

        <div className="mt-10 space-y-4">
          {ebooks.map((ebook) => (
            <div
              key={ebook.id}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                ✓
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  {ebook.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {ebook.fileName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}