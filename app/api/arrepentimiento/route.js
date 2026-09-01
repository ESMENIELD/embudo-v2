import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

const BUSINESS_EMAIL = "emprendiendo.ebooks@gmail.com";

export async function POST(request) {
  try {
    const body = await request.json();

    const email = body.email?.trim();
    const orderId = body.orderId?.trim();
    const reason = body.reason?.trim();

    if (!email || !orderId) {
      return NextResponse.json(
        {
          error: "El email y el número de orden son obligatorios.",
        },
        { status: 400 }
      );
    }

    const subject = `Solicitud de arrepentimiento - Orden #${orderId}`;

    const text = `
Se recibió una nueva solicitud de arrepentimiento.

DATOS DE LA SOLICITUD

Email del comprador:
${email}

Número de orden:
${orderId}

Motivo:
${reason || "No informado"}

-----------------------------------

Producto:
Plan Keto 28 Días

Esta solicitud fue enviada desde el formulario de arrepentimiento del sitio.
`;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
        <h2>Nueva solicitud de arrepentimiento</h2>

        <p>Se recibió una nueva solicitud desde el sitio web.</p>

        <hr />

        <h3>Datos del comprador</h3>

        <p>
          <strong>Email:</strong><br />
          ${email}
        </p>

        <p>
          <strong>Número de orden:</strong><br />
          ${orderId}
        </p>

        <p>
          <strong>Motivo:</strong><br />
          ${reason || "No informado"}
        </p>

        <hr />

        <p>
          <strong>Producto:</strong><br />
          Plan Keto 28 Días
        </p>

        <p style="color: #666; font-size: 13px;">
          Esta solicitud fue enviada desde el formulario de arrepentimiento
          del sitio web.
        </p>
      </div>
    `;

    await sendEmail({
      to: BUSINESS_EMAIL,
      subject,
      text,
      html,
    });

    return NextResponse.json({
      success: true,
      message: "Solicitud enviada correctamente.",
    });
  } catch (error) {
    console.error("Error al enviar solicitud de arrepentimiento:", error);

    return NextResponse.json(
      {
        error: "No se pudo enviar la solicitud. Intentá nuevamente.",
      },
      { status: 500 }
    );
  }
}
