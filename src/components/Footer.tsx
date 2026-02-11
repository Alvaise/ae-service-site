import { Logo } from '@/components/Logo';

const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-200 py-12">
    <div className="mx-auto max-w-screen-xl px-4 flex flex-col md:flex-row justify-between items-center gap-6">
      <Logo />
      <p className="text-gray-500 text-sm">© {new Date().getFullYear()} AE Service. Tutti i diritti riservati.</p>
    </div>
  </footer>
);

export default Footer;
