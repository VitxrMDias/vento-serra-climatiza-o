/**
 * Dados editáveis do site modelo.
 * Para adaptar a um cliente real, altere apenas este arquivo (textos, serviços, cidade)
 * e as cores em src/styles.css. Nada aqui deve conter contato ou números fictícios.
 */

export const COMPANY_NAME = "Vento & Serra";
export const COMPANY_TAGLINE = "Climatização";
export const CITY = "Petrópolis";
export const STATE = "RJ";
export const REGION_LABEL = `Modelo inspirado em ${CITY} e região`;

/** Mostra a tarja e os avisos de demonstração. Desligue só para um cliente real aprovado. */
export const IS_DEMO = true;
export const DEMO_NOTICE = "Projeto demonstrativo • empresa fictícia • sem atendimento real";

/**
 * WHATSAPP — deixe vazio enquanto for demonstração.
 *
 * Depois de contratar um cliente real:
 * 1. Preencha com DDI + DDD + número, só dígitos. Ex.: "55" + "24" + número do cliente.
 * 2. Mude IS_DEMO para false.
 * O resumo do orçamento passa a exibir o botão "Enviar pelo WhatsApp", que abre
 * https://wa.me/<número>?text=<mensagem> (veja buildWhatsAppLink em src/lib/quote.ts).
 * Nunca coloque um número inventado aqui.
 */
export const WHATSAPP_NUMBER = "";

export type ServiceId = "limpeza" | "instalacao" | "manutencao" | "orientacao";

export interface Service {
  id: Exclude<ServiceId, "orientacao">;
  number: string;
  title: string;
  summary: string;
  description: string;
  points: string[];
  goodFor: string;
}

export const SERVICES: Service[] = [
  {
    id: "limpeza",
    number: "01",
    title: "Limpeza e higienização",
    summary: "Para o aparelho voltar a soprar ar limpo.",
    description:
      "Limpeza de filtros, serpentina, bandeja e dreno, com o ambiente protegido para não respingar em parede nem móveis.",
    points: ["Filtros e serpentina", "Bandeja e dreno", "Proteção do ambiente"],
    goodFor: "Cheiro de mofo, ar fraco ou pingando",
  },
  {
    id: "instalacao",
    number: "02",
    title: "Instalação",
    summary: "Do posicionamento ao primeiro teste.",
    description:
      "Avaliação do local, escolha da posição das unidades interna e externa, passagem de tubulação e teste de funcionamento ao final.",
    points: ["Avaliação do local", "Tubulação e dreno", "Teste com você presente"],
    goodFor: "Aparelho novo ou mudança de lugar",
  },
  {
    id: "manutencao",
    number: "03",
    title: "Manutenção e diagnóstico",
    summary: "Primeiro entender, depois consertar.",
    description:
      "Para aparelho que não gela, liga e desliga sozinho ou faz barulho. O que foi encontrado é explicado antes de qualquer reparo.",
    points: ["Escuta do problema", "Diagnóstico explicado", "Opções antes do reparo"],
    goodFor: "Não gela, faz ruído ou desliga",
  },
];

/** Opções do formulário: os serviços acima + uma saída para quem ainda não sabe. */
export const SERVICE_OPTIONS: { id: ServiceId; label: string }[] = [
  ...SERVICES.map((s) => ({ id: s.id, label: s.title })),
  { id: "orientacao", label: "Ainda não sei — preciso de orientação" },
];

export const ENVIRONMENT_OPTIONS = [
  { id: "quarto", label: "Quarto" },
  { id: "sala", label: "Sala" },
  { id: "escritorio", label: "Escritório" },
  { id: "comercio", label: "Loja ou consultório" },
  { id: "outro", label: "Outro ambiente" },
] as const;

export type EnvironmentId = (typeof ENVIRONMENT_OPTIONS)[number]["id"];

export const VALUE_POINTS = [
  {
    title: "Visita com horário combinado",
    text: "Você escolhe o melhor período e sabe quando esperar o técnico.",
  },
  {
    title: "Conversa clara do começo ao fim",
    text: "O que será feito é explicado antes, sem termos difíceis.",
  },
  {
    title: "Opções para cada aparelho",
    text: "Limpeza, instalação ou diagnóstico, conforme o que o seu caso pede.",
  },
];

export const STEPS = [
  {
    title: "Escolha o serviço",
    text: "Limpeza, instalação ou manutenção. Se não souber, tudo bem — há uma opção para isso.",
  },
  {
    title: "Conte o que precisa",
    text: "Bairro, tipo de ambiente e, se quiser, uma descrição do que está acontecendo.",
  },
  {
    title: "Receba o resumo pronto",
    text: "O site organiza tudo numa mensagem curta, pronta para copiar e enviar.",
  },
];

export const FAQ = [
  {
    q: "Quanto custa o serviço?",
    a: "Depende do tipo e da potência do aparelho, do acesso ao local e do serviço necessário. Por isso o valor é passado depois de entender o seu caso — a simulação ajuda a reunir essas informações de uma vez.",
  },
  {
    q: "De quanto em quanto tempo devo limpar o ar-condicionado?",
    a: "Varia conforme o uso, a quantidade de poeira do ambiente e a orientação do fabricante. Aparelhos ligados todos os dias costumam pedir intervalos menores. Na dúvida, o manual do equipamento é a melhor referência.",
  },
  {
    q: "Posso pedir a instalação de um aparelho que já comprei?",
    a: "Em geral, sim. Informe marca, modelo e potência (BTUs) na descrição: isso ajuda a avaliar antes da visita o que o local precisa, como ponto elétrico e espaço para a unidade externa.",
  },
  {
    q: "O que acontece depois que eu simulo o orçamento?",
    a: "Nada é enviado. Esta página é uma demonstração: ao final você vê um resumo pronto para copiar. Em um site real, esse resumo seria encaminhado para o canal de atendimento da empresa, como o WhatsApp.",
  },
];

export const NAV_LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#duvidas", label: "Dúvidas" },
  { href: "#orcamento", label: "Orçamento" },
];

export const SEO = {
  title: `${COMPANY_NAME} — Modelo de site para climatização em ${CITY}`,
  description:
    "Site demonstrativo de uma empresa fictícia de ar-condicionado: instalação, limpeza e manutenção, com simulação de pedido de orçamento.",
};
