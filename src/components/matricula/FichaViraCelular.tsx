import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Camera, Check, FileSignature, ShieldCheck, UserRound } from "lucide-react";

/**
 * Elemento marcante da página: a ficha de papel da secretaria ao fundo e, na
 * frente, o celular da família fazendo a mesma matrícula. Cada tela do celular
 * marca no papel o campo que ele substituiu. Dados de exemplo (fictícios).
 */

const ETAPAS = ["crianca", "responsavel", "documentos", "contrato", "pronto"] as const;
type Etapa = (typeof ETAPAS)[number];

const TEMPO_ETAPA_MS = 2600;

/** Campo do papel → etapa do celular que o substitui. */
const CAMPOS_PAPEL: { rotulo: string; etapa: Etapa }[] = [
  { rotulo: "Nome da criança", etapa: "crianca" },
  { rotulo: "Data de nascimento", etapa: "crianca" },
  { rotulo: "Responsável e telefone", etapa: "responsavel" },
  { rotulo: "Cópia do RG e CPF", etapa: "documentos" },
  { rotulo: "Comprovante de residência", etapa: "documentos" },
  { rotulo: "Assinatura do contrato", etapa: "contrato" },
];

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-xl border border-[#dbe5de] bg-white px-3 py-2">
      <p className="text-[10px] font-semibold text-[#5b6b62]">{rotulo}</p>
      <p className="text-[13px] font-bold text-[#14201b]">{valor}</p>
    </div>
  );
}

