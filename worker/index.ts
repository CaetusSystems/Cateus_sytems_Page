import { handleLead, type Env } from "./lead";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/lead") return handleLead(request, env);
    // Endereço antigo da página do atendente (ficou em buscadores e links).
    if (url.pathname === "/produtos/bot-whatsapp") {
      return new Response(null, {
        status: 301,
        headers: { Location: `/atendente-whatsapp${url.search}` },
      });
    }
    return env.ASSETS.fetch(request);
  },
};
