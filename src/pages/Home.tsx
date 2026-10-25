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
import { FAQ_HOME } from "@/data/faq-home";
import { useDocumentHead } from "@/lib/useDocumentHead";

const TITLE = "Caetus Systems: site, atendente no WhatsApp e sistema de matrícula";
const DESCRIPTION =
  "Site a partir de R$ 247, atendente no WhatsApp por R$ 87 por mês e sistema de matrícula para escolas. Agende uma demonstração e veja funcionando no seu negócio.";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_HOME.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

/**
 * Página inicial pensada para quem chega de campanha: promessa e botão no topo,
 * preço claro, prova real, como funciona, dúvidas e o formulário no fim.
 */
export default function Home() {
  const intro = useIntroSplash();
  useDocumentHead({
    title: TITLE,
    description: DESCRIPTION,
    canonical: "/",
    og: {
      "og:title": TITLE,
      "og:description": DESCRIPTION,
      "og:url": "/",
      "og:type": "website",
    },
    jsonLd: JSON_LD,
  });

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {intro.show && <IntroSplash onFinish={intro.finish} />}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Pular para o conteúdo
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
