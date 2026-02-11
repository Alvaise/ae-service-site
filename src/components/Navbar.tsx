'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Servizi', href: '/#services' },
  { name: 'Chi Siamo', href: '/#about' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Gestione dello scroll per l'effetto ombra
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navbar Fissa */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isOpen
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6'
          }`}
      >
        <div className="mx-auto max-w-screen-xl px-4 lg:px-8">
          <div className="flex items-center justify-between">

            {/* LOGO */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              onClick={() => setIsOpen(false)}
            >
              <Logo />
            </Link>

            {/* DESKTOP MENU */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group"
                >
                  {link.name}
                  {/* Sottolineatura animata */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </Link>
              ))}

              <Link
                href="/contact"
                className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-500 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Richiedi Preventivo
              </Link>
            </nav>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="block md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
                  className="w-full h-0.5 bg-current rounded-full origin-center"
                />
                <motion.span
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  className="w-full h-0.5 bg-current rounded-full"
                />
                <motion.span
                  animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
                  className="w-full h-0.5 bg-current rounded-full origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden flex flex-col items-center"
          >
            <nav className="flex flex-col items-center gap-8 text-lg w-full">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1) }}
                  className="w-full text-center"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-2 font-medium text-gray-800 hover:text-blue-600 border-b border-gray-100"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full mt-4"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full rounded-xl bg-blue-600 px-6 py-4 text-center font-bold text-white shadow-lg active:scale-95 transition-transform"
                >
                  Richiedi Preventivo
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
