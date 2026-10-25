// Fonte única de rotas do site, usada por generate-sitemap.mjs e prerender.mjs.
// Rotas de post de blog vêm de src/data/blog.ts — cadastrar um post novo lá
// (via a skill blog-writer) já basta para ele entrar no sitemap e ser
// pré-renderizado, sem editar nada aqui.

import { BLOG_POSTS } from "../src/data/blog.ts";
import { TRANSLATED_PATHS, localePath } from "../src/i18n/locale.ts";

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/sobre", changefreq: "monthly", priority: "0.7" },
  { path: "/criacao-de-sites", changefreq: "monthly", priority: "0.9" },
  { path: "/atendente-whatsapp", changefreq: "monthly", priority: "0.9" },
  { path: "/sistema-de-matricula", changefreq: "monthly", priority: "0.9" },
  { path: "/templates", changefreq: "monthly", priority: "0.7" },
  { path: "/blog", changefreq: "weekly", priority: "0.6" },
  { path: "/agendar", changefreq: "monthly", priority: "0.8" },
  // Pré-renderizada, mas fora do sitemap (noindex): só quem acabou de enviar o formulário vê.
  { path: "/obrigado", changefreq: "yearly", priority: "0.1", noSitemap: true },
];

const BLOG_ROUTES = BLOG_POSTS.map((post) => ({
  path: post.slug,
  changefreq: "monthly",
  priority: "0.7",
  lastmod: post.date,
}));

// Versões em inglês e espanhol das páginas de venda (mesmos dados, prefixo /en e /es).
const TRANSLATED_ROUTES = ["en", "es"].flatMap((lang) =>
  STATIC_ROUTES.filter((r) => TRANSLATED_PATHS.includes(r.path)).map((r) => ({
    ...r,
    path: localePath(r.path, lang),
    priority: String(Math.max(0.1, Number(r.priority) - 0.1).toFixed(1)),
  })),
);

export const ROUTES = [...STATIC_ROUTES, ...TRANSLATED_ROUTES, ...BLOG_ROUTES];
