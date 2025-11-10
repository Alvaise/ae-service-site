import Contact from "./Contact";

const Hero = () => (
  <section>
    <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl">
          Qualunque sia la tua esigenza di pulito, noi abbiamo la soluzione
        </h1>

        <p className="mt-4 sm:text-xl/relaxed">
          Affidabilità e dettagli che fanno la differenza per la tua casa e la tua azienda.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto">
            <a href="#contact">Richiedi un Preventivo</a>
          </button>
        </div>
      </div>
    </div>
  </section>
)

export default Hero;
