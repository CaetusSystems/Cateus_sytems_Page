// Fonte única de rotas do site, usada por generate-sitemap.mjs e prerender.mjs.
// Rotas de post de blog vêm de src/data/blog.ts — cadastrar um post novo lá
// (via a skill blog-writer) já basta para ele entrar no sitemap e ser
// pré-renderizado, sem editar nada aqui.

import { BLOG_POSTS } from "../src/data/blog.ts";

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/sobre", changefreq: "monthly", priority: "0.7" },
  { path: "/produtos/bot-whatsapp", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.6" },
];

const BLOG_ROUTES = BLOG_POSTS.map((post) => ({
  path: post.slug,
  changefreq: "monthly",
  priority: "0.7",
  lastmod: post.date,
}));

export const ROUTES = [...STATIC_ROUTES, ...BLOG_ROUTES];
