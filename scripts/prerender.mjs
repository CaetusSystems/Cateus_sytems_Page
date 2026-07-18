// Pré-renderização pós-build: para cada rota em scripts/routes.mjs, abre a
// SPA já buildada (dist/) num Chromium headless, espera o React montar (e
// useDocumentHead aplicar title/description/JSON-LD) e grava o HTML final
// em dist/<rota>/index.html.
//
// Por quê: a Vercel serve um arquivo estático presente no dist/ antes de
// aplicar o rewrite de SPA (vercel.json), então rastreadores que não
// executam JavaScript (GPTBot, ClaudeBot, PerplexityBot e afins) passam a
// ver o HTML completo da página em vez de um <div id="root"></div> vazio.
// Navegação client-side para humanos continua idêntica — o React assume
// assim que o bundle carrega (hidratação "silenciosa": mesmo componente,
// mesmo DOM, sem hydrate warnings porque createRoot faz remount limpo).

import { createServer } from "node:http";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES } from "./routes.mjs";

// No build da Vercel não dá para usar o Chromium baixado pelo `puppeteer`
// normal — falta biblioteca de sistema (libnspr4.so e afins) que o
// container de build não tem e não deixa instalar via apt. `@sparticuz/chromium`
// é um build de Chromium empacotado justamente para rodar em ambientes
// serverless/CI restritos como esse; localmente (dev/preview) continuamos
// usando o Chromium normal do `puppeteer`, que já está no cache da máquina.
const isServerlessBuild = Boolean(process.env.VERCEL || process.env.CI);

async function launchBrowser() {
  if (isServerlessBuild) {
    const { default: chromium } = await import("@sparticuz/chromium");
    const { default: puppeteerCore } = await import("puppeteer-core");
    return puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
  const { default: puppeteer } = await import("puppeteer");
  return puppeteer.launch({ headless: true });
}

const dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(dirname, "../dist");
const PORT = 4321 + Math.floor(Math.random() * 500);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain",
};

async function fileExists(filePath) {
  try {
    const s = await stat(filePath);
    return s.isFile();
  } catch {
    return false;
  }
}

function startStaticServer() {
  const server = createServer(async (req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    let filePath = path.join(DIST_DIR, urlPath);

    // Espelha o rewrite do vercel.json: se não existe arquivo estático
    // correspondente, cai para o index.html raiz (SPA shell).
    if (!(await fileExists(filePath))) {
      const asIndex = path.join(filePath, "index.html");
      filePath = (await fileExists(asIndex)) ? asIndex : path.join(DIST_DIR, "index.html");
    }

    try {
      const content = await readFile(filePath);
      const ext = path.extname(filePath);
      res.writeHead(200, { "Content-Type": MIME_TYPES[ext] ?? "application/octet-stream" });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end("not found");
    }
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => resolve(server));
  });
}

async function prerenderRoute(browser, baseUrl, route) {
  const page = await browser.newPage();

  // A Home mostra uma splash de abertura (~13s) que trava o scroll do
  // <body> enquanto roda (IntroSplash.tsx). Sem isto, o Puppeteer captura o
  // HTML nesse meio-tempo e o `overflow: hidden` fica gravado para sempre
  // no HTML estático publicado — travando o scroll de todo mundo, mesmo
  // depois do React montar. Marcar a splash como "já vista" antes de
  // navegar garante que ela nunca apareça durante a captura.
  await page.evaluateOnNewDocument(() => {
    try {
      localStorage.setItem("caetus_intro_seen_v1", "1");
    } catch {
      /* localStorage indisponível — sem problema, só afeta a splash */
    }
  });

  const url = `${baseUrl}${route.path}`;
  await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

  // useDocumentHead roda num useEffect — dá uma folga extra além do
  // networkidle0 para garantir que title/meta/JSON-LD já foram aplicados.
  await page.waitForFunction(() => document.title && document.title.length > 0, {
    timeout: 5000,
  });
  await new Promise((r) => setTimeout(r, 200));

  const html = await page.evaluate(() => "<!doctype html>\n" + document.documentElement.outerHTML);
  await page.close();

  const outDir = route.path === "/" ? DIST_DIR : path.join(DIST_DIR, route.path);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "index.html"), html, "utf-8");
  return { path: route.path, bytes: html.length };
}

async function main() {
  const distIndex = path.join(DIST_DIR, "index.html");
  if (!(await fileExists(distIndex))) {
    console.error("dist/index.html não existe — rode `vite build` antes do prerender.");
    process.exit(1);
  }

  const server = await startStaticServer();
  const baseUrl = `http://localhost:${PORT}`;
  const browser = await launchBrowser();

  const results = [];
  for (const route of ROUTES) {
    const result = await prerenderRoute(browser, baseUrl, route);
    results.push(result);
    console.log(`  pré-renderizado: ${result.path} (${result.bytes} bytes)`);
  }

  await browser.close();
  server.close();

  console.log(`\nPré-renderização concluída: ${results.length} rotas.`);
}

main().catch((err) => {
  console.error("Falha na pré-renderização:", err);
  process.exit(1);
});
