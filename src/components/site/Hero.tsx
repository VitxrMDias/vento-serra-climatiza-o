import { ArrowDownRight } from "lucide-react";

import heroImage from "@/assets/hero-sala-climatizada.jpg";
import { Button } from "@/components/ui/button";
import { CITY } from "@/config/site";

import { WindLines } from "./graphics";

export function Hero() {
  return (
    <section id="topo" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-site grid gap-12 pt-10 pb-16 md:pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-24">
        <div className="relative lg:col-span-7 lg:pt-10">
          <p className="eyebrow rise-in flex items-center gap-3">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Ar-condicionado residencial e comercial leve
          </p>

          <h1
            id="hero-title"
            className="font-display rise-in mt-6 text-[3.1rem] leading-[0.98] text-balance sm:text-7xl lg:text-[5.6rem]"
          >
            Conforto em casa começa com o <em className="text-petrol italic">ar certo.</em>
          </h1>

          <p className="rise-in mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground [animation-delay:120ms]">
            Instalação, limpeza e manutenção de ar-condicionado. Um exemplo de como sua empresa pode
            transformar visitas em pedidos de orçamento.
          </p>

          <div className="rise-in mt-9 flex flex-col gap-3 sm:flex-row sm:items-center [animation-delay:200ms]">
            <Button asChild variant="cta" size="xl">
              <a href="#orcamento">Simular orçamento</a>
            </Button>
            <Button asChild variant="quiet" size="xl" className="group">
              <a href="#servicos">
                Conhecer serviços
                <ArrowDownRight
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </a>
            </Button>
          </div>

          <WindLines className="mt-14 hidden w-72 text-accent lg:block" />
        </div>

        <div className="relative lg:col-span-5">
          <figure className="relative ml-auto max-w-md lg:mt-0 lg:max-w-none">
            <div className="overflow-hidden rounded-t-[10rem] rounded-b-2xl bg-muted shadow-lift">
              <img
                src={heroImage}
                alt="Sala de estar clara com ar-condicionado split branco instalado na parede, sofá de linho e vista para a serra pela janela"
                width={1280}
                height={1600}
                fetchPriority="high"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            <figcaption className="absolute -bottom-6 -left-4 flex items-center gap-4 rounded-xl border bg-card px-5 py-4 shadow-soft sm:-left-10">
              <span className="font-display text-4xl leading-none text-petrol">
                22<span className="align-top text-xl">°</span>
              </span>
              <span className="text-sm leading-snug text-muted-foreground">
                Ar em equilíbrio,
                <br />
                <span className="text-foreground">na serra de {CITY}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
