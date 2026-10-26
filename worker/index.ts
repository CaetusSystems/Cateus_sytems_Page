import { handleLead, type Env } from "./lead";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    // Um só endereço para o Google: o domínio sem www.
    if (url.hostname === "www.caetussystems.com.br") {
      url.hostname = "caetussystems.com.br";
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname === "/api/lead") return handleLead(request, env);
    // Endereço antigo da página do atendente (ficou em buscadores e links).
    if (url.pathname === "/produtos/bot-whatsapp") {
      return new Response(null, {
        status: 301,
        headers: { Location: `/atendente-whatsapp${url.search}` },
      });
    }
    // O envio de arquivos desse formulário usa uma função da Vercel (api/blob-upload.js),
    // então ele continua lá até ser migrado.
    if (url.pathname === "/formulario_criacao_sites") {
      return Response.redirect("https://cateus-sytems-page.vercel.app/formulario_criacao_sites", 302);
    }
    return env.ASSETS.fetch(request);
  },
};
