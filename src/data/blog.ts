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
];

/** Posts mais recentes primeiro, limitados a `limit` — usado pelo Footer. */
export function latestPosts(limit: number): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}
