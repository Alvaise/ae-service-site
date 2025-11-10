import Link from "next/link";

const Navbar = () => (
  <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">

        {/* Logo / Nome Azienda */}
        <div className="flex-1 md:flex md:items-center md:gap-12">
          <Link className="block text-blue-600" href="/">
            <span className="sr-only">Home</span>
            {/* Qui potremmo mettere il logo, per ora usiamo il testo */}
            <span className="text-2xl font-bold">AE Service</span>
          </Link>
        </div>

        {/* Menu di Navigazione */}
        <div className="md:flex md:items-center md:gap-12">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#servizi"
                >
                  Servizi
                </a>
              </li>
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#about"
                >
                  Chi Siamo
                </a>
              </li>
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#contact"
                >
                  Contatti
                </a>
              </li>
            </ul>
          </nav>

          {/* Menu Mobile (Semplificato per MVP) - Per ora nascosto */}
          <div className="flex items-center gap-4">
            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </header>)

export default Navbar;
