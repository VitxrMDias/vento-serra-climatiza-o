import { CalendarClock, MessagesSquare, SlidersHorizontal } from "lucide-react";

import { VALUE_POINTS } from "@/config/site";

const ICONS = [CalendarClock, MessagesSquare, SlidersHorizontal] as const;

export function ValueStrip() {
  return (
    <section aria-label="Como trabalhamos" className="border-y bg-secondary/60">
      <ul className="container-site grid divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
        {VALUE_POINTS.map((v, i) => {
          const Icon = ICONS[i % ICONS.length] ?? CalendarClock;
          return (
            <li key={v.title} className="flex gap-4 py-7 md:px-8 md:first:pl-0 md:last:pr-0">
              <Icon className="mt-0.5 size-6 shrink-0 text-petrol" strokeWidth={1.25} aria-hidden="true" />
              <div>
                <h2 className="font-semibold">{v.title}</h2>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
