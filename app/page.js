import Landing from "./components/landing/Landing";
import { getProductById } from "../services/product.service";

export default function Home() {
  const product = getProductById("pack-keto-28");

  const ebooks = [
    {
      id: 1,
      title: "Guía Keto Completa",
      description: "Todo lo necesario para comenzar.",
      icon: "🥑",
    },
    {
      id: 2,
      title: "Plan Keto 28 Días",
      description: "Un paso a paso para organizar tus primeras semanas.",
      icon: "📅",
    },
    {
      id: 3,
      title: "100 Recetas Keto para el Desayuno",
      description: "Ideas fáciles para comenzar el día.",
      icon: "🥣",
    },
    {
      id: 4,
      title: "100 Recetas Keto para el Almuerzo",
      description: "Opciones variadas y deliciosas.",
      icon: "🥗",
    },
    {
      id: 5,
      title: "100 Recetas Keto para la Cena",
      description: "Recetas para terminar el día con nuevas opciones.",
      icon: "🐟",
    },
  ];

  const benefits = [
    {
      id: 1,
      title: "Comidas más simples",
      description:
        "Ideas prácticas para organizar tus comidas sin pasar horas pensando qué cocinar.",
    },
    {
      id: 2,
      title: "Más variedad",
      description:
        "Cientos de recetas para que comer keto no se vuelva repetitivo.",
    },
    {
      id: 3,
      title: "Un plan para empezar",
      description:
        "Tenés una guía y un plan de 28 días para acompañarte desde el primer día.",
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "¿Cómo recibo mi compra?",
      answer:
        "Una vez aprobado el pago, recibirás automáticamente un email con el enlace para acceder al contenido.",
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
        "Incluye la Guía Keto Completa, el Plan Keto de 28 Días y tres libros con 100 recetas keto para desayuno, almuerzo y cena.",
    },
    {
      id: 4,
      question: "¿Necesito experiencia previa con la alimentación keto?",
      answer:
        "No. El material está pensado para que puedas comenzar de manera sencilla y organizar tus comidas paso a paso.",
    },
    {
      id: 5,
      question: "¿El acceso es digital?",
      answer:
        "Sí. Recibirás el acceso al material digital por email después de que el pago sea aprobado.",
    },
  ];

  return (
    <Landing
      product={{
        ...product,
        ebooks,
      }}
      benefits={benefits}
      faqs={faqs}
    />
  );
}
