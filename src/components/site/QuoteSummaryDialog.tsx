import { Check, Copy, MessageCircle, MousePointerClick, ShieldAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IS_DEMO } from "@/config/site";
import { buildWhatsAppLink, copyToClipboard } from "@/lib/quote";

type CopyState = "idle" | "copied" | "error";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
}

export function QuoteSummaryDialog({ open, onOpenChange, message }: Props) {
  const [state, setState] = useState<CopyState>("idle");
  const textRef = useRef<HTMLTextAreaElement>(null);
  const whatsapp = buildWhatsAppLink(message);

  useEffect(() => {
    if (open) setState("idle");
  }, [open, message]);

  const selectText = () => {
    const el = textRef.current;
    if (!el) return;
    el.focus();
    el.select();
    el.setSelectionRange(0, el.value.length);
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(message);
    setState(ok ? "copied" : "error");
    if (!ok) selectText();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92svh] gap-6 overflow-y-auto rounded-2xl border-border bg-card p-6 sm:max-w-xl sm:p-8">
        <DialogHeader className="text-left">
          <p className="eyebrow">Resumo da simulação</p>
          <DialogTitle className="font-display text-3xl font-normal leading-tight sm:text-4xl">
            Sua mensagem está pronta.
          </DialogTitle>
          <DialogDescription className="text-base">
            Confira os dados abaixo. Você pode copiar o texto e usar como quiser.
          </DialogDescription>
        </DialogHeader>

        {IS_DEMO ? (
          <p
            role="note"
            className="flex items-start gap-3 rounded-xl border border-cta/40 bg-cta/10 px-4 py-3 text-sm font-medium"
          >
            <ShieldAlert className="mt-0.5 size-4 shrink-0 text-cta" strokeWidth={1.75} aria-hidden="true" />
            Simulação: nenhuma mensagem é enviada ou armazenada.
          </p>
        ) : null}

        <div>
          <label htmlFor="resumo-mensagem" className="text-sm font-semibold">
            Mensagem
          </label>
          <textarea
            id="resumo-mensagem"
            ref={textRef}
            readOnly
            value={message}
            rows={Math.min(12, message.split("\n").length + 1)}
            className="mt-2 w-full resize-none rounded-xl border bg-background px-4 py-3 text-[0.95rem] leading-relaxed focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          />
        </div>

        <p aria-live="polite" className="min-h-5 text-sm">
          {state === "copied" ? (
            <span className="inline-flex items-center gap-2 font-medium text-success">
              <Check className="size-4" strokeWidth={2} aria-hidden="true" />
              Mensagem copiada para a área de transferência.
            </span>
          ) : state === "error" ? (
            <span className="font-medium text-destructive">
              Não foi possível copiar automaticamente. O texto foi selecionado: use Ctrl+C (ou
              toque e segure, no celular).
            </span>
          ) : null}
        </p>

        <DialogFooter className="flex-col gap-3 sm:flex-row sm:justify-between sm:space-x-0">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Editar dados
          </Button>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="quiet" onClick={selectText}>
              <MousePointerClick strokeWidth={1.5} aria-hidden="true" />
              Selecionar texto
            </Button>
            {whatsapp ? (
              <Button asChild variant="cta">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle strokeWidth={1.75} aria-hidden="true" />
                  Enviar pelo WhatsApp
                </a>
              </Button>
            ) : null}
            <Button variant={whatsapp ? "default" : "cta"} onClick={handleCopy}>
              {state === "copied" ? (
                <Check strokeWidth={2} aria-hidden="true" />
              ) : (
                <Copy strokeWidth={1.75} aria-hidden="true" />
              )}
              {state === "copied" ? "Copiada" : "Copiar mensagem"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
