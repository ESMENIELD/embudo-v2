"use client";

import Hero from "./Hero";
import Benefits from "./Benefits";
import EbookList from "./EbookList";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
import CTA from "./CTA";
import Checkout from "./Checkout";
import Testimonials from "./Testimonials";
import Guarantee from "./Guarantee";

export default function Landing({
  product,
  benefits = [],
  faqs = [],
  onBuy,
}) {
  const scrollToCheckout = () => {
    document
      .getElementById("checkout")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050605] text-white">
      <Hero product={product} />

<Benefits benefits={benefits} />

<EbookList ebooks={product?.ebooks || []} />

<Testimonials />

<Guarantee />

<Pricing
  product={product}
  onBuy={scrollToCheckout}
/>

<div id="checkout">
  <Checkout product={product} />
</div>

<FAQ questions={faqs} />

<CTA
  title="¿LISTA/O PARA COMENZAR?"
  description="Accedé ahora al Pack Keto y empezá a organizar tus comidas de una manera simple."
  buttonText="QUIERO MI PACK KETO"
  onClick={scrollToCheckout}
/>
    </main>
  );
}
