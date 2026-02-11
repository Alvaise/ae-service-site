import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    const data = await resend.emails.send({
      from: "AE Service Website <onboarding@resend.dev>",
      to: ["alvi412@gmail.com"],
      subject: `Nuova richiesta da ${name}`,
      replyTo: email,
      text: `
        Hai ricevuto un nuovo messaggio dal sito web:
        
        Nome: ${name}
        Email: ${email}
        Messaggio:
        ${message}
      `,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
