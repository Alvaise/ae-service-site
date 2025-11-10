const Services = () => (
  <section id="services" className="bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-screen-xl px-4 lg:px-8">

      {/* Section Header */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          I Nostri Servizi
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Soluzioni su misura per la tua casa e la tua azienda.
        </p>
      </div>

      {/* Service Cards Grid */}
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">

        {/* Card 1: Residential */}
        <article className="flex flex-col items-startrounded-lg border border-gray-200 p-6 shadow-sm h-full">
          <h3 className="text-lg font-semibold leading-6 text-gray-900">
            Pulizie Condominiali
          </h3>
          <p className="mt-4 text-sm leading-6 text-gray-600">
            Offriamo un servizio puntuale e affidabile per la pulizia delle scale e delle aree comuni del vostro condominio.
            Interventi programmati per garantire un ambiente sempre curato e accogliente per tutti i residenti.
          </p>
        </article>

        {/* Card 2: Commercial */}
        <article className="flex flex-col items-startrounded-lg border border-gray-200 p-6 shadow-sm h-full">
          <h3 className="text-lg font-semibold leading-6 text-gray-900">
            Pulizie Commerciali
          </h3>
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
            Per attività locali che necessitano di un'immagine professionale. Manteniamo il tuo ufficio, negozio o spazio di lavoro pulito e accogliente.
          </p>
        </article>

        {/* Card 3: Deep Cleaning */}
        <article className="flex flex-col items-startrounded-lg border border-gray-200 p-6 shadow-sm h-full">
          <h3 className="text-lg font-semibold leading-6 text-gray-900">
            Pulizie di Fondo
          </h3>
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
            La soluzione perfetta per le pulizie di primavera, traslochi, o interventi post-ristrutturazione. Un pulito profondo e dettagliato.
          </p>
        </article>

      </div>
    </div>
  </section>
)

export default Services;
