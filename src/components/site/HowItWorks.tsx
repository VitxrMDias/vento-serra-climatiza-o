import { STEPS } from "@/config/site";

import { SectionHeading } from "./SectionHeading";

export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-title" className="border-t py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          id="como-title"
          eyebrow="Como funciona"
          title="Do problema ao pedido em três passos."
          intro="Menos idas e vindas: as informações que o técnico precisa já chegam organizadas."
        />

        <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-20">
          <span
            aria-hidden="true"
            className="absolute top-7 right-[16%] left-[16%] hidden border-t border-dashed border-accent md:block"
          />
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
              <span className="font-display relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border bg-background text-2xl text-petrol">
                {i + 1}
              </span>
              <div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 max-w-xs leading-relaxed text-muted-foreground md:mx-auto">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
