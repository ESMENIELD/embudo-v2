import Landing from "./components/landing/Landing";
import { getProductById } from "../services/product.service";

export default function Home() {
  const product = getProductById("pack-keto-28");

  return (
    <Landing
      product={product}
      benefits={[
        {
          id: 1,
          title: "Recetas fáciles y deliciosas",
          description:
            "Ideas keto para disfrutar tus comidas sin complicarte.",
        },
        {
          id: 2,
          title: "Plan de 28 días",
          description:
            "Una guía práctica para organizar tu alimentación durante 28 días.",
        },
        {
          id: 3,
          title: "Todo en un solo pack",
          description:
            "Accedé a todo el contenido incluido en tu compra desde un único enlace.",
        },
      ]}
      faqs={[
        {
          id: 1,
          question: "¿Cómo recibo mi compra?",
          answer:
            "Una vez aprobado el pago, recibirás un email con el enlace para acceder al contenido.",
        },
        {
          id: 2,
          question: "¿Cuándo recibiré el acceso?",
          answer:
            "El acceso se envía automáticamente después de que Mercado Pago confirme el pago.",
        },
        {
          id: 3,
          question: "¿Qué incluye el Pack Keto 28 Días?",
          answer:
            "Incluye la guía keto, recetas y el plan de alimentación de 28 días.",
        },
      ]}
    />
  );
}