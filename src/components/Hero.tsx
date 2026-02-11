'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative bg-white overflow-hidden">

      {/* Background Decorativo: Un tocco caldo e accogliente */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/40 to-white z-0"></div>

      <div className="mx-auto max-w-screen-xl px-4 lg:px-8 py-16 lg:py-28 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* COLONNA TESTO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* BADGE LOCALE: Area geografica precisa */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-800 text-sm font-bold mb-8 border border-blue-100 shadow-sm">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>Operativi a Chivasso, nel Canavese e provincia di Torino</span>
            </div>

            {/* TITOLO: Promessa di valore + Fiducia */}
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
              Il pulito che ti meriti, <br />
              <span className="text-blue-600">con la cura di un vicino.</span>
            </h1>

            {/* SOTTOTITOLO: La tua frase + Tocco Umano */}
            <div className="mb-10 max-w-2xl mx-auto lg:mx-0">
              <p className="text-xl text-gray-700 font-medium mb-3">
                "Qualunque sia la tua esigenza di pulito, noi abbiamo la soluzione."
              </p>
              <p className="text-lg text-gray-500 leading-relaxed">
                Dimentica i call center e le app anonime. Noi siamo AE Service: persone reali che rispondono al telefono e si prendono cura dei tuoi spazi con rispetto e puntualità.
              </p>
            </div>

            {/* CTA: Azioni chiare */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/contact"
                className="rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-blue-200 hover:bg-blue-700 hover:shadow-2xl hover:-translate-y-1 transition-all text-center"
              >
                Parla con Noi
              </Link>
              <Link
                href="#services"
                className="rounded-2xl bg-white px-8 py-4 text-lg font-bold text-gray-600 border-2 border-gray-100 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50 transition-all text-center"
              >
                Cosa Facciamo
              </Link>
            </div>

            {/* SOCIAL PROOF: Focalizzato sulle famiglie */}
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-3 text-sm font-medium text-gray-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-9 h-9 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-400 overflow-hidden shadow-sm">
                    <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                ))}
              </div>
              <p>La scelta di fiducia di <span className="text-gray-900 font-bold underline decoration-blue-300 decoration-2">50+ aziende</span> nel Canavese e nella provincia di Torino.</p>
            </div>

          </motion.div>

          {/* COLONNA FOTO: Più "calda" e organica */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
            className="relative mx-auto w-full max-w-md lg:max-w-full mt-12 lg:mt-0"
          >
            {/* Decorazione Sfondo Organica (Blob) */}
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] z-0 opacity-40 text-blue-100" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.1C93.5,9,82.2,22.4,71.2,33.8C60.2,45.2,49.5,54.6,37.6,62.3C25.7,70,12.6,76,-0.9,77.6C-14.4,79.1,-29.1,76.3,-42.6,69.4C-56.1,62.5,-68.4,51.5,-76.6,38.1C-84.8,24.7,-88.9,8.9,-86.6,-5.8C-84.3,-20.5,-75.6,-34.1,-64.4,-44.6C-53.2,-55.1,-39.5,-62.5,-26,-66.9C-12.5,-71.3,0.8,-72.7,14.6,-75.1L44.7,-76.4Z" transform="translate(100 100)" />
            </svg>

            {/* Immagine Principale */}
            <div className="relative z-10 group">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white transform transition-transform duration-500 hover:scale-[1.01]">
                <Image
                  src="/team.jpg"
                  alt="Il team di AE Service al completo"
                  width={800}
                  height={600}
                  className="object-cover w-full h-auto"
                  priority
                />
              </div>

              {/* Didascalia "A mano" sotto la foto - Tocco Umano Finale */}
              <div className="absolute -bottom-6 -right-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100 rotate-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm font-medium text-gray-600">
                    <span className="font-bold text-gray-900">Elena e il Team</span> sono pronti ad aiutarti!
                  </p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
