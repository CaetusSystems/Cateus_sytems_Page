import { useEffect } from "react";
import { Check } from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { PASSOS_IMPLANTACAO, PRECO_MENSAL, WHATSAPP_POS_COMPRA } from "@/data/matricula-venda";
import { useDocumentHead } from "@/lib/useDocumentHead";
import "./sistema-matricula.css";

const FONTES_URL =
  "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700;6..12,800&display=swap";

/** Para onde a Cakto manda a escola depois de pagar a implantação. */
export default function ObrigadoMatricula() {
  useDocumentHead({
    title: "Implantação confirmada | Caetus Systems",
    description: "Próximos passos da implantação do sistema de matrícula na sua escola.",
    canonical: "/sistema-de-matricula/obrigado",
    robots: "noindex, nofollow",
    lang: "pt",
  });

  useEffect(() => {
    if (document.querySelector(`link[href="${FONTES_URL}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONTES_URL;
    document.head.appendChild(link);
  }, []);

  return (
    <div className="mv min-h-screen antialiased">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--mv-quadro)] text-[var(--mv-lapis)]">
          <Check className="h-7 w-7" strokeWidth={3} aria-hidden="true" />
        </span>
        <h1 className="mv-display mt-6 text-[clamp(2.1rem,5.5vw,3.4rem)] font-extrabold">
          Pagamento recebido. Agora é com a gente.
        </h1>
        <p className="mt-4 max-w-[36rem] text-[1.12rem] leading-relaxed text-[var(--mv-tinta-suave)]">
          Chame a Caetus no WhatsApp para começar a implantação. Tenha em mãos as turmas, os valores, os descontos e o
          contrato que a escola usa hoje.
        </p>
        <a href={WHATSAPP_POS_COMPRA} target="_blank" rel="noopener noreferrer" className="mv-btn mt-8">
          <WhatsAppIcon className="h-5 w-5" />
          Começar a implantação
        </a>

        <div className="mv-folha mt-14 p-6 sm:p-9">
          <h2 className="mv-display text-[1.7rem] font-extrabold">O que acontece agora</h2>
          <ol className="mt-6 space-y-5">
            {PASSOS_IMPLANTACAO.slice(1).map((p, i) => (
              <li key={p.titulo} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3">
                <span className="mv-display mv-num flex h-9 w-9 items-center justify-center rounded-full bg-[var(--mv-lapis)] font-extrabold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-extrabold">{p.titulo}</h3>
                  <p className="mt-0.5 leading-relaxed text-[var(--mv-tinta-suave)]">{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-6 space-y-3 border-t border-dashed border-[#c9d2ca] pt-5 text-[0.98rem] leading-relaxed text-[var(--mv-tinta-suave)]">
            <p>
              <strong className="text-[var(--mv-tinta)]">Prazo: até 15 dias</strong> para o sistema ficar pronto na sua
              escola. Ele precisa ser configurado e instalado numa conta em nome da escola, e para isso você vai criar
              algumas contas (Google, Cloudflare e outras que a gente indicar). Qualquer informação que chegar depois
              do combinado atrasa o prazo.
            </p>
            <p>
              Depois desses 15 dias, com o sistema pronto, você tem mais 7 dias para desistir e receber de volta o valor
              da implantação.
            </p>
            <p>
              A mensalidade de {PRECO_MENSAL} só começa quando o link for para as famílias, e você escolhe o dia do
              pagamento.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
