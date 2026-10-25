import { PRODUCT_LABELS, leadSchema, type LeadInput } from "../src/lib/lead-schema";

export type Env = {
  ASSETS: { fetch(request: Request): Promise<Response> };
  /** secret: chave do Resend criada para o site */
  RESEND_API_KEY: string;
  /** secret: e-mail que recebe os contatos */
  LEAD_TO: string;
  /** var opcional: remetente verificado no Resend */
  LEAD_FROM?: string;
};

const DEFAULT_FROM = "Site Caetus <onboarding@resend.dev>";

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export function buildLeadEmail(lead: LeadInput) {
  const product = PRODUCT_LABELS[lead.product];
  const rows: [string, string][] = [
    ["Produto", product],
    ["Negócio", lead.business],
    ["Nome", lead.name],
    ["WhatsApp", `${lead.phone} (https://wa.me/${lead.phone})`],
  ];
  if (lead.email) rows.push(["E-mail", lead.email]);
  if (lead.link) rows.push(["Instagram ou Google", lead.link]);
  for (const [key, value] of Object.entries(lead.attribution ?? {})) {
    if (value) rows.push([key, value]);
  }

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table style="font-family:Arial,sans-serif;font-size:15px">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#555"><b>${escapeHtml(k)}</b></td><td>${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>`;

  return { subject: `Novo lead: ${product} - ${lead.business}`, text, html };
}

export async function handleLead(
  request: Request,
  env: Env,
  fetchImpl: typeof fetch = fetch,
): Promise<Response> {
  if (request.method !== "POST") return json(405, { ok: false });

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json(400, { ok: false, errors: { _: "Pedido inválido" } });
  }

  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) errors[String(issue.path[0] ?? "_")] ??= issue.message;
    return json(400, { ok: false, errors });
  }
  const lead = parsed.data;

  // Robôs preenchem o campo escondido: responde ok e não envia nada.
  if (lead.website) return json(200, { ok: true });

  if (!env.RESEND_API_KEY || !env.LEAD_TO) return json(500, { ok: false });

  const { subject, text, html } = buildLeadEmail(lead);
  try {
    const res = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.LEAD_FROM || DEFAULT_FROM,
        to: [env.LEAD_TO],
        ...(lead.email ? { reply_to: lead.email } : {}),
        subject,
        text,
        html,
      }),
    });
    if (!res.ok) return json(502, { ok: false });
  } catch {
    return json(502, { ok: false });
  }
  return json(200, { ok: true });
}
