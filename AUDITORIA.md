# Auditoria — Landing Page Caetus Systems

**Branch:** `redesign/landing-conversao` · **Data:** 2026-07-10
**Base analisada:** código completo (`src/pages/Home.tsx`, 3.427 linhas), tokens (`src/styles.css`), `index.html`, e screenshots do site publicado em https://cateus-sytems-page.vercel.app/ (desktop e mobile).

**Objetivo aprovado pelo cliente:** landing com aparência de SaaS premium, focada em conversão de empresários pequenos/médios de negócios tradicionais, que entendem o valor em menos de 30 segundos.

---

## 1. Números que resumem o problema

| Métrica | Hoje |
|---|---|
| Altura da página (desktop 1296px) | ~19.200 px (~24 telas) |
| Altura da página (mobile 390px) | ~27.800 px (~33 telas) |
| Seções | 16 |
| Vezes que a lista de serviços se repete | 5 (Operation, WhatsIncluded, Ecosystem, Meanwhile, EvolutionTimeline) |
| Vezes que o argumento "um contrato substitui vários fornecedores" aparece | 4 (ValueProp, Ecosystem, Economy, FAQ) |
| Linhas do `Home.tsx` | 3.427 (tudo em um arquivo) |
| Seção de produtos como catálogo | não existe |
| Depoimentos | não existem |

O visitante com pouco tempo precisa rolar ~10 telas até encontrar a primeira lista do que a Caetus faz — e quando encontra, encontra cinco versões dela.

---

## 2. Pontos fortes (manter e valorizar)

1. **Demo ao vivo do WhatsApp** (`WhatsAppLiveDemo`) — é o melhor elemento do site, de longe. Lista de conversas com IA respondendo, telefone com conversa animada, encaminhamento humano. Nenhum concorrente local tem isso. É o candidato natural a "assinatura visual" da página.
2. **MockDashboard no hero** — o feed de eventos ("Cliente atendido automaticamente...") mostra o produto funcionando em vez de descrever. Certo em conceito; precisa só de ajuste de credibilidade (ver fraqueza 8).
3. **Headline do hero** — "Sua empresa funcionando, mesmo quando você não está." É a frase certa. Deve continuar sendo a primeira coisa lida.
4. **Base técnica sólida** — Tailwind v4 com tokens oklch bem definidos, shadcn/ui, `prefers-reduced-motion` respeitado, `focus-visible` consistente, SEO/schema.org completo (FAQPage, LocalBusiness). Nada disso precisa ser refeito.
5. **CTA único e correto** — tudo converge para o WhatsApp (botão flutuante, nav, CTA final). Para esse público, é o canal certo.
6. **Identidade de cor honesta** — azul confiança + verde WhatsApp. Poucas cores, como o brief pede. Mantém.

---

## 3. Pontos fracos

### Estrutura e repetição
1. **A página conta a mesma história cinco vezes.** `Operation` (4 blocos × 4 bullets), `WhatsIncluded` (16 chips), `Ecosystem` (7 categorias × ~5 itens + animação "35+"), `Meanwhile` (8 tarefas) e `EvolutionTimeline` (5 etapas com itens) são todas variações de "olha tudo que a gente faz". Um empresário lê a primeira e pula as outras quatro — mas paga o custo de rolagem de todas.
2. **O argumento anti-fornecedores aparece 4 vezes** (ValueProp gigante, intro do Ecosystem, Economy inteira, FAQ). É um bom argumento dito uma vez.
3. **Não existe seção de produtos.** "Funcionário Digital", "Bot WhatsApp", "Caetus Studio", "Sites", "Dashboards" não aparecem como coisas nomeadas que se contratam. O site vende um conceito abstrato ("Operação Digital") e esconde o cardápio.
4. **`About` é uma página institucional inteira dentro da landing**: 4 parágrafos de bio + mapa de cobertura + 12 chips de cidades + card de atendimento remoto + 5 diferenciais + citação em 5xl. Sozinha ela tem o tamanho que a landing ideal inteira deveria ter.
5. **`CostOfInaction` + `Problem` + `BeforeAfter` = três seções de dor.** 8 cards de dor + 6 cards de custo + 12 frases de antes/depois. O medo como argumento aparece 26 vezes. Uma seção de dor curta basta.

