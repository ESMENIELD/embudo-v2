import { sendEmail } from "../lib/email";
import { getProductById } from "./product.service";

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
    };

    return entities[character];
  });
}

export async function deliverProduct({ productId, buyerEmail }) {
  if (typeof buyerEmail !== "string" || !buyerEmail.trim()) {
    throw new Error("El email del comprador es obligatorio");
  }

  const product = getProductById(productId);

  if (!product) {
    throw new Error("Producto no encontrado o inactivo");
  }

  if (
    typeof product.deliveryUrl !== "string" ||
    !product.deliveryUrl.trim()
  ) {
    throw new Error("El producto no tiene un enlace de entrega configurado");
  }

  const safeProductName = escapeHtml(product.name);
  const safeDeliveryUrl = escapeHtml(product.deliveryUrl);

  const email = await sendEmail({
    to: buyerEmail,
    subject: `Tu compra: ${product.name}`,
    text:
      `¡Gracias por tu compra!\n\n` +
      `Producto: ${product.name}\n\n` +
      `Podés acceder a tu contenido desde este enlace:\n` +
      `${product.deliveryUrl}\n\n` +
      `Guardá este email para volver a acceder a tu compra.`,
    html:
      `<p>¡Gracias por tu compra!</p>` +
      `<p><strong>${safeProductName}</strong></p>` +
      `<p>Podés acceder a tu contenido desde el siguiente enlace:</p>` +
      `<p><a href="${safeDeliveryUrl}">Acceder a mi compra</a></p>` +
      `<p>Guardá este email para volver a acceder a tu compra.</p>`,
  });

  return {
    productId: product.id,
    buyerEmail,
    deliveryUrl: product.deliveryUrl,
    emailMessageId: email.messageId,
  };
}