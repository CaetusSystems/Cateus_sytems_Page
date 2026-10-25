import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { latestPosts } from "@/data/blog";
import { useCampaignMode } from "@/hooks/use-campaign-mode";
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/constants";

export function Footer() {
  const campaign = useCampaignMode();
  const posts = latestPosts(3);

  // Visita de campanha: rodapé mínimo, sem links que tirem a pessoa da página.
  if (campaign) {
    return (
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Caetus Systems</span>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline"
          >
            Dúvidas? WhatsApp {WHATSAPP_DISPLAY}
          </a>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-border">
      {posts.length > 0 && (
        <div className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Do nosso blog
              </h2>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Ver tudo
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  to={post.slug}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {post.tag}
                  </p>
                  <h3 className="mt-2 text-balance text-base font-semibold leading-snug tracking-tight">
                    {post.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors group-hover:text-primary">
                    Ler artigo
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <span className="text-[10px] font-bold">C</span>
          </div>
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Caetus Systems
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Sua operação digital funcionando todos os dias.
        </p>
      </div>
    </footer>
  );
}
