import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      {/* Qui renderizziamo il form completo */}
      <ContactForm />
    </main>
  );
}
