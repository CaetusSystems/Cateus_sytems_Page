/**
 * Posts do blog da Caetus.
 *
 * Fonte única usada por `Blog.tsx` (lista completa) e `Footer.tsx` (últimos
 * posts, em todas as páginas do site). Para publicar um post novo: acrescente
 * um item aqui com a rota real da página do artigo — nada mais muda.
 */

export type BlogPost = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  /** data de publicação, formato ISO (YYYY-MM-DD) — usada para ordenar "últimos posts" */
  date: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "/blog/futuro-do-seo-com-ia",
    tag: "SEO • AEO • GEO",
    title: "SEO está mudando: seu próximo cliente talvez nunca entre no Google",
    excerpt:
      "Como preparar sua empresa para ser encontrada por inteligências artificiais como ChatGPT, Gemini e Copilot — sem depender só da busca tradicional.",
    date: "2026-06-18",
  },
  {
    slug: "/blog/aparece-no-instagram-mas-nao-no-google",
    tag: "Presença digital • Google vs. redes sociais",
    title: "Sua empresa some no Google, mas aparece no Instagram",
    excerpt:
      "Por que o Instagram aparece na busca e o site não — e o passo a passo real para o Google indexar seu site: Search Console, sitemap e Perfil da Empresa.",
    date: "2026-07-18",
  },
  {
    slug: "/blog/perfil-google-nao-substitui-site",
    tag: "Presença digital • Google Maps e site",
    title: "Seu Perfil do Google não substitui um site",
    excerpt:
      "Por que o Perfil da Empresa ajuda a ser encontrado, mas o site ainda é o que organiza a confiança e converte visitas em contato.",
    date: "2026-07-18",
  },
  {
    slug: "/blog/site-nao-converte-em-contato",
    tag: "Presença digital • Conversão do site",
    title: "Seu site recebe visitas, mas não gera contato",
    excerpt:
      "Por que um site pode ter acesso e ainda assim não gerar WhatsApp, formulário ou ligação — e o que ajustar para transformar visita em contato.",
    date: "2026-07-19",
  },
];

/** Posts mais recentes primeiro, limitados a `limit` — usado pelo Footer. */
export function latestPosts(limit: number): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}
