import AboutTeaser from "@/components/AboutTeaser";
import CtaSection from "@/components/CtaSection";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <AboutTeaser />
      <CtaSection />
    </>
  );
}
