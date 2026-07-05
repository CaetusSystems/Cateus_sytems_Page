import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useDocumentHead } from "../lib/useDocumentHead";

const FEATURED = [
  {
    slug: "/blog/futuro-do-seo-com-ia",
    tag: "SEO • AEO • GEO",
    title:
      "SEO está mudando: seu próximo cliente talvez nunca entre no Google",
    excerpt:
      "Como preparar sua empresa para ser encontrada por inteligências artificiais como ChatGPT, Gemini e Copilot — sem depender só da busca tradicional.",
  },
] as const;



export default function Blog() {
  useDocumentHead({
    title: "Blog Caetus Systems — SEO, IA, automação e tecnologia",
    description:
      "Conteúdos sobre SEO, AEO, GEO, inteligência artificial, automação de WhatsApp, Google Business e presença digital para pequenas empresas de Lagoa Santa e região.",
    canonical: "/blog",
    og: {
      "og:title": "Blog Caetus Systems",
      "og:description":
        "SEO, AEO, GEO, IA, WhatsApp Business e presença digital para pequenas empresas.",
      "og:url": "/blog",
      "og:type": "website",
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Blog Caetus Systems",
      description:
        "Conteúdos sobre SEO, AEO, GEO, IA, automação, WhatsApp Business, Google Business, desenvolvimento de software e presença digital.",
      inLanguage: "pt-BR",
    },
  });

  const topics = [
    "SEO, AEO e GEO",
    "Inteligência Artificial para empresas",
    "Automação de WhatsApp",
    "Google Business e Google Maps",
    "Desenvolvimento de software sob medida",
    "Sites profissionais para empresas",
    "Mercado Livre e marketplaces",
    "Integração de sistemas",
    "Marketing e presença digital",
    "Tecnologia para pequenas empresas",
  ];

  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <header className="text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Hub de conhecimento Caetus
        </p>
        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          Blog Caetus Systems
        </h1>
        <p className="mt-4 text-balance text-muted-foreground">
          Conteúdos sobre SEO, IA, automação e tecnologia para pequenas
          empresas de Lagoa Santa, Belo Horizonte e região.
        </p>
      </header>

      <section className="mt-14 space-y-4">
        {FEATURED.map((post) => (
          <Link
            key={post.slug}
            to={post.slug}
            className="group block rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md md:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              {post.tag}
            </p>
            <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight md:text-3xl">
              {post.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{post.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Ler artigo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </section>

      <section className="mt-16">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Próximos temas
        </h2>
        <ul className="mt-4 grid w-full grid-cols-1 gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          {topics.map((t) => (
            <li
              key={t}
              className="rounded-lg border border-border/60 bg-card px-4 py-3 text-left"
            >
              {t}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-14 text-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </main>
  );
}