### Aparência de "gerado por IA" / template
6. **O mesmo esqueleto de seção repetido ~10 vezes:** eyebrow colorido em cima + H2 central 4xl/5xl + subtítulo muted + grid de cards com ícone Lucide em quadradinho `bg-primary/10`. Depois da terceira vez, o olho reconhece o template.
7. **Variantes de reveal aleatórias por índice** (`fade-up`, `slide-left`, `slide-right`, `scale-in` sorteadas por `i % variants.length`) — variedade sem significado é exatamente o que faz uma página parecer gerada. Um único movimento consistente parece mais caro.
8. **Contadores fake que sobem sozinhos** ("128 clientes atendidos" +1 a cada 6s, "37 respondidas hoje", "97% automático"). Para um empresário desconfiado, número que cresce sozinho na tela sem fonte = número inventado. Risco direto de credibilidade. A demo deve se assumir como demonstração, não fingir ser telemetria real.
9. **Excesso de enfeite simultâneo:** Sparkles em 6 lugares, badges flutuantes, partículas temáticas na timeline, órbita de 16 ícones, shine sweep, breathing glow, ping em 5 elementos. Cada um é bom; todos juntos competem. O brief pede "menos elementos competindo".
10. **Emojis na interface** (📍 Empresa Local, ✔ verde na timeline, 🤖 nos previews) misturados com ícones Lucide — duas linguagens visuais ao mesmo tempo.

### Hierarquia e leitura
11. **O banner `caetus-banner.png` vem antes do headline.** A primeira coisa que o visitante vê é o logo gigante (que já está na nav), empurrando a proposta de valor para baixo. Em mobile isso custa uma tela inteira.
12. **Blocos de texto longos** em Economy (2 parágrafos + card), Ecosystem (2 parágrafos), About (4 parágrafos), Meanwhile ("Referência ilustrativa: ..."). O público declarado não lê isso.
13. **Seções inteiras ficam invisíveis até o scroll** (`section-reveal` com `opacity: 0`) — o screenshot full-page do site publicado mostra ~70% da página em branco. Qualquer contexto sem IntersectionObserver (print, leitores, captura) vê uma página vazia.

### Técnica
14. **`Home.tsx` com 3.427 linhas** — 16 seções, 3 demos animadas e todos os dados (conversas, FAQs, listas) inline. Inviável de manter e contradiz o próprio pedido de componentes desacoplados.
15. **Muitos timers simultâneos:** MockDashboard (3), WhatsAppLiveDemo (~6), LiveCounters (1), ResultBadges (recursivo), EvolutionTimeline (2), EcosystemHighlight (3), carrossel com rAF contínuo. Tudo roda ao mesmo tempo mesmo fora da viewport — custo de bateria/CPU em celular fraco, justamente o dispositivo do público-alvo.

---

## 4. O que remover, condensar e manter

### Remover (seções inteiras)
| Seção | Motivo |
|---|---|
| `ValueProp` | O argumento vira uma linha no hero ou some; hoje custa uma tela inteira |
| `CostOfInaction` | Terceira seção de medo; a dor já foi estabelecida |
| `WhatsIncluded` | 16 chips que repetem o Ecosystem |
| `Meanwhile` | Repete o que o MockDashboard do hero já demonstra melhor |
| `Economy` | Fica só o miolo: os 4 cards de benefício migram para "Benefícios"; o resto repete |
| `EvolutionTimeline` | Vira uma frase no fim do "Como funciona" ("e depois seguimos evoluindo com você") |
| Citação institucional no About | Bonita, mas é decoração de uma seção que já é longa demais |

