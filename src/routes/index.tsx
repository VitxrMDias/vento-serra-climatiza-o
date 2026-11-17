import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { DemoBanner } from "@/components/site/DemoBanner";
import { Faq } from "@/components/site/Faq";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";
import { QuoteCta } from "@/components/site/QuoteCta";
import { QuoteForm } from "@/components/site/QuoteForm";
import { ServiceArea } from "@/components/site/ServiceArea";
import { Services } from "@/components/site/Services";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { ValueStrip } from "@/components/site/ValueStrip";
import { SEO, type ServiceId } from "@/config/site";

// Sem og:image: a hospedagem injeta a prévia do projeto (a foto do topo é um arquivo local).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SEO.title },
      { name: "description", content: SEO.description },
      { property: "og:title", content: SEO.title },
      { property: "og:description", content: SEO.description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SEO.title },
      { name: "twitter:description", content: SEO.description },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const [preselected, setPreselected] = useState<{ id: ServiceId; at: number } | null>(null);

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-50 rounded-full bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>
      <DemoBanner />
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <ValueStrip />
        <Services onChoose={(id) => setPreselected({ id, at: Date.now() })} />
        <HowItWorks />
        <ServiceArea />
        <Faq />
        <QuoteCta />
        <QuoteForm preselected={preselected} />
      </main>
      <SiteFooter />
    </>
  );
}
