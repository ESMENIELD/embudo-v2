import { sendEmail } from "../lib/email";
import { getProductById } from "./product.service";

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

export async function deliverProduct({
  productId,
  buyerEmail,
  orderId,
}) {
  if (
    typeof buyerEmail !== "string" ||
    !buyerEmail.trim()
  ) {
    throw new Error(
      "El email del comprador es obligatorio"
    );
  }

  if (!orderId) {
    throw new Error(
      "El número de orden es obligatorio"
    );
  }

  const product = getProductById(productId);

  if (!product) {
    throw new Error(
      "Producto no encontrado o inactivo"
    );
  }

  if (
    typeof product.deliveryUrl !== "string" ||
    !product.deliveryUrl.trim()
  ) {
    throw new Error(
      "El producto no tiene un enlace de entrega configurado"
    );
  }

  const safeProductName =
    escapeHtml(product.name);

  const safeDeliveryUrl =
    escapeHtml(product.deliveryUrl);

  const safeOrderId =
    escapeHtml(orderId);

  const email = await sendEmail({
    to: buyerEmail,

    subject:
      `¡Tu Pack Keto está listo! Orden #${orderId}`,

    text:
      `¡Gracias por tu compra!\n\n` +
      `Tu Pack Keto 28 Días ya está listo.\n\n` +
      `ORDEN #${orderId}\n\n` +
      `Tu compra incluye:\n` +
      `- Plan Keto 28 Días\n` +
      `- Guía de Alimentación Keto\n` +
      `- 100 Recetas Keto para Desayunos\n` +
      `- 100 Recetas Keto para Almuerzos\n` +
      `- 100 Recetas Keto para Cenas\n\n` +
      `Accedé a tu Pack desde este enlace:\n` +
      `${product.deliveryUrl}\n\n` +
      `Importante: guardá este email y tu número de orden #${orderId} para futuras consultas.\n\n` +
      `Gracias por confiar en nosotros.`,

    html: `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Tu Pack Keto está listo</title>
        </head>

        <body
          style="
            margin: 0;
            padding: 0;
            background-color: #050605;
            font-family: Arial, Helvetica, sans-serif;
            color: #ffffff;
          "
        >

          <div
            style="
              width: 100%;
              background-color: #050605;
              padding: 40px 15px;
              box-sizing: border-box;
            "
          >

            <div
              style="
                max-width: 600px;
                margin: 0 auto;
                background-color: #0d100d;
                border: 1px solid #252925;
                border-radius: 24px;
                overflow: hidden;
              "
            >

              <!-- HEADER -->

              <div
                style="
                  padding: 38px 30px 30px;
                  text-align: center;
                  background-color: #0d100d;
                "
              >

                <div
                  style="
                    display: inline-block;
                    padding: 8px 14px;
                    border: 1px solid #b7ff00;
                    border-radius: 999px;
                    color: #b7ff00;
                    font-size: 11px;
                    font-weight: bold;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                  "
                >
                  COMPRA CONFIRMADA
                </div>

                <h1
                  style="
                    margin: 22px 0 10px;
                    font-size: 32px;
                    line-height: 1.15;
                    color: #ffffff;
                  "
                >
                  ¡Tu Pack está listo!
                </h1>

                <p
                  style="
                    margin: 0;
                    color: #999f99;
                    font-size: 15px;
                    line-height: 1.6;
                  "
                >
                  Gracias por tu compra.
                  Ya podés acceder a todo tu contenido.
                </p>

              </div>

              <!-- ORDER -->

              <div
                style="
                  margin: 0 25px 25px;
                  padding: 24px;
                  background-color: #050605;
                  border: 1px solid #b7ff00;
                  border-radius: 18px;
                  text-align: center;
                "
              >

                <p
                  style="
                    margin: 0 0 8px;
                    color: #777d77;
                    font-size: 11px;
                    font-weight: bold;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                  "
                >
                  NÚMERO DE ORDEN
                </p>

                <p
                  style="
                    margin: 0;
                    color: #b7ff00;
                    font-size: 30px;
                    font-weight: 900;
                  "
                >
                  #${safeOrderId}
                </p>

                <p
                  style="
                    margin: 10px 0 0;
                    color: #777d77;
                    font-size: 12px;
                  "
                >
                  Guardá este número para futuras consultas.
                </p>

              </div>

              <!-- PRODUCT -->

              <div
                style="
                  padding: 10px 30px 30px;
                "
              >

                <p
                  style="
                    margin: 0 0 8px;
                    color: #777d77;
                    font-size: 11px;
                    font-weight: bold;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                  "
                >
                  TU COMPRA
                </p>

                <h2
                  style="
                    margin: 0 0 22px;
                    color: #ffffff;
                    font-size: 23px;
                  "
                >
                  ${safeProductName}
                </h2>

                <!-- INCLUDED ITEMS -->

                <div
                  style="
                    border-top: 1px solid #252925;
                  "
                >

                  <div
                    style="
                      padding: 14px 0;
                      border-bottom: 1px solid #252925;
                      font-size: 14px;
                      color: #dddddd;
                    "
                  >
                    <span
                      style="
                        color: #b7ff00;
                        font-weight: bold;
                      "
                    >
                      ✓
                    </span>
                    &nbsp; Plan Keto 28 Días
                  </div>

                  <div
                    style="
                      padding: 14px 0;
                      border-bottom: 1px solid #252925;
                      font-size: 14px;
                      color: #dddddd;
                    "
                  >
                    <span
                      style="
                        color: #b7ff00;
                        font-weight: bold;
                      "
                    >
                      ✓
                    </span>
                    &nbsp; Guía de Alimentación Keto
                  </div>

                  <div
                    style="
                      padding: 14px 0;
                      border-bottom: 1px solid #252925;
                      font-size: 14px;
                      color: #dddddd;
                    "
                  >
                    <span
                      style="
                        color: #b7ff00;
                        font-weight: bold;
                      "
                    >
                      ✓
                    </span>
                    &nbsp; 100 Recetas Keto para Desayunos
                  </div>

                  <div
                    style="
                      padding: 14px 0;
                      border-bottom: 1px solid #252925;
                      font-size: 14px;
                      color: #dddddd;
                    "
                  >
                    <span
                      style="
                        color: #b7ff00;
                        font-weight: bold;
                      "
                    >
                      ✓
                    </span>
                    &nbsp; 100 Recetas Keto para Almuerzos
                  </div>

                  <div
                    style="
                      padding: 14px 0;
                      font-size: 14px;
                      color: #dddddd;
                    "
                  >
                    <span
                      style="
                        color: #b7ff00;
                        font-weight: bold;
                      "
                    >
                      ✓
                    </span>
                    &nbsp; 100 Recetas Keto para Cenas
                  </div>

                </div>

              </div>

              <!-- CTA -->

              <div
                style="
                  padding: 5px 30px 35px;
                  text-align: center;
                "
              >

                <a
                  href="${safeDeliveryUrl}"
                  style="
                    display: inline-block;
                    padding: 16px 30px;
                    background-color: #b7ff00;
                    color: #050605;
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 900;
                    letter-spacing: 0.5px;
                    border-radius: 12px;
                  "
                >
                  ACCEDER A MI PACK →
                </a>

              </div>

              <!-- REMINDER -->

              <div
                style="
                  margin: 0 25px 30px;
                  padding: 18px;
                  background-color: #111511;
                  border-radius: 14px;
                  text-align: center;
                "
              >

                <p
                  style="
                    margin: 0;
                    color: #b7ff00;
                    font-size: 13px;
                    font-weight: bold;
                  "
                >
                  IMPORTANTE
                </p>

                <p
                  style="
                    margin: 8px 0 0;
                    color: #999f99;
                    font-size: 12px;
                    line-height: 1.6;
                  "
                >
                  Guardá este email.
                  Tu número de orden es
                  <strong style="color: #ffffff;">
                    #${safeOrderId}
                  </strong>.
                </p>

              </div>

              <!-- FOOTER -->

              <div
                style="
                  padding: 25px 30px;
                  border-top: 1px solid #252925;
                  text-align: center;
                "
              >

                <p
                  style="
                    margin: 0;
                    color: #777d77;
                    font-size: 12px;
                    line-height: 1.6;
                  "
                >
                  Gracias por confiar en nosotros.
                </p>

                <p
                  style="
                    margin: 8px 0 0;
                    color: #555b55;
                    font-size: 11px;
                  "
                >
                  Si necesitás ayuda con tu compra,
                  podés comunicarte con nosotros.
                </p>

              </div>

            </div>

          </div>

        </body>
      </html>
    `,
  });

  return {
    productId: product.id,
    buyerEmail,
    orderId,
    deliveryUrl: product.deliveryUrl,
    emailMessageId: email.messageId,
  };
}
