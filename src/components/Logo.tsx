import React from 'react';
import Image from 'next/image'; // Importa il componente Image

export const LogoIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  // Usiamo un div relativo per contenere l'immagine e rispettare le dimensioni passate (w-10 h-10)
  <div className={`relative ${className}`}>
    <Image
      src="/JustLogoAEReviseted.svg" // <--- Sostituisci con il nome esatto del tuo file in public (es. "/miologo.svg")
      alt="AE Service Logo"
      fill // "fill" fa adattare l'immagine al div contenitore
      className="object-contain" // Mantiene le proporzioni senza tagliare il logo
      priority // Carica il logo immediatamente (importante per la LCP)
    />
  </div>
);

export const Logo = () => (
  <div className="flex items-center gap-3">
    <LogoIcon className="w-10 h-10" />
    <span className="text-xl font-bold text-gray-900 tracking-tight">
      AE <span className="text-blue-600">Service</span>
    </span>
  </div>
);
