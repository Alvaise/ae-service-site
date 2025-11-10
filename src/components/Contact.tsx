'use client'
import { useState } from "react";

interface ContactData {
  name: string,
  email: string,
  message: string
};


const Contact = () => {
  // const [contactData, setContactData] = useState({ name: '', email: '', message: '' })
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const contactData: ContactData = { name, email, message };
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.includes('@')) {
      setErrorMessage('Inserisci un indirizzo email valido');
      return;
    }

    setErrorMessage('');
    setStatus('loading');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
        setErrorMessage('Errore durante l\'invio. Riprova.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Errore di rete. Riprova piu tardi.');
    }

  };

  return (
    <section id="contact" className="bg-gray-100 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-4 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Contattaci
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Richiedi un preventivo gratuito. Ti risponderemo in 24 ore.
          </p>
        </div>

        <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-y-6">

            {/* Nome Field */}
            <div>
              <label htmlFor="nome" className="block text-sm font-semibold leading-6 text-gray-900">
                Nome
              </label>
              <div className="mt-2.5">
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  onChange={e => setName(e.target.value)}
                  value={name}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                Messaggio
              </label>
              <div className="mt-2.5">
                <textarea
                  id="message"
                  name="message"
                  rows={4} // Give it a default height
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  onChange={e => setMessage(e.target.value)}
                  value={message}
                />
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <div className="mt-10">
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {status === 'loading' ? 'Invio in corso...' : 'Invia Richiesta'}
            </button>
            {/* Messaggi di feedback */}
            {status === 'success' && (
              <p className="mt-4 text-sm font-medium text-green-600 text-center">
                Messaggio inviato con successo!
              </p>
            )}
            {errorMessage && <p className="mt-2 text-sm text-red-600 font-medium">{errorMessage}</p>}
          </div>
        </form>
      </div>
    </section>)
}

export default Contact;
