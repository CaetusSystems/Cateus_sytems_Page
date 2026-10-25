import { handleLead, type Env } from "./lead";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/lead") return handleLead(request, env);
    return env.ASSETS.fetch(request);
  },
};
