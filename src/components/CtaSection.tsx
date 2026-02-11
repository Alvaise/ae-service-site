import Link from "next/link";
import React from "react";

const CtaSection = () => {
  return (
    <section className="bg-blue-600 py-16 text-center">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Pronto a trasformare i tuoi spazi?
        </h2>
        <p className="mt-4 text-lg text-blue-100">
          Richiedi oggi un preventivo gratuito e senza impegno. Rispondiamo in 24 ore.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/contact"
            className="rounded-md bg-white px-8 py-4 text-lg font-bold text-blue-600 shadow-lg hover:bg-gray-100 transition-colors"
          >
            Richiedi un Preventivo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
