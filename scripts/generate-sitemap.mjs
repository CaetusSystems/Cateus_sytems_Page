// Gera public/sitemap.xml a partir de scripts/routes.mjs (fonte única de
// rotas). Rodar antes do build (ou como parte do postbuild) para o sitemap
// nunca ficar desatualizado em relação às rotas reais do site.

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES } from "./routes.mjs";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://caetussystems.com.br";
const OUT_PATH = path.resolve(dirname, "../public/sitemap.xml");
const today = new Date().toISOString().slice(0, 10);

const urlEntries = ROUTES.map((route) => {
  const loc = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
  const lastmod = route.lastmod ?? today;
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`;
}).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

await writeFile(OUT_PATH, xml, "utf-8");
console.log(`sitemap.xml gerado com ${ROUTES.length} rotas em ${OUT_PATH}`);