function TelaEtapa({ etapa }: { etapa: Etapa }) {
  if (etapa === "crianca") {
    return (
      <>
        <TituloTela icone={<UserRound className="h-4 w-4" />} texto="Dados da criança" />
        <div className="mt-3 space-y-2">
          <Linha rotulo="Nome completo" valor="Alice Martins" />
          <Linha rotulo="Data de nascimento" valor="12/03/2023" />
          <Linha rotulo="Turma" valor="Maternal Sol · manhã" />
        </div>
      </>
    );
  }
  if (etapa === "responsavel") {
    return (
      <>
        <TituloTela icone={<UserRound className="h-4 w-4" />} texto="Responsável" />
        <div className="mt-3 space-y-2">
          <Linha rotulo="Nome" valor="Ana Martins" />
          <Linha rotulo="CPF" valor="•••.•••.•••-47" />
          <Linha rotulo="WhatsApp" valor="(31) 9 •••• ••12" />
        </div>
      </>
    );
  }
  if (etapa === "documentos") {
    return (
      <>
        <TituloTela icone={<Camera className="h-4 w-4" />} texto="Documentos" />
        <ul className="mt-3 space-y-2">
          {["RG do responsável", "CPF do responsável", "Comprovante de residência"].map((d) => (
            <li
              key={d}
              className="flex items-center justify-between rounded-xl border border-[#dbe5de] bg-white px-3 py-2.5 text-[13px] font-bold"
            >
              {d}
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1f4d3f] text-white">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
            </li>
          ))}
        </ul>
      </>
    );
  }
  if (etapa === "contrato") {
    return (
      <>
        <TituloTela icone={<FileSignature className="h-4 w-4" />} texto="Contrato 2027" />
        <div className="mt-3 rounded-xl border border-[#dbe5de] bg-white p-3">
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded bg-[#e3eae5]" />
            <div className="h-1.5 w-11/12 rounded bg-[#e3eae5]" />
            <div className="h-1.5 w-4/5 rounded bg-[#e3eae5]" />
          </div>
          <p className="mt-2.5 text-[11px] font-bold text-[#1f4d3f]">Desconto de irmãos aplicado</p>
          <svg viewBox="0 0 160 44" className="mt-2 h-10 w-full" aria-hidden="true">
            <motion.path
              d="M6 30 C 18 6, 26 40, 38 22 S 58 8, 64 26 S 84 38, 92 18 S 112 10, 118 28 S 140 30, 154 16"
              fill="none"
              stroke="#2547d0"
              strokeWidth="2.4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            />
          </svg>
          <div className="border-t border-dashed border-[#b8c2b9] pt-1 text-[10px] text-[#5b6b62]">
            Assinatura do responsável
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="flex h-full flex-col items-center justify-center px-2 text-center">
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1f4d3f] text-[#f6c445]"
      >
        <Check className="h-7 w-7" strokeWidth={3} />
      </motion.span>
      <p className="mt-4 text-[17px] font-extrabold leading-tight text-[#14201b]">Matrícula enviada</p>
      <p className="mt-1 text-[12px] leading-snug text-[#4a5a52]">A escola já recebeu a ficha, os documentos e o contrato.</p>
    </div>
  );
}

function TituloTela({ icone, texto }: { icone: React.ReactNode; texto: string }) {
  return (
    <p className="flex items-center gap-2 text-[15px] font-extrabold text-[#14201b]">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e7f0ea] text-[#1f4d3f]">
        {icone}
      </span>
      {texto}
    </p>
  );
}

export function FichaViraCelular() {
  const reduzir = useReducedMotion();
  const [indice, setIndice] = useState(reduzir ? ETAPAS.length - 1 : 0);
  const caixa = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(true);

  // Pausa a animação quando o bloco sai da tela.
  useEffect(() => {
    const el = caixa.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (reduzir) {
      setIndice(ETAPAS.length - 1);
      return;
    }
    if (!visivel) return;
    // Na última tela espera um pouco mais antes de recomeçar.
    const ultimo = indice === ETAPAS.length - 1;
    const id = window.setTimeout(
      () => setIndice((i) => (i + 1) % ETAPAS.length),
      ultimo ? TEMPO_ETAPA_MS * 1.8 : TEMPO_ETAPA_MS,
    );
    return () => window.clearTimeout(id);
  }, [indice, reduzir, visivel]);

  const etapa = ETAPAS[indice];
  const feito = (e: Etapa) => ETAPAS.indexOf(e) < indice || etapa === "pronto";

  return (
    <div
      ref={caixa}
      className="relative mx-auto aspect-[10/11] w-full max-w-[520px]"
      role="img"
      aria-label="Ficha de matrícula de papel ao fundo e, na frente, o celular da família fazendo a mesma matrícula: dados da criança, responsável, documentos, contrato assinado e matrícula enviada."
    >
      {/* Ficha de papel */}
      <div className="mv-folha absolute left-0 top-[4%] w-[66%] -rotate-[5deg] p-[5%] sm:p-6">
        <div className="flex items-start justify-between gap-2 border-b-2 border-[#14201b] pb-2">
          <p className="mv-display text-[clamp(15px,3.6vw,21px)] font-extrabold">Ficha de matrícula</p>
          <p className="mv-num pt-1 text-[clamp(10px,2.2vw,12px)] font-bold text-[#4a5a52]">2027</p>
        </div>
        <ul className="mt-3 space-y-[clamp(8px,2.2vw,14px)] text-[clamp(11px,2.6vw,14px)]">
          {CAMPOS_PAPEL.map((c) => (
            <li key={c.rotulo} className="mv-campo flex items-end justify-between gap-2">
              <span className="mv-risco font-semibold" data-on={feito(c.etapa)}>
                {c.rotulo}
              </span>
              <span className="h-3 flex-1" aria-hidden="true" />
            </li>
          ))}
        </ul>
        <AnimatePresence>
          {etapa === "pronto" && (
            <motion.div
              key="carimbo"
              initial={{ opacity: 0, scale: 1.6, rotate: -2 }}
              animate={{ opacity: 0.92, scale: 1, rotate: -12 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: reduzir ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mv-carimbo absolute left-[10%] top-[44%] bg-white/70 px-2.5 py-1 text-[clamp(12px,2.8vw,17px)]"
            >
              Feito no celular
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Celular da família */}
      <div className="mv-celular absolute bottom-0 right-[2%] w-[50%] min-w-[188px] max-w-[260px]">
        <div className="mv-tela flex aspect-[9/17.5] flex-col">
          <div className="flex items-center gap-2 bg-[#1f4d3f] px-3 py-2.5 text-white">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#f6c445] text-[9px] font-black text-[#14201b]">
              ESC
            </span>
            <span className="text-[11px] font-bold leading-tight">Matrícula 2027</span>
            <ShieldCheck className="ml-auto h-3.5 w-3.5 opacity-80" aria-hidden="true" />
          </div>
          <div className="flex gap-1 px-3 pt-3" aria-hidden="true">
            {ETAPAS.slice(0, 4).map((e, i) => (
              <span
                key={e}
                className="h-1 flex-1 rounded-full transition-colors duration-500"
                style={{ background: i <= indice ? "#1f4d3f" : "#d7e1da" }}
              />
            ))}
          </div>
          <div className="relative flex-1 px-3 pb-3 pt-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={etapa}
                initial={reduzir ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(3px)", transition: { duration: 0.2 } }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <TelaEtapa etapa={etapa} />
              </motion.div>
            </AnimatePresence>
          </div>
          {etapa !== "pronto" && (
            <div className="px-3 pb-3">
              <div className="flex h-9 items-center justify-center rounded-full bg-[#1f4d3f] text-[12px] font-bold text-white">
                Continuar
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