### Condensar
| Seção | De → Para |
|---|---|
| `Problem` | 8 cards em carrossel → 3–4 dores fixas, uma linha cada |
| `BeforeAfter` | 6 pares longos → 4 pares de uma linha (é a melhor forma de "resultado" sem depoimentos reais) |
| `About` | Página institucional → foto + 3 linhas + chip "Lagoa Santa e região · atendimento remoto Brasil". Versão completa (mapa, cidades, bio) vai para página `/sobre` |
| `FAQ` | 10 itens → 6 na página (schema.org mantém os 10 no `index.html`) |
| `Operation` + `Ecosystem` | Fundem-se no novo catálogo de **Produtos** |

### Manter (com ajustes)
- **Hero** — sem o banner; headline primeiro; MockDashboard rotulado como demonstração.
- **WhatsAppLiveDemo** — vira a seção "Demonstração", com mais destaque e pausa quando fora da viewport.
- **ForWho** — vira faixa compacta de segmentos (é a ponte para "casos de uso").
- **CTA final, footer, botão flutuante, nav** — mantidos.
- **Tokens de design** — mantidos integralmente (azul + verde + oklch).

---

## 5. Nova arquitetura

Cada seção responde exatamente uma pergunta, na ordem em que um empresário pergunta:

| # | Seção | Pergunta que responde | Conteúdo |
|---|---|---|---|
| 1 | **Hero** | "O que é isso?" | Headline atual + 1 linha + 2 CTAs + MockDashboard |
| 2 | **Dores** (faixa curta) | "Isso é pra mim?" | 3–4 dores em uma linha cada |
| 3 | **Produtos** | "O que exatamente vocês vendem?" | Catálogo de cards: Funcionário Digital, Bot WhatsApp, Sites, Automações, Dashboards, Sistemas sob medida, Caetus Studio, IA para atendimento. Nome + resumo de 1 linha + 3 benefícios + "Saiba mais". Data-driven (array), preparado para crescer |
| 4 | **Como funciona** | "Como eu contrato e o que acontece?" | 3 passos (Conversamos → Montamos → Cuidamos), visual, quase sem texto |
| 5 | **Demonstração** | "Cadê funcionando?" | WhatsAppLiveDemo em destaque, tela inteira, rotulada como simulação |
| 6 | **Benefícios** | "O que eu ganho?" | 4 cards (custo previsível, vende mais, deixa de ser o gargalo, tranquilidade) |
| 7 | **Antes / Depois** | "O que muda no meu dia?" | 4 pares curtos (animação atual, enxuta) |
| 8 | **Para quem + casos de uso** | "Funciona pro meu tipo de negócio?" | Segmentos com 1 mini-caso de uso cada ("Restaurante: cardápio + reservas no WhatsApp") |
| 9 | **Depoimentos** | "Quem já confia?" | NOVA — estrutura pronta com placeholders honestos ("Em breve depoimentos de clientes") ou os 2–3 primeiros reais |
| 10 | **Quem somos** (compacto) | "Quem está por trás?" | Foto + 3 linhas + região de atendimento; link para `/sobre` |
| 11 | **FAQ** | "E as minhas objeções?" | 6 perguntas em accordion |
| 12 | **CTA final** | "Como falo com vocês?" | Mantido, forte, fundo primary |

**Meta de tamanho:** ≤ 9.000 px desktop (menos da metade de hoje), ≤ 13.000 px mobile.

### Wireframe textual

