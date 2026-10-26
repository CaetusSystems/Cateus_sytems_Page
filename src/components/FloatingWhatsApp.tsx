import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useLocalePath, useT } from "@/i18n";
import { waUrl } from "@/lib/constants";

/** Esconde a barra enquanto a pessoa digita: o teclado do celular já ocupa metade da tela. */
function useTyping() {
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    const isField = (el: EventTarget | null) =>
      el instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
    const onIn = (e: FocusEvent) => setTyping(isField(e.target));
    const onOut = () => setTyping(false);
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);
  return typing;
}

/**
 * No computador: botão redondo do WhatsApp no canto, com um anel que pulsa.
 * No celular: barra fixa embaixo, na zona do polegar, com "Agendar demonstração"
 * e o WhatsApp lado a lado.
 */
export function FloatingWhatsApp() {
  const t = useT();
  const lp = useLocalePath();
  const typing = useTyping();
  const href = waUrl(t.whatsapp.message);

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.whatsapp.aria}
        className="anim-pulse-wa fixed bottom-6 right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-brand-green text-white shadow-lg shadow-brand-green/30 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-background md:flex"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>

      {/* Espaço para a barra não cobrir o fim da página. */}
      <div aria-hidden="true" className="h-[calc(5.5rem+env(safe-area-inset-bottom))] md:hidden" />
      <div
        className={`fixed inset-x-0 bottom-0 z-50 flex gap-2.5 border-t border-border bg-background/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_-12px_rgba(15,23,42,0.25)] backdrop-blur-md transition-transform duration-200 md:hidden ${
          typing ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <Link
          to={lp("/agendar")}
          className="btn-shine flex h-14 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-brand-blue px-4 text-base font-semibold text-white active:scale-[0.98]"
        >
          <CalendarCheck className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="truncate">{t.nav.cta}</span>
        </Link>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.whatsapp.aria}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-green text-white active:scale-95"
        >
          <WhatsAppIcon className="h-7 w-7" />
        </a>
      </div>
    </>
  );
}
