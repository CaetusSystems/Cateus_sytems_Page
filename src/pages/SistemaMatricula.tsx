import { useEffect } from "react";
import { ArrowRight, Check, Plus } from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { FichaViraCelular } from "@/components/matricula/FichaViraCelular";
import {
  CHECKOUT_MATRICULA_URL,
  CTA_MATRICULA_URL,
  DUVIDAS,
  INCLUSO,
  MODULOS,
  PASSOS_FAMILIA,
  PASSOS_IMPLANTACAO,
  PRECO_IMPLANTACAO,
  PRECO_IMPLANTACAO_NUMERO,
  PRECO_MENSAL,
  SAI_DA_SECRETARIA,
  WHATSAPP_MATRICULA,
} from "@/data/matricula-venda";
import { useDocumentHead } from "@/lib/useDocumentHead";
import "./sistema-matricula.css";

const FONTES_URL =
  "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700;6..12,800&display=swap";

const IMG = "/img/matricula/";

/** Prints reais do ambiente de teste da Passo a Passo (dados de exemplo). */
const TELAS_CELULAR = [
  { src: `${IMG}matricula-celular-1-responsavel.webp`, legenda: "Dados do responsável", alt: "Etapa 1 de 7 da matrícula no celular: dados do responsável (pré-visualização, dados de exemplo)" },
  { src: `${IMG}matricula-celular-3-turma.webp`, legenda: "Escolha da turma", alt: "Etapa 3 de 7 da matrícula no celular: escolha da turma (pré-visualização, dados de exemplo)" },
  { src: `${IMG}matricula-celular-4-documentos.webp`, legenda: "Envio dos documentos", alt: "Etapa 4 de 7 da matrícula no celular: envio dos documentos (pré-visualização, dados de exemplo)" },
  { src: `${IMG}matricula-celular-5-aceite.webp`, legenda: "Aceite do contrato", alt: "Etapa 7 de 7 da matrícula no celular: aceite eletrônico do contrato (pré-visualização, dados de exemplo)" },
];

const TELAS_ESCOLA = [
  { src: `${IMG}ficha-matricula.webp`, titulo: "Ficha da matrícula", legenda: "Situação, documentos que faltam e contrato de cada criança num lugar só.", alt: "Ficha de matrícula de um aluno no painel da escola, com situação, documentação pendente e contrato (dados de exemplo)" },
  { src: `${IMG}financeiro.webp`, titulo: "Financeiro", legenda: "Ganhos, despesas e saldo da escola.", alt: "Painel financeiro da escola com ganhos, despesas e saldo (dados de exemplo)" },
  { src: `${IMG}calendario.webp`, titulo: "Calendário escolar", legenda: "Datas e eventos que as famílias também enxergam.", alt: "Calendário escolar do mês com eventos de exemplo" },
  { src: `${IMG}identidade-visual.webp`, titulo: "Identidade visual", legenda: "Nome, logo e cores da escola em todas as telas.", alt: "Tela de identidade visual da escola, com nome, cores e prévia (dados de exemplo)" },
];

const TITULO = "Sistema de matrícula online para escola infantil";
const DESCRICAO = `A família faz a matrícula pelo celular, envia os documentos e assina o contrato. A escola recebe tudo num painel com a cara dela. Implantação ${PRECO_IMPLANTACAO} e ${PRECO_MENSAL} por mês.`;

type Trackers = { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void };

/** Conta o clique no botão de compra (GA4 e Pixel). Nunca atrapalha a navegação. */
function contarClique(origem: string) {
  const w = globalThis as unknown as Trackers;
  const checkout = Boolean(CHECKOUT_MATRICULA_URL);
  try {
    w.gtag?.("event", checkout ? "begin_checkout" : "contact", {
      item_id: "sistema-matricula",
      value: PRECO_IMPLANTACAO_NUMERO,
      currency: "BRL",
      origem,
    });
  } catch {
    /* bloqueador de anúncios */
  }
  try {
    if (checkout) w.fbq?.("track", "InitiateCheckout", { value: PRECO_IMPLANTACAO_NUMERO, currency: "BRL" });
    else w.fbq?.("track", "Contact");
  } catch {
    /* idem */
  }
}

