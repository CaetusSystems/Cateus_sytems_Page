import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useT } from "@/i18n";
import { waUrl } from "@/lib/constants";

export function FloatingWhatsApp() {
  const t = useT();
  return (
    <a
      href={waUrl(t.whatsapp.message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.aria}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green text-white shadow-lg shadow-brand-green/30 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
