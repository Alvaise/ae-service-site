// app/about/page.tsx
import About from "@/components/About";
import Navbar from "@/components/Navbar";
import CtaSection from "@/components/CtaSection"; // Riutilizziamo la CTA in fondo

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-20"> {/* Padding per compensare la navbar fissa */}
        <About />
      </div>
      <CtaSection />
    </main>
  );
}
