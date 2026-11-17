import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface Props {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
}

export function SectionHeading({ id, eyebrow, title, intro, className }: Props) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:gap-8", className)}>
      <p className="eyebrow flex items-center gap-3 lg:col-span-3 lg:pt-4">
        <span className="h-px w-8 bg-accent" aria-hidden="true" />
        {eyebrow}
      </p>
      <div className="lg:col-span-9">
        <h2 id={id} className="font-display text-4xl leading-[1.05] text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        {intro ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>
        ) : null}
      </div>
    </div>
  );
}
