import { ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ComfortDial, WindLines } from "./graphics";

export function QuoteCta() {
  return (
    <section aria-labelledby="cta-title" className="theme-petrol relative overflow-hidden">
      <WindLines className="absolute -top-4 -right-16 w-[28rem] text-accent/40" />
      <div className="container-site relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Orçamento
          </p>
          <h2 id="cta-title" className="font-display mt-6 text-5xl leading-[1.02] text-balance sm:text-6xl lg:text-7xl">
            Antes de chamar alguém, organize o que você precisa.
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Leva menos de um minuto. No final, você recebe um resumo claro — pronto para copiar.
          </p>
          <Button asChild variant="cta" size="xl" className="mt-9">
            <a href="#orcamento">
              Simular orçamento
              <ArrowDown strokeWidth={1.75} aria-hidden="true" />
            </a>
          </Button>
        </div>
        <div className="hidden justify-center lg:col-span-5 lg:flex">
          <div className="relative w-full max-w-sm">
            <ComfortDial className="w-full text-foreground" />
            <p className="font-display absolute inset-x-0 bottom-0 text-center text-7xl leading-none">
              22<span className="align-top text-3xl">°</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