function BotaoComprar({ origem, className = "" }: { origem: string; className?: string }) {
  return (
    <a
      href={CTA_MATRICULA_URL}
      target={CHECKOUT_MATRICULA_URL ? undefined : "_blank"}
      rel={CHECKOUT_MATRICULA_URL ? undefined : "noopener noreferrer"}
      onClick={() => contarClique(origem)}
      className={`mv-btn ${className}`}
    >
      Quero na minha escola
      <ArrowRight className="h-5 w-5" aria-hidden="true" />
    </a>
  );
}

function Navegador({ src, alt, largura, altura }: { src: string; alt: string; largura: number; altura: number }) {
  return (
    <figure className="mv-navegador">
      <div className="mv-navegador-barra" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <img src={src} alt={alt} width={largura} height={altura} loading="lazy" decoding="async" className="block h-auto w-full" />
    </figure>
  );
}

export default function SistemaMatricula() {
  useDocumentHead({
    title: `${TITULO} | Caetus Systems`,
    description: DESCRICAO,
    canonical: "/sistema-de-matricula",
    og: {
      "og:title": TITULO,
      "og:description": DESCRICAO,
      "og:url": "/sistema-de-matricula",
      "og:type": "website",
      "og:image": "https://caetussystems.com.br/img/matricula/painel-escola.webp",
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: "Sistema de matrícula online para escola infantil",
          description: DESCRICAO,
          provider: { "@type": "Organization", name: "Caetus Systems", url: "https://caetussystems.com.br" },
          areaServed: "BR",
          offers: {
            "@type": "Offer",
            priceCurrency: "BRL",
            price: String(PRECO_IMPLANTACAO_NUMERO),
            description: `Implantação ${PRECO_IMPLANTACAO} (pagamento único) e ${PRECO_MENSAL} por mês a partir do funcionamento.`,
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: DUVIDAS.map((d) => ({
            "@type": "Question",
            name: d.q,
            acceptedAnswer: { "@type": "Answer", text: d.a },
          })),
        },
      ],
    },
    lang: "pt",
    alternatesOf: "/sistema-de-matricula",
  });

  // Fontes desta página (só carregam aqui).
  useEffect(() => {
    if (document.querySelector(`link[href="${FONTES_URL}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONTES_URL;
    document.head.appendChild(link);
  }, []);

  return (
    <div className="mv min-h-screen antialiased">
      <Nav />
      <main>
        {/* Topo */}
        <section className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-4 pb-14 pt-8 sm:px-6 md:pt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14 lg:pb-24">
          <div>
            <h1 className="mv-display text-[clamp(2.3rem,5.6vw,3.9rem)] font-extrabold">
              Matrícula pelo celular. Contrato assinado. Nenhuma pasta de papel.
            </h1>
            <p className="mt-5 max-w-[34rem] text-[1.125rem] leading-relaxed text-[var(--mv-tinta-suave)] md:text-[1.2rem]">
              A família faz a matrícula do filho no celular, manda os documentos pela câmera e assina o contrato da sua
              escola. A secretaria recebe tudo pronto, num painel com o nome e as cores da escola.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <BotaoComprar origem="topo" />
              <a href="#como-funciona" className="font-bold text-[var(--mv-caneta)] underline">
                Ver como a família faz
              </a>
            </div>
            <p className="mv-num mt-5 text-[0.98rem] text-[var(--mv-tinta-suave)]">
              Implantação <strong className="text-[var(--mv-tinta)]">{PRECO_IMPLANTACAO}</strong>, uma vez só. Depois{" "}
              <strong className="text-[var(--mv-tinta)]">{PRECO_MENSAL} por mês</strong>, só quando estiver funcionando.
            </p>
          </div>
          <FichaViraCelular />
        </section>

        {/* Quem já usa */}
        <section aria-label="Escolas que já usam" className="border-y border-[var(--mv-papel-linha)] bg-white/85">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-7 sm:flex-row sm:justify-between sm:px-6">
            <p className="text-center text-[1.05rem] font-bold sm:text-left">Já é o sistema de matrícula de duas escolas:</p>
            <ul className="flex items-center gap-8">
              <li className="flex items-center gap-3">
                <img src="/img/matricula/logo-celd.webp" alt="" width={150} height={150} className="h-12 w-12 rounded-xl" />
                <span className="text-[0.98rem] font-bold leading-tight">
                  CELD
                  <br />
                  <span className="font-semibold text-[var(--mv-tinta-suave)]">Centro Educacional</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <img src="/img/matricula/logo-passo-a-passo.webp" alt="" width={240} height={264} className="h-14 w-auto" />
                <span className="text-[0.98rem] font-bold leading-tight">
                  Passo a Passo
                  <br />
                  <span className="font-semibold text-[var(--mv-tinta-suave)]">Escola Infantil</span>
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* O que acaba */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div>
              <h2 className="mv-display text-[clamp(2rem,4.6vw,3.2rem)] font-extrabold">
                O que sai da mesa da secretaria
              </h2>
              <p className="mt-4 max-w-[30rem] text-[1.08rem] leading-relaxed text-[var(--mv-tinta-suave)]">
                Época de matrícula é quando a secretaria mais corre atrás de papel. Com o sistema, cada família faz a
                própria parte e a escola só confere.
              </p>
            </div>
            <div className="mv-folha rotate-[1.2deg] p-6 sm:p-9">
              <ul className="space-y-4 text-[1.06rem] sm:text-[1.12rem]">
                {SAI_DA_SECRETARIA.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-dashed border-[#c9d2ca] pb-4 last:border-0 last:pb-0">
                    <span className="mt-1 h-4 w-4 shrink-0 rounded-[4px] border-2 border-[var(--mv-caneta)]" aria-hidden="true" />
                    <span className="mv-tachado font-semibold text-[var(--mv-tinta-suave)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Como a família faz */}
        <section id="como-funciona" className="mv-quadro scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <h2 className="mv-display max-w-3xl text-[clamp(2rem,4.6vw,3.2rem)] font-extrabold text-white">
              Como a família faz a matrícula
            </h2>
            <p className="mt-4 max-w-[36rem] text-[1.08rem] leading-relaxed text-[var(--mv-giz-suave)]">
              Do link até a matrícula confirmada, tudo no celular dela. Sem fila na secretaria e sem papel indo e voltando.
            </p>
            <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
              <ol className="space-y-7">
                {PASSOS_FAMILIA.map((p, i) => (
                  <li key={p.titulo} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4">
                    <span className="mv-display mv-num flex h-12 w-12 items-center justify-center rounded-full bg-[var(--mv-lapis)] text-[1.35rem] font-extrabold text-[var(--mv-tinta)]">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-[1.2rem] font-extrabold text-white">{p.titulo}</h3>
                      <p className="mt-1 max-w-[30rem] leading-relaxed text-[var(--mv-giz-suave)]">{p.texto}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="lg:sticky lg:top-24">
                <Navegador
                  src="/img/matricula/portal-familia.webp"
                  alt="Portal da família no sistema da Escola Infantil Passo a Passo, com a matrícula 2027 e o contrato disponível (dados de exemplo)"
                  largura={1440}
                  altura={810}
                />
                <p className="mt-3 text-[0.9rem] text-[var(--mv-giz-suave)]">
                  Portal da família na Escola Infantil Passo a Passo. Dados de exemplo.
                </p>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
              {TELAS_CELULAR.map((t) => (
                <figure key={t.src}>
                  <div className="mv-celular mx-auto max-w-[230px]">
                    <div className="mv-tela">
                      <img src={t.src} alt={t.alt} width={740} height={1640} loading="lazy" decoding="async" className="block h-auto w-full" />
                    </div>
                  </div>
                  <figcaption className="mx-auto mt-3 max-w-[230px] text-center text-[0.92rem] font-bold text-[var(--mv-giz)]">
                    {t.legenda}
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-8 text-center text-[0.9rem] text-[var(--mv-giz-suave)]">
              Pré-visualização da matrícula na Escola Infantil Passo a Passo. Dados de exemplo.
            </p>
          </div>
        </section>

        {/* Painel da escola */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <h2 className="mv-display max-w-3xl text-[clamp(2rem,4.6vw,3.2rem)] font-extrabold">
            A escola vê na hora quem falta e o que falta
          </h2>
          <p className="mt-4 max-w-[38rem] text-[1.08rem] leading-relaxed text-[var(--mv-tinta-suave)]">
            Documento pendente, contrato esperando aceite, matrícula concluída. A direção abre o painel e sabe exatamente
            para quem ligar.
          </p>
          <div className="mt-10">
            <Navegador
              src="/img/matricula/painel-escola.webp"
              alt="Painel da direção na Escola Infantil Passo a Passo: matrículas aguardando valor, aguardando aceite, documentação pendente e concluídas (dados de exemplo)"
              largura={1440}
              altura={810}
            />
            <p className="mt-3 text-[0.9rem] text-[var(--mv-tinta-suave)]">
              Painel da direção na Escola Infantil Passo a Passo. Dados de exemplo.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-2">
            {TELAS_ESCOLA.map((t) => (
              <figure key={t.src}>
                <Navegador src={t.src} alt={t.alt} largura={1440} altura={900} />
                <figcaption className="mt-3 text-[0.95rem] text-[var(--mv-tinta-suave)]">
                  <strong className="text-[var(--mv-tinta)]">{t.titulo}.</strong> {t.legenda}
                </figcaption>
              </figure>
            ))}
          </div>

          <h3 className="mv-display mt-20 text-[clamp(1.6rem,3.4vw,2.3rem)] font-extrabold">Tudo o que vem no sistema</h3>
          <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {MODULOS.map((m) => (
              <div key={m.grupo}>
                <h4 className="border-b-2 border-[var(--mv-tinta)] pb-2 text-[1.12rem] font-extrabold">{m.grupo}</h4>
                <ul className="mt-3 space-y-2.5">
                  {m.itens.map((item) => (
                    <li key={item} className="flex gap-2.5 leading-snug">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--mv-quadro)]" strokeWidth={3} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <figure className="sm:col-span-2 lg:col-span-1">
              <Navegador
                src="/img/matricula/turmas-professora.webp"
                alt="Tela Minhas turmas da professora, com as turmas Jardim Lua e Maternal Sol (dados de exemplo)"
                largura={1440}
                altura={810}
              />
              <figcaption className="mt-3 text-[0.9rem] text-[var(--mv-tinta-suave)]">
                A professora vê só as turmas dela.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* O sistema é da escola */}
        <section className="mv-quadro">
          <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <h2 className="mv-display text-[clamp(2rem,4.6vw,3.2rem)] font-extrabold text-white">
              O sistema é da sua escola, não de um cadastro coletivo
            </h2>
            <div className="space-y-6 text-[1.08rem] leading-relaxed text-[var(--mv-giz)]">
              <p>
                Cada escola recebe uma instalação só dela, numa conta em nome da escola. Os dados das famílias não ficam
                misturados com os de outras escolas.
              </p>
              <p>
                O sistema faz uma cópia de segurança automática todos os dias. Quem entra vê só o que a função dele
                permite: direção, secretaria e professora têm acessos diferentes.
              </p>
              <p>
                E tem a cara da escola: nome, logo e cores em todas as telas, inclusive no celular das famílias.
              </p>
            </div>
          </div>
        </section>

        {/* Implantação */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <h2 className="mv-display max-w-3xl text-[clamp(2rem,4.6vw,3.2rem)] font-extrabold">
            Quem configura é a gente
          </h2>
          <p className="mt-4 max-w-[38rem] text-[1.08rem] leading-relaxed text-[var(--mv-tinta-suave)]">
            A implantação é feita pela Caetus. Você manda o que a escola já usa e testa antes de mandar para as famílias.
          </p>
          <ol className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-10 md:grid-cols-5">
            {PASSOS_IMPLANTACAO.map((p, i) => (
              <li key={p.titulo} className="relative border-t-2 border-[var(--mv-tinta)] pt-4">
                <span className="mv-display mv-num text-[2rem] font-extrabold leading-none text-[var(--mv-caneta)]">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-[1.08rem] font-extrabold leading-snug">{p.titulo}</h3>
                <p className="mt-1.5 leading-relaxed text-[var(--mv-tinta-suave)]">{p.texto}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Preço */}
        <section id="preco" className="scroll-mt-20 px-4 pb-20 sm:px-6 md:pb-28">
          <div className="mv-folha mx-auto max-w-3xl p-7 sm:p-12">
            <h2 className="mv-display text-[clamp(1.9rem,4.2vw,2.8rem)] font-extrabold">Quanto custa</h2>
            <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-6 sm:grid-cols-2">
              <div className="border-b-2 border-dashed border-[#c9d2ca] pb-6 sm:border-b-0 sm:border-r-2 sm:pb-0 sm:pr-6">
                <p className="font-bold text-[var(--mv-tinta-suave)]">Implantação</p>
                <p className="mv-display mv-num mt-1 text-[clamp(2.6rem,7vw,3.6rem)] font-extrabold">{PRECO_IMPLANTACAO}</p>
                <p className="text-[var(--mv-tinta-suave)]">uma vez só</p>
              </div>
              <div>
                <p className="font-bold text-[var(--mv-tinta-suave)]">Mensalidade</p>
                <p className="mv-display mv-num mt-1 text-[clamp(2.6rem,7vw,3.6rem)] font-extrabold">
                  {PRECO_MENSAL}
                  <span className="text-[1.1rem] font-bold text-[var(--mv-tinta-suave)]">/mês</span>
                </p>
                <p className="text-[var(--mv-tinta-suave)]">só quando o sistema estiver funcionando</p>
              </div>
            </div>
            <ul className="mt-8 space-y-2.5">
              {INCLUSO.map((i) => (
                <li key={i} className="flex gap-2.5">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--mv-quadro)]" strokeWidth={3} aria-hidden="true" />
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-4">
              <BotaoComprar origem="preco" className="w-full" />
              <p className="text-center text-[0.95rem] text-[var(--mv-tinta-suave)]">
                7 dias para desistir depois que o sistema ficar pronto, com o dinheiro de volta. Na mensalidade, você escolhe o dia do pagamento.
              </p>
            </div>
          </div>
        </section>

        {/* Dúvidas */}
        <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 md:pb-28">
          <h2 className="mv-display text-[clamp(1.9rem,4.2vw,2.8rem)] font-extrabold">Dúvidas de quem dirige escola</h2>
          <div className="mt-8 divide-y divide-[#cfd8d0] border-y border-[#cfd8d0] bg-white/70">
            {DUVIDAS.map((d) => (
              <details key={d.q} className="group px-1">
                <summary className="flex min-h-[60px] cursor-pointer items-center justify-between gap-4 py-4 text-[1.06rem] font-bold">
                  {d.q}
                  <Plus className="mv-mais h-5 w-5 shrink-0 text-[var(--mv-caneta)]" aria-hidden="true" />
                </summary>
                <p className="pb-5 pr-8 leading-relaxed text-[var(--mv-tinta-suave)]">{d.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Chamada final */}
        <section className="mv-quadro">
          <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 md:py-24">
            <h2 className="mv-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold text-white">
              Na próxima matrícula, a família faz pelo celular
            </h2>
            <p className="mv-num mx-auto mt-4 max-w-xl text-[1.08rem] text-[var(--mv-giz-suave)]">
              Implantação {PRECO_IMPLANTACAO}. Mensalidade de {PRECO_MENSAL} só quando estiver funcionando.
            </p>
            <div className="mt-8 flex flex-col items-center gap-5">
              <BotaoComprar origem="final" />
              <a
                href={WHATSAPP_MATRICULA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold text-white underline"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Prefiro tirar uma dúvida antes
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Barra fixa no celular */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--mv-papel-linha)] bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center gap-3">
          <p className="mv-num shrink-0 text-[0.85rem] leading-tight text-[var(--mv-tinta-suave)]">
            <strong className="block text-[1rem] text-[var(--mv-tinta)]">{PRECO_IMPLANTACAO}</strong>
            implantação
          </p>
          <BotaoComprar origem="barra" className="!min-h-[48px] flex-1 !px-4 !text-[1rem]" />
        </div>
      </div>
      <div className="h-20 md:hidden" aria-hidden="true" />
    </div>
  );
}
