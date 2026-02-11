import Image from "next/image"

const team = [
  { name: 'Elena Rossi', role: 'Titolare e Fondatrice', image: '/team-elena.png' },
  { name: 'Marco Bianchi', role: 'Specialista Commerciale', image: '/team-marco.png' },
  { name: 'Sara Gallo', role: 'Specialista Condomini', image: '/team-sara.png' },
  { name: 'Luca Ferrero', role: 'Addetto Pulizie di Fondo', image: '/team-luca.png' },
  { name: 'Giulia Conti', role: 'Supporto Clienti', image: '/team-giulia.png' },
]

const About = () =>
(
  <section id="about" className="bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-screen-xl px-4 lg:px-8">

      {/* --- Section 1: The "Chi Siamo" Story (Title + Text + Group Photo) --- */}
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16">

        {/* Text Column */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Chi Siamo
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Fondata sulla passione per l'ordine e la cura dei dettagli, AE Service è una realtà locale del Canavese. Non siamo una grande multinazionale, siamo persone del posto, proprio come te.
          </p>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            La nostra missione è semplice: portare tranquillità nelle vostre case e uffici con un servizio professionale di cui vi potete fidare, ogni singola volta.
          </p>
        </div>

        {/* Group Photo Column */}
        <div className="flex items-center justify-center">
          <Image
            alt="Il team di AE Service al lavoro" // Test looks for this
            src="/group.png"
            width={1024}
            height={1024}
            className="w-full max-w-lg h-auto rounded-lg object-cover shadow-xl"
          />
        </div>
      </div>


    </div>
  </section>)


export default About;
