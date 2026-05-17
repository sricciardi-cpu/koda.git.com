import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, message, projectType } = parsed.data;

    // Resend integration — requires RESEND_API_KEY in env
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "Koda <noreply@koda.git.com>",
        to: process.env.CONTACT_EMAIL ?? "hola@koda.git.com",
        subject: `Nuevo contacto: ${projectType} — ${name}`,
        text: `Nombre: ${name}\nEmail: ${email}\nTipo de proyecto: ${projectType}\n\nMensaje:\n${message}`,
        html: `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Tipo de proyecto:</strong> ${projectType}</p>
          <hr />
          <p><strong>Mensaje:</strong></p>
          <p style="white-space:pre-wrap">${message}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
