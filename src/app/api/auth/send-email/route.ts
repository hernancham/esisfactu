import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { verifyEmailTemplate } from "@/template/SendVerifyEmail";

export async function POST(request: Request) {
  const { email, username, token } = await request.json();

  if (!email || !token) {
    return new Response("Email y token son requeridos", {
      status: 400,
    });
  }

  const htmlTemplate = await verifyEmailTemplate({
    email,
    username,
    token,
  });

  try {
    const result = await sendEmail({
      to: email,
      subject: "Verificación de Email",
      html: htmlTemplate,
    });

    return NextResponse.json(
      {
        accepted: result.accepted,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error al enviar el Email",
      },
      { status: 500 }
    );
  }
}