```
┌──────────────────────────────────────────────┐
│ NAV  logo · Produtos · Como funciona · FAQ   │
│                        [ (31) 97213-1824 ]   │
├──────────────────────────────────────────────┤
│ 1 HERO                                       │
│   Sua empresa funcionando,                   │
│   mesmo quando você não está.                │
│   Uma linha de apoio. [Falar no WhatsApp]    │
│   ┌────────────────────────────────┐         │
│   │  MockDashboard (demonstração)  │         │
│   └────────────────────────────────┘         │
├──────────────────────────────────────────────┤
│ 2 DORES   ✕ dor · ✕ dor · ✕ dor · ✕ dor      │  ← faixa de 1 linha cada
├──────────────────────────────────────────────┤
│ 3 PRODUTOS                                   │
│   ┌────────┐ ┌────────┐ ┌────────┐           │
│   │Funcion.│ │  Bot   │ │ Sites  │  ...      │  ← cards grandes,
│   │Digital │ │WhatsApp│ │        │           │    ícone grande,
│   │· · ·   │ │· · ·   │ │· · ·   │           │    3 benefícios,
│   │[Saiba+]│ │[Saiba+]│ │[Saiba+]│           │    grid 3–4 col
│   └────────┘ └────────┘ └────────┘           │
├──────────────────────────────────────────────┤
│ 4 COMO FUNCIONA   ① Conversamos              │
│                   ② Montamos                 │
│                   ③ Cuidamos todo dia        │
├──────────────────────────────────────────────┤
│ 5 DEMONSTRAÇÃO (assinatura da página)        │
│   [lista de conversas]  [telefone animado]   │
│   "Um atendente que nunca dorme"             │
├──────────────────────────────────────────────┤
│ 6 BENEFÍCIOS   4 cards grandes               │
├──────────────────────────────────────────────┤
│ 7 ANTES/DEPOIS   [sem ✕] → [com ✓]  4 pares  │
├──────────────────────────────────────────────┤
│ 8 PARA QUEM   restaurante · clínica · loja…  │
│   + 1 mini caso de uso por segmento          │
├──────────────────────────────────────────────┤
│ 9 DEPOIMENTOS   3 cards (placeholder pronto) │
├──────────────────────────────────────────────┤
│ 10 QUEM SOMOS   [foto] 3 linhas · região     │
├──────────────────────────────────────────────┤
│ 11 FAQ   6 perguntas accordion               │
├──────────────────────────────────────────────┤
│ 12 CTA FINAL   fundo azul, botão verde       │
│ FOOTER                                       │
└──────────────────────────────────────────────┘
```

---

## 6. Direção de design

- **Tokens mantidos** (azul oklch 0.32/0.11/258 + verde 0.68/0.14/155). Nada de nova paleta — consistência com a marca existente.
- **Um único padrão de reveal** (fade-up suave), sem variantes sorteadas. Animações pausam fora da viewport (IntersectionObserver já existe; passa a controlar os timers).
- **A ousadia concentrada num lugar só:** a seção Demonstração. Todo o resto fica quieto — mais branco, cards maiores, menos bordas e menos glow.
- **Contadores honestos:** a demo ganha o selo "Simulação do atendimento" e os números param de fingir telemetria.
- **Zero emoji na UI**; só Lucide, em tamanho maior (o brief pede ícones maiores).
- **Copy:** máximo 3 linhas por bloco; título afirma benefício, subtítulo explica em uma frase; verbos ativos.

## 7. Direção técnica

- Quebrar `Home.tsx` em `src/components/sections/` (um arquivo por seção) + `src/data/` (products.ts, faq.ts, testimonials.ts) — o catálogo cresce editando um array.
- Componente `Section` único para normalizar espaçamento/padding (evita a guerra de seletores que o CSS atual insinua).
- Reuso: `Button`, `Accordion` (para FAQ), `Card` do shadcn já existentes — sem dependências novas.
- Página `/sobre` recebe o conteúdo institucional completo (bio, mapa, cidades) — nada é perdido, só sai da landing.
- SEO: schema.org do `index.html` intocado; âncoras novas (`#produtos`, `#como-funciona`, `#faq`).

---

## 8. Próximo passo

Aguardando aprovação desta auditoria. Com o OK:
1. Implementação seção a seção na branch `redesign/landing-conversao` (main intocada).
2. Screenshots comparativos a cada bloco entregue.
3. Nada de conteúdo institucional é apagado — o que sai da landing migra para `/sobre`.
