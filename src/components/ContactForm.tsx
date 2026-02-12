'use client';
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants, HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { Phone, Mail, Building2, Sparkles, Home, Briefcase, HelpCircle, Pencil } from 'lucide-react';

type FormSteps = 'type' | 'companyName' | 'name' | 'contactMethod' | 'email' | 'phone' | 'service' | 'submit';

export interface FormState {
  name?: string;
  companyName?: string;
  email?: string;
  client_type?: 'company' | 'privateer';
  phone_number?: string;
  message?: string;
  service?: string;
};

// --- CONFIGURAZIONE ANIMAZIONE ---
const containerVariants: Variants = {
  hidden: { opacity: 0, x: 20, scale: 0.99 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    x: -20,
    scale: 0.99,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const ContactForm: React.FC = () => {
  const [step, setStep] = useState<FormSteps>('type');
  const [formData, setFormData] = useState<FormState>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);

  // --- NUOVO STATO PER MODALITÀ MODIFICA ---
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Se siamo in modalità modifica, non aggiorniamo la barra di progresso in modo lineare
    if (isEditing) return;

    const stepsList: FormSteps[] = ['type', 'companyName', 'name', 'contactMethod', 'email', 'phone', 'service', 'submit'];
    const currentIndex = stepsList.indexOf(step);
    const newProgress = ((currentIndex) / (stepsList.length - 1)) * 100;
    setProgress(newProgress);
  }, [step, isEditing]);

  // --- HELPER DI NAVIGAZIONE ---

  // Funzione per andare al prossimo step o tornare al riepilogo
  const nextStepOrSummary = (nextStep: FormSteps) => {
    if (isEditing) {
      setIsEditing(false); // Fine modifica
      setStep('submit');   // Torna al riepilogo
    } else {
      setStep(nextStep);   // Flusso normale
    }
  };

  // Funzione per iniziare la modifica da un campo specifico
  const startEditing = (targetStep: FormSteps) => {
    setIsEditing(true);
    setStep(targetStep);
  };

  // --- LOGICA AGGIORNATA ---

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeSelect = (typeSelected: 'privateer' | 'company') => {
    setFormData((prev) => ({ ...prev, type: typeSelected }));

    // Caso speciale: se cambio tipo, devo assicurarmi di raccogliere i dati giusti
    if (isEditing) {
      // Se passo a Privato, non serve nome azienda, torno al riepilogo
      if (typeSelected === 'privateer') {
        setIsEditing(false);
        setStep('submit');
      } else {
        // Se passo ad Azienda, devo chiedere il nome azienda (rimango in editing)
        setStep('companyName');
      }
    } else {
      // Flusso normale
      typeSelected === 'company' ? setStep('companyName') : setStep('name');
    }
  };

  const handleCompanyNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.companyName?.trim()) {
      nextStepOrSummary('name');
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name?.trim()) {
      nextStepOrSummary('contactMethod');
    }
  };

  const handleMethodSelect = (method: 'email' | 'phone') => {
    // Se stiamo modificando, saltiamo direttamente all'input specifico
    if (isEditing) {
      setStep(method);
    } else {
      setStep(method);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email?.includes('@')) {
      nextStepOrSummary('service');
    }
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone_number && formData.phone_number.length > 6) {
      nextStepOrSummary('service');
    }
  };

  const handleServiceSelect = (serviceName: string) => {
    setFormData(prev => ({ ...prev, service: serviceName }));
    // Qui andiamo sempre al submit/riepilogo, sia in edit che normale
    setIsEditing(false);
    setStep('submit');
  };

  const submitForm = async () => {
    setStatus('loading');
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setStatus(response.ok ? 'success' : 'error');
    } catch (error) {
      setStatus('error');
    }
  };

  // --- COMPONENTI UI ---

  const QuestionTitle = ({ children }: { children: React.ReactNode }) => (
    <motion.h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-12 leading-tight">
      {children}
    </motion.h2>
  );

  const BigInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <motion.div className="w-full">
      <input
        {...props}
        className="block w-full rounded-xl border-0 px-6 py-5 text-gray-900 text-xl shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 transition-all bg-gray-50 focus:bg-white"
      />
    </motion.div>
  );

  interface PrimaryButtonProps extends HTMLMotionProps<"button"> {
    isLoading?: boolean;
    children: React.ReactNode;
  }

  const PrimaryButton = ({ children, isLoading, ...props }: PrimaryButtonProps) => (
    <motion.button

      {...props}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      disabled={isLoading || (props as any).disabled}
      className="w-full md:w-auto md:min-w-[200px] rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-blue-500 hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          Invio...
        </span>
      ) : children}
    </motion.button>
  );

  const SelectionCard = ({ icon, title, onClick }: { icon: React.ReactNode, title: string, onClick: () => void }) => (
    <motion.button
      type="button"
      variants={itemVariants}
      onClick={onClick}
      className="group flex flex-col md:flex-row items-center gap-4 w-full p-6 md:p-8 bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50/30 transition-all hover:scale-[1.02] shadow-sm hover:shadow-lg h-full"
    >
      <div className="p-4 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <span className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{title}</span>
    </motion.button>
  );

  // Helper per le righe del riepilogo
  const SummaryRow = ({ label, value, stepToJump }: { label: string, value: string | undefined, stepToJump: FormSteps }) => (
    <div className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0">
      <div>
        <dt className="text-xs text-gray-500 uppercase tracking-wide font-semibold">{label}</dt>
        <dd className="text-lg font-medium text-gray-900 break-words">{value}</dd>
      </div>
      <button
        onClick={() => startEditing(stepToJump)}
        className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors flex items-center gap-1 text-sm font-medium"
        title={`Modifica ${label}`}
      >
        <Pencil className="w-4 h-4" />
        <span className="hidden sm:inline">Modifica</span>
      </button>
    </div>
  );

  // --- RENDER ---

  return (
    <section id="contact" className="bg-gray-50 min-h-[100dvh] py-0 md:py-24 flex flex-col justify-start md:justify-center overflow-y-auto overflow-x-hidden">

      <div className="mx-auto max-w-2xl w-full px-4 sm:px-0 relative mt-20 md:mt-0 mb-10">

        {/* Barra di progresso (Nascosta in edit mode) */}
        {step !== 'submit' && status !== 'success' && !isEditing && (
          <div className="absolute top-0 left-6 right-6 sm:left-0 sm:right-0 -mt-10 md:-mt-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-12 relative z-10 min-h-[500px] flex flex-col justify-center overflow-hidden">

          <AnimatePresence mode="wait" initial={false}>

            {/* STEP 1: TYPE */}
            {step === 'type' && (
              <motion.div
                key="step-type"
                variants={containerVariants}
                initial="hidden" animate="visible" exit="exit"
                className="flex flex-col h-full"
              >
                <QuestionTitle>Per iniziare, sei un...</QuestionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
                  <SelectionCard icon={<Home className="w-8 h-8" />} title="Privato" onClick={() => handleTypeSelect('privateer')} />
                  <SelectionCard icon={<Building2 className="w-8 h-8" />} title="Azienda / Condominio" onClick={() => handleTypeSelect('company')} />
                </div>
              </motion.div>
            )}

            {/* STEP 1.5: COMPANY NAME */}
            {step === 'companyName' && (
              <motion.form key="step-companyName" variants={containerVariants} initial="hidden" animate="visible" exit="exit" onSubmit={handleCompanyNameSubmit}>
                <label htmlFor="companyName">
                  <QuestionTitle>Come si chiama la tua attività?</QuestionTitle>
                </label>
                <div className="mt-6 md:px-8">
                  <BigInput id="companyName" name="companyName" placeholder="Es. Condominio Mimosa..." value={formData.companyName || ''} onChange={handleChange} autoFocus />
                </div>
                <div className="mt-10 flex justify-center">
                  <PrimaryButton type="submit">
                    {isEditing ? 'Salva e Torna' : 'Avanti'}
                  </PrimaryButton>
                </div>
              </motion.form>
            )}

            {/* STEP 2: NAME */}
            {step === 'name' && (
              <motion.form key="step-name" variants={containerVariants} initial="hidden" animate="visible" exit="exit" onSubmit={handleNameSubmit}>
                <label htmlFor="name">
                  <QuestionTitle>
                    {formData.client_type === 'company' ? 'Qual è il nome del referente?' : 'Come ti chiami?'}
                  </QuestionTitle>
                </label>
                <div className="mt-6 md:px-8">
                  <BigInput id="name" name="name" placeholder="Inserisci il tuo nome..." value={formData.name || ''} onChange={handleChange} autoFocus />
                </div>
                <div className="mt-10 flex justify-center">
                  <PrimaryButton type="submit">
                    {isEditing ? 'Salva e Torna' : 'Avanti'}
                  </PrimaryButton>
                </div>
              </motion.form>
            )}

            {/* STEP 3: METHOD */}
            {step === 'contactMethod' && (
              <motion.div key="step-method" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
                <QuestionTitle>Come preferisci essere ricontattato?</QuestionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
                  <SelectionCard icon={<Mail className="w-8 h-8" />} title="Via Email" onClick={() => handleMethodSelect('email')} />
                  <SelectionCard icon={<Phone className="w-8 h-8" />} title="Al Telefono" onClick={() => handleMethodSelect('phone')} />
                </div>
              </motion.div>
            )}

            {/* STEP 4A: EMAIL */}
            {step === 'email' && (
              <motion.form key="step-email" variants={containerVariants} initial="hidden" animate="visible" exit="exit" onSubmit={handleEmailSubmit}>
                <label htmlFor="email">
                  <QuestionTitle>Qual è la tua email?</QuestionTitle>
                </label>
                <div className="mt-6 md:px-8">
                  <BigInput type="email" id="email" name="email" placeholder="nome@esempio.com" value={formData.email || ''} onChange={handleChange} autoFocus />
                </div>
                <div className="mt-10 flex justify-center">
                  <PrimaryButton type="submit">
                    {isEditing ? 'Salva e Torna' : 'Avanti'}
                  </PrimaryButton>
                </div>
              </motion.form>
            )}

            {/* STEP 4B: PHONE */}
            {step === 'phone' && (
              <motion.form key="step-phone" variants={containerVariants} initial="hidden" animate="visible" exit="exit" onSubmit={handlePhoneSubmit}>
                <label htmlFor="phone_number">
                  <QuestionTitle>Qual è il tuo numero di cellulare?</QuestionTitle>
                </label>
                <div className="mt-6 md:px-8">
                  <BigInput type="tel" id="phone_number" name="phone_number" placeholder="333 1234567" value={formData.phone_number || ''} onChange={handleChange} autoFocus />
                </div>
                <div className="mt-10 flex justify-center">
                  <PrimaryButton type="submit">
                    {isEditing ? 'Salva e Torna' : 'Avanti'}
                  </PrimaryButton>
                </div>
              </motion.form>
            )}

            {/* STEP 5: SERVICE */}
            {step === 'service' && (
              <motion.div key="step-service" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
                <QuestionTitle>Infine, a quale servizio sei interessato?</QuestionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {['Pulizie Condominiali', 'Pulizie Uffici', 'Pulizie di Fondo', 'Altro'].map((srv) => {
                    let serviceIcon;
                    switch (srv) {
                      case 'Pulizie Condominiali':
                        serviceIcon = <Building2 className="w-8 h-8" />;
                        break;
                      case 'Pulizie Uffici':
                        serviceIcon = <Briefcase className="w-8 h-8" />;
                        break;
                      case 'Pulizie di Fondo':
                        serviceIcon = <Sparkles className="w-8 h-8" />;
                        break;
                      default:
                        serviceIcon = <HelpCircle className="w-8 h-8" />;
                        break;
                    }
                    return (
                      <SelectionCard
                        key={srv}
                        icon={serviceIcon}
                        title={srv}
                        onClick={() => handleServiceSelect(srv)}
                      />
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 6: SUBMIT & SUCCESS */}
            {step === 'submit' && (
              <motion.div key="step-submit" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="text-center">
                {status === 'success' ? (
                  <div className="py-8 flex flex-col items-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 mb-6">
                      <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Grazie, {formData.name}!</h2>
                    <p className="text-xl text-gray-600 mb-10 max-w-md mx-auto">La tua richiesta è stata inviata con successo. Ti contatteremo a breve.</p>
                    <Link href="/" className="inline-block rounded-xl bg-gray-100 px-8 py-4 text-lg font-semibold text-gray-900 hover:bg-gray-200 transition-colors">
                      Torna alla Home
                    </Link>
                  </div>
                ) : (
                  <div className="py-4">
                    <QuestionTitle>Tutto pronto!</QuestionTitle>
                    <p className="text-gray-600 mb-8 text-lg">Controlla i dati qui sotto e invia la richiesta.</p>

                    <motion.div variants={itemVariants} className="bg-gray-50 p-6 md:p-8 rounded-2xl border-2 border-dashed border-gray-200 text-left mb-10 max-w-lg mx-auto">
                      <dl className="flex flex-col">

                        <SummaryRow
                          label="Chi sei"
                          value={formData.client_type === 'company' ? (formData.companyName || 'Azienda') : 'Privato'}
                          stepToJump={formData.client_type === 'company' ? 'companyName' : 'type'}
                        />

                        <SummaryRow
                          label="Nome Referente"
                          value={formData.name}
                          stepToJump="name"
                        />

                        <SummaryRow
                          label="Contatto"
                          value={formData.email || formData.phone_number}
                          // Salta allo step di scelta metodo se vuole cambiare da email a telefono
                          stepToJump="contactMethod"
                        />

                        <SummaryRow
                          label="Servizio Richiesto"
                          value={formData.service}
                          stepToJump="service"
                        />

                      </dl>
                    </motion.div>

                    {status === 'error' && (
                      <p className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">Si è verificato un errore durante l&apos;invio. Riprova.</p>
                    )}

                    <PrimaryButton onClick={submitForm} isLoading={status === 'loading'}>
                      Invia Richiesta di Preventivo
                    </PrimaryButton>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
