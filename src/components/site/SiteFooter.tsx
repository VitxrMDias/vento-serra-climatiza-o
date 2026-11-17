import { ArrowUp, Sparkle } from "lucide-react";

import { COMPANY_NAME, IS_DEMO, NAV_LINKS, REGION_LABEL } from "@/config/site";

import { BrandMark } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="theme-petrol-deep">
      <div className="container-site grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <BrandMark />
          <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
            Instalação, limpeza e manutenção de ar-condicionado. {REGION_LABEL}.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/50 px-3.5 py-1.5 text-sm text-accent">
            <Sparkle className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            Modelo personalizável para negócios locais
          </p>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-4 md:col-start-7">
          <p className="eyebrow">Navegação</p>
          <ul className="mt-4 grid grid-cols-2 gap-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-underline rounded-sm hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2 md:text-right">
          <a href="#topo" className="inline-flex items-center gap-2 rounded-sm hover:text-accent">
            <ArrowUp className="size-4" strokeWidth={1.5} aria-hidden="true" />
            <span className="link-underline">Voltar ao topo</span>
          </a>
        </div>
      </div>
      <div className="border-t">
        <p className="container-site flex flex-col gap-2 py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <span>{IS_DEMO ? "Site demonstrativo • dados fictícios" : `© ${COMPANY_NAME}`}</span>
          {IS_DEMO ? <span>{COMPANY_NAME} é uma empresa fictícia criada para apresentação.</span> : null}
        </p>
      </div>
    </footer>
  );
}
