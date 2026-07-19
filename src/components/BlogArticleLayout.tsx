import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useDocumentHead } from "@/lib/useDocumentHead";
import { WHATSAPP_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/BlogVisuals";

/**
 * Layout único para páginas de post do blog — mesma estrutura e mesmo
 * padrão de SEO/schema.org de `BlogFuturoSeoComIA.tsx`, só que reutilizável:
 * um post novo passa dados (título, FAQ, corpo) em vez de recriar nav,
 * hero, FAQ, referências e CTA final do zero. Ver `.claude/skills/blog-writer/`
 * para o checklist de como usar isto para escrever um post novo.
 */

export type BlogFaqItem = { q: string; a: string };
export type BlogReference = { label: string; href: string };

export type BlogArticleLayoutProps = {
  /** rota completa do post, ex. "/blog/meu-post" */
  url: string;
  /** título do artigo, sem o sufixo " — Caetus Systems" (o layout adiciona). Texto puro — usado em <title>, og:title e JSON-LD. */
  title: string;
  /**
   * Versão visual do H1 (opcional). Use para destacar a frase-chave na cor
   * da marca, ex.: `<>Sua empresa some no Google, <Highlight>mas aparece no
   * Instagram</Highlight></>` (ver `Highlight` em BlogVisuals.tsx). Se
   * omitido, usa `title` como texto simples.
   */
  titleNode?: ReactNode;
  /** meta description, 140–160 caracteres */
  description: string;
  /** data ISO (YYYY-MM-DD) */
  published: string;
  /** data ISO (YYYY-MM-DD); default = published */
  modified?: string;
  authorName?: string;
  authorRole?: string;
  authorImage?: string;
  /** texto curto acima do H1, ex. "SEO local • Google vs. redes sociais" */
  eyebrow: string;
  /** linha de apoio abaixo do H1 — a resposta direta em 1-2 frases (AEO) */
  lead: string;
  /** tags temáticas — viram `about`/`keywords` do schema BlogPosting */
  tags: string[];
  /** mínimo 4 perguntas — vira bloco de FAQ + FAQPage JSON-LD */
  faq: BlogFaqItem[];
  references?: BlogReference[];
  /** link interno para produto/seção relacionada do site */
  ctaHref?: string;
  ctaLabel?: string;
  /** corpo do artigo — use <BlogSection> para cada H2 */
  children: ReactNode;
};

export function BlogArticleLayout({
  url,
  title,
  titleNode,
  description,
  published,
  modified,
  authorName = "Henrique Caetano",
  authorRole = "Fundador da Caetus Systems",
  authorImage = "/Henrique Caetano perfil.jpeg",
  eyebrow,
  lead,
  tags,
  faq,
  references = [],
  ctaHref = "/#solucoes",
  ctaLabel = "Conhecer nossas soluções",
  children,
}: BlogArticleLayoutProps) {
  const modifiedDate = modified ?? published;
  const fullTitle = `${title} — Caetus Systems`;

  useDocumentHead({
    title: fullTitle,
    description,
    canonical: url,
    og: {
      "og:title": title,
      "og:description": description,
      "og:type": "article",
      "og:url": url,
      "og:locale": "pt_BR",
      "article:author": authorName,
      "article:published_time": published,
      "article:modified_time": modifiedDate,
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          "@id": `${url}#article`,
          headline: title,
          description,
          inLanguage: "pt-BR",
          datePublished: published,
          dateModified: modifiedDate,
          author: {
            "@type": "Person",
            name: authorName,
            jobTitle: authorRole,
            image: authorImage,
            worksFor: { "@type": "Organization", name: "Caetus Systems" },
          },
          publisher: {
            "@type": "Organization",
            name: "Caetus Systems",
            logo: { "@type": "ImageObject", url: "/favicon.ico" },
          },
          about: tags,
          keywords: tags.join(", "),
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: "/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
            { "@type": "ListItem", position: 3, name: title, item: url },
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    },
  });

  return (
    <main className="bg-background text-foreground">
      <a
        href="#conteudo-artigo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>

      <div className="border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/caetus-logo.png"
              alt="Caetus Systems"
              className="h-7 w-7 rounded-md object-contain"
            />
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Caetus <span className="font-normal text-muted-foreground">Systems</span>
            </span>
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar ao blog
          </Link>
        </div>
      </div>

      <article id="conteudo-artigo">
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklab,var(--primary)_18%,transparent)_0%,transparent_70%)]"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-4xl px-6 pb-16 pt-20 md:pt-28">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                {eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
                {titleNode ?? title}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground">{lead}</p>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <img
                    src={authorImage}
                    alt={authorName}
                    referrerPolicy="no-referrer"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{authorName}</p>
                    <p className="text-xs">{authorRole}</p>
                  </div>
                </div>
                <span className="hidden h-4 w-px bg-border sm:inline-block" aria-hidden="true" />
                <p className="text-xs">
                  Publicado em <time dateTime={published}>{formatDatePtBr(published)}</time>
                  {modifiedDate !== published && (
                    <>
                      {" "}
                      · Atualizado em{" "}
                      <time dateTime={modifiedDate}>{formatDatePtBr(modifiedDate)}</time>
                    </>
                  )}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {children}

        <section className="border-t border-border/60 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Quer resolver isso na sua empresa?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-primary-foreground/70">
              A Caetus Systems cuida da presença digital de pequenas empresas de Lagoa Santa,
              Belo Horizonte e região — do site ao WhatsApp com IA.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-green)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Conversar no WhatsApp
              </a>
              <Link
                to={ctaHref}
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-transparent px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="border-t border-border/60">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <HelpCircle className="h-4 w-4" aria-hidden="true" /> Perguntas frequentes
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Dúvidas sobre {eyebrow.split("•")[0].trim().toLowerCase()}
            </h2>

            <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
              {faq.map((item) => (
                <details key={item.q} className="group p-5 open:bg-muted/30">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <h3 className="text-base font-semibold text-foreground">{item.q}</h3>
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45"
                      aria-hidden="true"
                    >
                      <span className="text-lg leading-none">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </details>
              ))}
            </div>

            {references.length > 0 && (
              <div className="mt-10 rounded-2xl border border-border/60 bg-muted/30 p-5 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Referências</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {references.map((ref) => (
                    <li key={ref.href}>
                      <a
                        href={ref.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-foreground"
                      >
                        {ref.label}
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </article>
    </main>
  );
}

/**
 * Bloco de conteúdo padrão do corpo do artigo — um por H2. Por padrão o
 * texto fica limitado a `max-w-2xl` (prosa legível); passe `wide` para
 * seções com componentes visuais de BlogVisuals.tsx (ComparisonGrid,
 * FlowSteps, BeforeAfterGrid, Timeline), que precisam da largura cheia.
 */
export function BlogSection({
  title,
  eyebrow,
  icon: Icon,
  muted,
  wide,
  lead,
  children,
}: {
  title?: string;
  /** rótulo curto acima do H2, ex. "Checklist Caetus" — some com um ícone */
  eyebrow?: string;
  icon?: LucideIcon;
  muted?: boolean;
  /** remove o limite de largura de prosa — use com componentes visuais */
  wide?: boolean;
  /** linha de apoio abaixo do H2, mesmo padrão do lead do hero */
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("border-t border-border/60", muted && "bg-muted/30")}>
      <div className="mx-auto max-w-4xl px-6 py-16">
        {(eyebrow || title) && (
          <Reveal>
            <div>
              {eyebrow && (
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                  {eyebrow}
                </div>
              )}
              {title && (
                <h2 className={cn("text-3xl font-semibold tracking-tight md:text-4xl", eyebrow && "mt-2")}>
                  {title}
                </h2>
              )}
              {lead && <p className="mt-3 max-w-2xl text-muted-foreground">{lead}</p>}
            </div>
          </Reveal>
        )}
        <div className={cn("mt-8", !wide && "max-w-2xl space-y-4 text-muted-foreground")}>
          {children}
        </div>
      </div>
    </section>
  );
}

function formatDatePtBr(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" });
}
