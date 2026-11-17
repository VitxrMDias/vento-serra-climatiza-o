import { z } from "zod";

import {
  CITY,
  COMPANY_NAME,
  ENVIRONMENT_OPTIONS,
  IS_DEMO,
  SERVICE_OPTIONS,
  STATE,
  WHATSAPP_NUMBER,
} from "@/config/site";

const serviceIds = SERVICE_OPTIONS.map((s) => s.id) as string[];
const environmentIds = ENVIRONMENT_OPTIONS.map((e) => e.id) as string[];

export const quoteSchema = z.object({
  name: z.string().trim().max(80, "Use até 80 caracteres."),
  service: z
    .string()
    .refine((v) => serviceIds.includes(v), { message: "Escolha um tipo de serviço." }),
  neighborhood: z
    .string()
    .trim()
    .min(2, "Informe o seu bairro.")
    .max(80, "Use até 80 caracteres."),
  environment: z
    .string()
    .refine((v) => environmentIds.includes(v), { message: "Escolha o tipo de ambiente." }),
  description: z.string().trim().max(600, "Use até 600 caracteres."),
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteData = z.output<typeof quoteSchema>;
export type QuoteField = keyof QuoteInput;
export type QuoteErrors = { [K in QuoteField]?: string | undefined };

export const EMPTY_QUOTE: QuoteInput = {
  name: "",
  service: "",
  neighborhood: "",
  environment: "",
  description: "",
};

/** Ordem em que o foco vai para o primeiro campo com erro. */
export const FIELD_ORDER: QuoteField[] = [
  "name",
  "service",
  "neighborhood",
  "environment",
  "description",
];

export function validateQuote(
  input: QuoteInput,
): { ok: true; data: QuoteData } | { ok: false; errors: QuoteErrors } {
  const result = quoteSchema.safeParse(input);
  if (result.success) return { ok: true, data: result.data };
  const errors: QuoteErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as QuoteField;
    if (!errors[field]) errors[field] = issue.message;
  }
  return { ok: false, errors };
}

const labelOf = (list: readonly { id: string; label: string }[], id: string) =>
  list.find((o) => o.id === id)?.label ?? id;

/** Monta a mensagem de texto simples que o visitante copia (ou, num site real, envia). */
export function buildQuoteMessage(data: QuoteData): string {
  const lines = [
    data.name ? `Olá! Meu nome é ${data.name} e gostaria de um orçamento.` : "Olá! Gostaria de um orçamento.",
    "",
    `Serviço: ${labelOf(SERVICE_OPTIONS, data.service)}`,
    `Bairro: ${data.neighborhood} — ${CITY} (${STATE})`,
    `Ambiente: ${labelOf(ENVIRONMENT_OPTIONS, data.environment)}`,
  ];
  if (data.description) lines.push(`Detalhes: ${data.description}`);
  if (IS_DEMO) {
    lines.push("", `(Simulação feita no site modelo ${COMPANY_NAME} — empresa fictícia.)`);
  }
  return lines.join("\n");
}

/** Retorna o link do WhatsApp só quando houver número real configurado e o site não for demo. */
export function buildWhatsAppLink(message: string): string | null {
  const digits = WHATSAPP_NUMBER.replace(/\D/g, "");
  if (IS_DEMO || digits.length < 12) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Copia texto usando a API do navegador, com um método alternativo para navegadores antigos. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // tenta o método alternativo abaixo
  }
  try {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}
