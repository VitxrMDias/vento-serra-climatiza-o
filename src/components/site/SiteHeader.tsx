import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { COMPANY_NAME, COMPANY_TAGLINE, NAV_LINKS } from "@/config/site";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  const [first, second] = COMPANY_NAME.split("&").map((p) => p.trim());
  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span className="font-display text-[1.65rem] leading-none">
        {second ? (
          <>
            {first} <span className="text-cta">&amp;</span> {second}
          </>
        ) : (
          COMPANY_NAME
        )}
      </span>
      <span className="eyebrow hidden text-[0.62rem] sm:inline">{COMPANY_TAGLINE}</span>
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobileNavRef.current?.contains(document.activeElement)) menuButtonRef.current?.focus();
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-background/95 transition-[border-color,box-shadow] duration-300",
        scrolled ? "border-border shadow-soft" : "border-transparent",
      )}
    >
      <div className="container-site flex h-16 items-center justify-between gap-6 md:h-18">
        <a href="#topo" className="rounded-sm" aria-label={`${COMPANY_NAME} — início`}>
          <BrandMark />
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8 text-[0.95rem]">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-underline rounded-sm py-1 text-foreground/80 hover:text-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="cta" size="default" className="hidden sm:inline-flex">
            <a href="#orcamento">Simular orçamento</a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={open}
            ref={menuButtonRef}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
          </Button>
        </div>
      </div>

      <nav
        ref={mobileNavRef}
        id="menu-mobile"
        aria-label="Menu móvel"
        hidden={!open}
        className="border-t bg-background md:hidden"
      >
        <ul className="container-site flex flex-col py-3">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-sm border-b border-border/70 py-3.5 text-lg"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-4 pb-2">
            <Button asChild variant="cta" size="lg" className="w-full">
              <a href="#orcamento" onClick={() => setOpen(false)}>
                Simular orçamento
              </a>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
