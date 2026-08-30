# PROJECT CONTEXT — Embudo de E-books

## Objetivo

Crear un embudo de ventas reutilizable para vender productos digitales
(ebooks) mediante Mercado Pago y entregar automáticamente el contenido
al comprador por email.

El primer producto será un pack de ebooks sobre dieta keto.

El sistema debe poder reutilizarse posteriormente para otros productos
sin tener que modificar la lógica principal del sistema.

---

## Stack

- Next.js
- React
- JavaScript
- App Router
- Tailwind CSS
- Mercado Pago Checkout Bricks
- Google Drive
- Nodemailer / Gmail
- Vercel

---

## Arquitectura

La aplicación utiliza Next.js como frontend y backend dentro del mismo
proyecto.

### Frontend

La landing presenta:

- Hero
- Beneficios
- Lista de ebooks
- Precio
- FAQ
- CTA
- Checkout Mercado Pago

### Backend

Las API Routes de Next.js manejarán:

- Productos
- Creación del checkout
- Webhook de Mercado Pago

---

## Flujo de compra

El flujo principal será:

Landing
↓
Seleccionar producto
↓
Checkout Bricks
↓
Mercado Pago
↓
Pago
↓
Webhook
↓
Verificar pago
↓
Identificar producto
↓
Identificar comprador
↓
Google Drive
↓
Otorgar acceso al contenido
↓
Enviar email
↓
Compra entregada

---

## Mercado Pago

Se utilizará:

**Checkout Bricks**

No se utilizará Checkout Pro como flujo principal.

El Access Token de Mercado Pago debe permanecer exclusivamente
en el backend.

La Public Key podrá utilizarse en el frontend.

El webhook debe validar la notificación y posteriormente consultar
el pago en Mercado Pago antes de entregar el producto.

Nunca se debe entregar un producto únicamente porque se recibió
una petición al webhook.

---

## Productos

Los productos se definirán inicialmente en archivos JavaScript.

Cada producto tendrá:

- id
- name
- price
- currency
- ebookIds
- active

Ejemplo:

```js
{
  id: "pack-keto-28",
  name: "Pack Keto 28 Días",
  price: 3000,
  currency: "ARS",
  ebookIds: [
    "keto-guide",
    "keto-breakfast",
    "keto-lunch",
    "keto-dinner",
    "keto-28-days"
  ],
  active: true
}