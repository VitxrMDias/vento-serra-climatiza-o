import { cn } from "@/lib/utils";

/** Linhas finas de vento — detalhe decorativo. */
export function WindLines({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 120"
      fill="none"
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
    >
      <path
        d="M4 30 H210 c22 0 34 -12 34 -26"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        className="wind-drift"
        d="M4 62 H262 c26 0 40 14 40 32 c0 14 -10 22 -22 22 c-12 0 -19 -8 -19 -17"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path d="M40 90 H150" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

/** Mostrador de temperatura minimalista — decorativo. */
export function ComfortDial({ value = 22, className }: { value?: number; className?: string }) {
  const min = 16;
  const max = 30;
  const r = 88;
  const c = Math.PI * r; // semicircunferência
  const pct = (value - min) / (max - min);
  const angle = Math.PI * (1 - pct);
  const kx = 100 + r * Math.cos(angle);
  const ky = 100 - r * Math.sin(angle);
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true" className={cn("overflow-visible", className)}>
      <path
        d="M12 100 A88 88 0 0 1 188 100"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1.5"
      />
      <path
        d="M12 100 A88 88 0 0 1 188 100"
        fill="none"
        className="stroke-accent"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={`${c * pct} ${c}`}
      />
      {Array.from({ length: 15 }).map((_, i) => {
        const a = Math.PI * (1 - i / 14);
        const x1 = 100 + 76 * Math.cos(a);
        const y1 = 100 - 76 * Math.sin(a);
        const x2 = 100 + (i % 7 === 0 ? 66 : 71) * Math.cos(a);
        const y2 = 100 - (i % 7 === 0 ? 66 : 71) * Math.sin(a);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
        );
      })}
      <circle cx={kx} cy={ky} r="5" className="fill-cta" />
    </svg>
  );
}

/** Perfil de serra em traço único. */
export function MountainLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 140" fill="none" aria-hidden="true" preserveAspectRatio="none" className={cn("h-16 w-full sm:h-24", className)}>
      <path
        d="M0 130 L70 88 L110 104 L190 40 L250 82 L300 60 L370 112 L430 72 L470 90 L540 30 L600 74"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M0 138 L120 118 L210 126 L330 110 L450 124 L600 108"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
