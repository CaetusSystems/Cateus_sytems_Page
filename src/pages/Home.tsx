import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { HeroHome } from "@/components/home/HeroHome";
import { ProductCards } from "@/components/home/ProductCards";
import { ReviewsSpotlight } from "@/components/home/ReviewsSpotlight";
import { DeliveredSites } from "@/components/home/DeliveredSites";
import { IntroSplash, useIntroSplash } from "@/components/IntroSplash";
import { HowItWorksSimple } from "@/components/home/HowItWorksSimple";
import { FaqHome } from "@/components/home/FaqHome";
import { FinalCtaForm } from "@/components/home/FinalCtaForm";
import { useLang, useLocalePath, useT } from "@/i18n";
import { useDocumentHead } from "@/lib/useDocumentHead";


/**
 * Página inicial pensada para quem chega de campanha: promessa e botão no topo,
 * preço claro, prova real, como funciona, dúvidas e o formulário no fim.
 */
export default function Home() {
  const intro = useIntroSplash();
  const t = useT();
  const lang = useLang();
  const lp = useLocalePath();
  useDocumentHead({
    title: t.homeHead.title,
    description: t.homeHead.description,
    canonical: lp("/"),
    og: {
      "og:title": t.homeHead.title,
      "og:description": t.homeHead.description,
      "og:url": lp("/"),
      "og:type": "website",
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    lang,
    alternatesOf: "/",
  });

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {intro.show && <IntroSplash onFinish={intro.finish} />}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        {t.skipToContent}
      </a>
      <Nav />
      <main id="conteudo">
        <HeroHome />
        <ReviewsSpotlight />
        <ProductCards />
        <DeliveredSites />
        <HowItWorksSimple />
        <FaqHome />
        <FinalCtaForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
