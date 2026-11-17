import { describe, expect, it } from "vitest";

import { buildQuoteMessage, buildWhatsAppLink, validateQuote } from "@/lib/quote";

const valid = {
  name: "",
  service: "limpeza",
  neighborhood: "Centro",
  environment: "sala",
  description: "",
};

describe("simulação de orçamento", () => {
  it("aceita o pedido sem nome e sem descrição (campos opcionais)", () => {
    expect(validateQuote(valid).ok).toBe(true);
  });

  it("exige tipo de serviço, bairro e tipo de ambiente", () => {
    const result = validateQuote({ ...valid, service: "", neighborhood: " ", environment: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.errors).sort()).toEqual(["environment", "neighborhood", "service"]);
    }
  });

  it("monta o resumo com serviço, bairro na cidade e ambiente", () => {
    const result = validateQuote({ ...valid, name: "Ana", description: "Pinga água" });
    if (!result.ok) throw new Error("deveria ser válido");
    const msg = buildQuoteMessage(result.data);
    expect(msg).toContain("Meu nome é Ana");
    expect(msg).toContain("Serviço: Limpeza e higienização");
    expect(msg).toContain("Bairro: Centro — Petrópolis (RJ)");
    expect(msg).toContain("Ambiente: Sala");
    expect(msg).toContain("Detalhes: Pinga água");
  });

  it("não gera link de WhatsApp na versão demonstrativa", () => {
    expect(buildWhatsAppLink("oi")).toBeNull();
  });
});
