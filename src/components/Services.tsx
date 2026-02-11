import React from 'react';

// Dati dei servizi aggiornati con le "features" (punti elenco)
const services = [
  {
    title: 'Pulizie Condominiali',
    description: 'Offriamo un servizio puntuale per la pulizia delle scale e delle aree comuni. Il biglietto da visita del tuo palazzo, sempre in ordine.',
    features: ['Pulizia scale e pianerottoli', 'Igienizzazione corrimano e ascensori', 'Lavaggio vetrate ingresso', 'Gestione rotazione sacchi'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-white">
        <path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-4h8v4M12 11v2m-2-1h4" />
      </svg>
    ),
    color: 'bg-blue-600',
    shadow: 'shadow-blue-200',
    text: 'text-blue-700',
    bullet: 'bg-blue-100 text-blue-700'
  },
  {
    title: 'Pulizie Commerciali',
    description: 'Manteniamo il tuo ufficio o negozio pulito e accogliente. Un ambiente di lavoro sano migliora la produttività e l\'immagine aziendale.',
    features: ['Spolveratura scrivanie e arredi', 'Sanificazione servizi igienici', 'Lavaggio pavimenti tecnici', 'Svuotamento cestini'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-white">
        <path d="M2 22h20M4 22V6a2 2 0 012-2h12a2 2 0 012 2v16M12 4V2m-8 8h16m-16 4h16" />
      </svg>
    ),
    color: 'bg-teal-600',
    shadow: 'shadow-teal-200',
    text: 'text-teal-700',
    bullet: 'bg-teal-100 text-teal-700'
  },
  {
    title: 'Pulizie di Fondo',
    description: 'La soluzione perfetta per le pulizie di primavera o post-ristrutturazione. Un intervento profondo che ridà vita ai tuoi spazi.',
    features: ['Rimozione residui di cantiere', 'Deceratura e trattamento pavimenti', 'Lavaggio profondo vetrate', 'Igienizzazione a vapore'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-white">
        <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456" />
      </svg>
    ),
    color: 'bg-indigo-600',
    shadow: 'shadow-indigo-200',
    text: 'text-indigo-700',
    bullet: 'bg-indigo-100 text-indigo-700'
  },
];

const Services = () => {
  return (
    <section id="services" className="bg-gray-50 py-24 sm:py-32 overflow-hidden relative">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-8 relative">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-24 relative z-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            I Nostri Servizi
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Un percorso di pulizia su misura per le tue esigenze.
          </p>
        </div>

        {/* --- LA CURVA (Visible solo su Desktop) --- */}
        <div className="hidden md:block absolute top-[220px] bottom-24 left-0 right-0 pointer-events-none z-0">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#0D9488" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            <path
              d="M 75 0 C 75 25, 25 25, 25 50 C 25 75, 75 75, 75 100"
              stroke="url(#waveGradient)"

              /* --- MODIFICA QUI: Spessore aumentato a 6 --- */
              strokeWidth="6"

              vectorEffect="non-scaling-stroke"
              fill="none"
              strokeDasharray="10 10" /* Aumentato anche il tratteggio per proporzione */
              strokeLinecap="round"   /* Arrotonda le punte dei trattini */
            />
          </svg>
        </div>

        {/* --- LINEA DRITTA (Solo Mobile) --- */}
        <div className="md:hidden absolute left-8 top-[180px] bottom-20 w-2 -translate-x-1/2 bg-gradient-to-b from-blue-200 via-teal-200 to-indigo-200 z-0 rounded-full"></div>

        {/* Contenitore Cards */}
        <div className="flex flex-col gap-20 relative z-10">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={service.title}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${!isEven ? 'md:flex-row-reverse' : ''}`}
              >

                {/* --- VISUAL (ICONA) --- */}
                <div className="flex-1 w-full flex justify-start md:justify-end items-center group pl-0 md:pl-0">
                  <div className={`relative flex items-center ${!isEven ? 'md:justify-start' : 'md:justify-end'} w-full md:px-16`}>

                    {/* Card Icona */}
                    <div className={`relative p-5 rounded-2xl shadow-xl transition-transform duration-300 hover:-translate-y-1 ${service.color} ${service.shadow} z-10`}>
                      {service.icon}
                    </div>

                    {/* Decorazione Mobile (Pallino sulla timeline) */}
                    <div className="md:hidden absolute left-8 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-gray-200 rounded-full z-0"></div>
                  </div>
                </div>

                {/* --- TESTO (CARD MIGLIORATA) --- */}
                <div className="flex-1 text-left pl-16 md:pl-0 w-full">

                  {/* NUOVO: Card bianca per il testo */}
                  <div className={`bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative overflow-hidden group`}>

                    {/* Decorazione colorata in alto alla card */}
                    <div className={`absolute top-0 left-0 w-2 h-full ${service.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>

                    <h3 className={`text-2xl font-bold tracking-tight mb-4 ${service.text}`}>
                      {service.title}
                    </h3>

                    <p className="text-lg leading-relaxed text-gray-600 mb-6">
                      {service.description}
                    </p>

                    {/* NUOVO: Lista Puntata (Features) */}
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-gray-700">
                          {/* Bullet personalizzato */}
                          <span className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${service.bullet}`}>
                            ✓
                          </span>
                          <span className="text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Bottone CTA Discreto */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <a href="/contact" className="text-sm font-semibold text-gray-900 flex items-center gap-2 group-hover:gap-3 transition-all">
                        Chiedi Preventivo <span aria-hidden="true">→</span>
                      </a>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;
