import { Info } from "lucide-react";

import { DEMO_NOTICE, IS_DEMO } from "@/config/site";

export function DemoBanner() {
  if (!IS_DEMO) return null;
  return (
    <div role="note" aria-label="Aviso de demonstração" className="theme-petrol-deep">
      <p className="container-site flex items-center justify-center gap-2 py-2 text-center text-[0.8rem] font-medium tracking-wide">
        <Info className="size-3.5 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
        {DEMO_NOTICE}
      </p>
    </div>
  );
}
