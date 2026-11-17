import { MapPin } from "lucide-react";

import { REGION_LABEL } from "@/config/site";

import { MountainLine } from "./graphics";

export function ServiceArea() {
  return (
    <section aria-labelledby="area-title" className="bg-accent-soft/60 py-20 md:py-24">
      <div className="container-site grid items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="eyebrow flex items-center gap-2">
            <MapPin className="size-4 text-petrol" strokeWidth={1.5} aria-hidden="true" />
            Área de atendimento
          </p>
          <h2 id="area-title" className="font-display mt-5 text-4xl leading-[1.05] sm:text-5xl">
            {REGION_LABEL}.
          </h2>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Na serra, o ar-condicionado trabalha o ano inteiro: refresca nos dias abafados e, nos
            modelos quente/frio, ajuda a esquentar as noites de inverno.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Numa versão real, aqui entram os bairros e cidades que a empresa atende, definidos junto
            com o cliente.
          </p>
        </div>
        <MountainLine className="text-petrol/60 lg:col-span-12" />
      </div>
    </section>
  );
}
