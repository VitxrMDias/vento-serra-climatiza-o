# Vento & Serra — Modelo Climatização

Site modelo (one-page) de captação de pedidos de orçamento para um prestador de serviços de
ar-condicionado. **Empresa fictícia, usada apenas para demonstração.** Não há atendimento,
contato nem dados reais.

## O que tem

- Tarja de aviso, cabeçalho com menu (desktop e celular), topo com foto, serviços, etapas,
  área de atendimento, dúvidas (accordion), chamada para orçamento e rodapé.
- Formulário de simulação validado no navegador. Ao enviar, abre um resumo com o botão
  "Copiar mensagem". Nada é enviado para servidor nem armazenado.

## Como personalizar para um cliente

1. **Nome, cidade, textos e serviços** — edite `src/config/site.ts`
   (`COMPANY_NAME`, `CITY`, `STATE`, `SERVICES`, `FAQ`, `VALUE_POINTS`, `STEPS`, `SEO`).
2. **Cores** — edite as variáveis no topo de `src/styles.css` (`--paper`, `--petrol`, `--sage`, `--cta`).
   Confira o contraste do texto sobre o botão de ação (`--cta-foreground`).
3. **Fontes** — troque o link do Google Fonts em `src/routes/__root.tsx` e os nomes em
   `--font-sans` / `--font-display` em `src/styles.css`.
4. **Foto do topo** — substitua `src/assets/hero-sala-climatizada.jpg` (de preferência uma foto
   real do cliente, com autorização) e atualize o texto alternativo em `src/components/site/Hero.tsx`.
5. **Telefone / WhatsApp** — só com o número real do cliente, após a contratação:
   preencha `WHATSAPP_NUMBER` (DDI + DDD + número, só dígitos) em `src/config/site.ts` e mude
   `IS_DEMO` para `false`. O resumo passa a mostrar "Enviar pelo WhatsApp" e os avisos de
   demonstração somem.
6. **Área de atendimento** — substitua o texto em `src/components/site/ServiceArea.tsx` pelos
   bairros/cidades que o cliente confirmar.

## Publicar (somente após aprovação do cliente)

1. Revise todos os textos com o cliente e remova qualquer conteúdo de demonstração.
2. Rode os testes: `bunx vitest run`.
3. Publique pelo botão **Publish** do editor e, se quiser, conecte o domínio do cliente.

## Tecnologia

TanStack Start (React + TypeScript), Tailwind CSS v4 e componentes shadcn/ui.
