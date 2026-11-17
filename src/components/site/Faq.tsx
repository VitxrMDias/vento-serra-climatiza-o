import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ } from "@/config/site";

import { SectionHeading } from "./SectionHeading";

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          id="duvidas-title"
          eyebrow="Dúvidas"
          title="Perguntas que costumam aparecer."
        />
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-8">
          <Accordion type="single" collapsible className="border-t lg:col-span-9 lg:col-start-4">
            {FAQ.map((item, i) => (
              <AccordionItem key={item.q} value={`faq-${i}`}>
                <AccordionTrigger className="gap-6 rounded-sm py-6 text-left text-lg font-semibold hover:no-underline hover:text-petrol sm:text-xl [&>svg]:size-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-7 text-base leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
