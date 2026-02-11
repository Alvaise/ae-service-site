'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Store, Sparkles } from 'lucide-react';

// Dati dei servizi aggiornati con le "features" (punti elenco)
const services = [
  {
    title: 'Pulizie Condominiali',
    description: 'Offriamo un servizio puntuale per la pulizia delle scale e delle aree comuni. Il biglietto da visita del tuo palazzo, sempre in ordine.',
    features: ['Pulizia scale e pianerottoli', 'Igienizzazione corrimano e ascensori', 'Lavaggio vetrate ingresso', 'Gestione rotazione sacchi'],
    icon: <Building2 strokeWidth={2.25} className="w-10 h-10 text-white" />,
    color: 'bg-blue-600',
    shadow: 'shadow-blue-500/20',
    text: 'text-blue-700',
    bullet: 'bg-blue-100 text-blue-700'
  },
  {
    title: 'Pulizie Commerciali',
    description: 'Manteniamo il tuo ufficio o negozio pulito e accogliente. Un ambiente di lavoro sano migliora la produttività e l\'immagine aziendale.',
    features: ['Spolveratura scrivanie e arredi', 'Sanificazione servizi igienici', 'Lavaggio pavimenti tecnici', 'Svuotamento cestini'],
    icon: <Store strokeWidth={2.25} className="w-10 h-10 text-white" />,
    color: 'bg-sky-500',
    shadow: 'shadow-sky-500/20',
    text: 'text-sky-700',
    bullet: 'bg-sky-100 text-sky-700'
  },
  {
    title: 'Pulizie di Fondo',
    description: 'La soluzione perfetta per le pulizie di primavera o post-ristrutturazione. Un intervento profondo che ridà vita ai tuoi spazi.',
    features: ['Rimozione residui di cantiere', 'Deceratura e trattamento pavimenti', 'Lavaggio profondo vetrate', 'Igienizzazione a vapore'],
    icon: <Sparkles strokeWidth={2.25} className="w-10 h-10 text-white" />,
    color: 'bg-slate-700',
    shadow: 'shadow-slate-700/20',
    text: 'text-slate-800',
    bullet: 'bg-slate-100 text-slate-800'
  },
];

const Services = () => {
  const pathRef = React.useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = React.useState(0);

  React.useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  const draw = {
    hidden: { strokeDashoffset: pathLength, strokeDasharray: pathLength },
    visible: {
      strokeDashoffset: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 2,
        ease: "easeInOut"
      }
    }
  };
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
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" /> {/* Blue */}
                <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.3" /> {/* Sky */}
                <stop offset="100%" stopColor="#475569" stopOpacity="0.3" /> {/* Slate */}
              </linearGradient>
            </defs>

            <motion.path
              ref={pathRef}
              d="M 75 0 C 75 25, 25 25, 25 50 C 25 75, 75 75, 75 100"
              stroke="url(#waveGradient)"
              strokeWidth="6"
              vectorEffect="non-scaling-stroke"
              fill="none"
              strokeLinecap="round"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
              variants={draw}
            />
          </svg>
        </div>

        {/* --- LINEA DRITTA (Solo Mobile) --- */}
        <motion.div
          className="md:hidden absolute left-8 top-[180px] bottom-20 w-2 -translate-x-1/2 bg-gradient-to-b from-blue-200 via-sky-200 to-slate-200 z-0 rounded-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: 0.5, duration: 1 }}
        ></motion.div>

        {/* Contenitore Cards */}
        <div className="flex flex-col gap-20 relative z-10">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;

            const cardVariants = {
              hidden: { opacity: 0, x: isEven ? -100 : 100 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
            };

            return (
              <motion.div
                key={service.title}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${!isEven ? 'md:flex-row-reverse' : ''}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
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
                  <div className={`bg-white p-8 rounded-3xl shadow-sm border border-blue-50 hover:shadow-md transition-shadow duration-300 relative overflow-hidden group`}>

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
              </motion.div>
            );
          })}
        </div>

      </div>
    </section >
  );
};

export default Services;
