'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AboutTeaser = () => {
  return (
    <section className="bg-white py-24 sm:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* FOTO CON EFFETTO */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Decorazione sfondo */}
            <div className="absolute inset-0 bg-blue-100 rounded-3xl transform rotate-3 scale-105 z-0"></div>
            {/* Foto ritagliata o diversa dalla Hero */}
            <div className="relative z-10 rounded-3xl overflow-hidden border-4 border-white shadow-xl">
              <Image
                src="/team.jpg" // Puoi usare la stessa o un dettaglio
                alt="Elena e Marco di AE Service"
                width={600}
                height={400}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* TESTO INTRODUTTIVO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
              Non siamo solo un'impresa di pulizie. <br />
              <span className="text-blue-600">Siamo i tuoi vicini.</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              AE Service nasce a Chivasso con un'idea semplice: portare nelle case e negli uffici la stessa cura che metteremmo nei nostri.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Dietro ogni preventivo e ogni intervento ci sono Elena, Marco e una squadra di professionisti che ci mettono la faccia (e il sorriso).
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors group"
            >
              Conosci il Team e la nostra storia
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutTeaser;
