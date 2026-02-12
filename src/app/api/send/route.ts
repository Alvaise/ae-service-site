import { FormState } from "@/components/ContactForm";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
function textForEmail(dataForm: FormState) {
  const isCompany = dataForm.client_type === "company";
  const subjectPrefix = isCompany
    ? `[AZIENDA] ${dataForm.companyName}`
    : `[PRIVATO] ${dataForm.name}`;
  const subject = `Hai ricevuto una nuova richiesta di preventivo da ${subjectPrefix}`;
  const contactMethod = dataForm.email === "" ? "Email" : "Telefono";
  const text = `
  Hai ricevuto una richiesta di preventivo.
  
  DETTAGLIO CONTATTO:
  -------------------
  Nome: ${dataForm.name}
  Tipo Cliente: ${isCompany ? "AZIENDA" : "PRIVATO"}
  Metodo di Contatto preferito: ${contactMethod}

  ${contactMethod === "Email" ? dataForm.email : dataForm.phone_number}
  -------------------

  SERVIZIO RICHIESTO: ${dataForm.service}

  Ricorda di Ricontattarli al piú presto.
  `;
  return { subject, text };
}

export async function POST(request: NextRequest) {
  try {
    const dataClient: FormState = await request.json();
    const { subject, text } = textForEmail(dataClient);
    // 1. Leggi la variabile d'ambiente
    const recipientsEnv = process.env.EMAIL_RECIPIENTS;

    // 2. Controllo di sicurezza: se manca la variabile, ferma tutto
    if (!recipientsEnv) {
      console.error(
        "ERRORE: Variabile EMAIL_RECIPIENTS mancante nel file .env",
      );
      return NextResponse.json(
        { error: "Configurazione server errata" },
        { status: 500 },
      );
    }
    const recipients = recipientsEnv.split(",").map((email) => email.trim());
    const data = await resend.emails.send({
      from: "AE Service Website <quotes@ae-service.it>",
      to: recipients,
      subject: subject,
      replyTo: dataClient.email,
      text: text,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
