import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { latestPosts } from "@/data/blog";
import { useCampaignMode } from "@/hooks/use-campaign-mode";
import { useLang, useT } from "@/i18n";
import { WHATSAPP_DISPLAY, waUrl } from "@/lib/constants";

export function Footer() {
  const campaign = useCampaignMode();
  const lang = useLang();
  const t = useT();
  // Os artigos só existem em português: nas outras línguas o rodapé não os lista.
  const posts = lang === "pt" ? latestPosts(3) : [];

  // Visita de campanha: rodapé mínimo, sem links que tirem a pessoa da página.
  if (campaign) {
    return (
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Caetus Systems</span>
          <a
            href={waUrl(t.whatsapp.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline"
          >
            {t.footer.questions} {WHATSAPP_DISPLAY}
          </a>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-border">
      {posts.length > 0 && (
        <div className="border-b border-border bg-tint">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-sm font-semibold text-muted-foreground">
                {t.footer.blogHeading}
              </h2>
              <Link
                to="/blog"
                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                {t.footer.seeAll}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  to={post.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
                >
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    width={1200}
                    height={675}
                    loading="lazy"
                    className="aspect-video w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-semibold text-primary">{post.tag}</p>
                    <h3 className="mt-2 text-balance text-base font-semibold leading-snug tracking-tight">
                      {post.title}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors group-hover:text-primary">
                      {t.footer.readArticle}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
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
        <p className="text-xs text-muted-foreground">{t.footer.tagline}</p>
      </div>
    </footer>
  );
}
