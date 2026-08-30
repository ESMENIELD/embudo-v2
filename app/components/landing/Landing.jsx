"use client";

import Hero from "./Hero";
import Benefits from "./Benefits";
import EbookList from "./EbookList";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
import CTA from "./CTA";
import Checkout from "./Checkout";


export default function Landing({
  product,
  benefits = [],
  faqs = [],
  onBuy,
}) {
  return (
    <main>
      <Hero product={product} />

      <Benefits benefits={benefits} />

      <EbookList ebooks={product?.ebooks || []} />

      <Pricing
        product={product}
        onBuy={onBuy}
      />
          <Checkout product={product} />

      <FAQ questions={faqs} />

      <CTA
        title="Comenzá ahora"
        description="Accedé al contenido de este pack."
        buttonText="Comprar ahora"
        onClick={onBuy}
      />
    </main>
  );
}