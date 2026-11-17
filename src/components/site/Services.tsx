import { ArrowRight, Droplets, Ruler, Stethoscope } from "lucide-react";

import { SERVICES, type ServiceId } from "@/config/site";

import { SectionHeading } from "./SectionHeading";

const ICONS = { limpeza: Droplets, instalacao: Ruler, manutencao: Stethoscope } as const;

export function Services({ onChoose }: { onChoose: (id: ServiceId) => void }) {
  return (
    <section aria-labelledby="servicos-title" id="servicos" className="py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          id="servicos-title"
          eyebrow="Serviços"
          title="Três jeitos de cuidar do seu ar-condicionado."
          intro="Cada aparelho tem uma história. Escolha o ponto de partida e o resto se ajusta ao seu caso."
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-20">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.id];
            return (
              <li
                key={s.id}
                className="group flex flex-col rounded-2xl border bg-card p-7 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-petrol/40 hover:shadow-soft focus-within:border-petrol/40"
              >
                <div className="flex items-start justify-between">
                  <Icon
                    className="size-8 text-petrol transition-transform duration-300 group-hover:-rotate-6"
                    strokeWidth={1}
                    aria-hidden="true"
                  />
                  <span className="font-display text-2xl text-muted-foreground/70" aria-hidden="true">
                    {s.number}
                  </span>
                </div>

                <h3 className="font-display mt-10 text-3xl leading-tight">{s.title}</h3>
                <p className="mt-1 text-[0.95rem] font-medium text-petrol">{s.summary}</p>
                <p className="mt-4 leading-relaxed text-muted-foreground">{s.description}</p>

                <ul className="mt-6 space-y-2 border-t pt-5 text-[0.95rem]">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-3">
                      <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 rounded-lg bg-accent-soft px-3.5 py-2.5 text-sm">
                  <span className="font-semibold">Indicado para: </span>
                  {s.goodFor}
                </p>

                <a
                  href="#orcamento"
                  onClick={() => onChoose(s.id)}
                  className="mt-auto inline-flex items-center gap-2 self-start rounded-sm pt-7 font-semibold text-petrol"
                >
                  <span className="link-underline">Simular este serviço</span>
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
