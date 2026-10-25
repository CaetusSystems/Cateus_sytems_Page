import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import "./styles.css";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { NotFound } from "./components/NotFound";
import { ScrollToTop } from "./components/ScrollToTop";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Blog from "./pages/Blog";
import BlogFuturoSeoComIA from "./pages/BlogFuturoSeoComIA";
import BlogInstagramNaoEGoogle from "./pages/BlogInstagramNaoEGoogle";
import BlogPerfilGoogleNaoSubstituiSite from "./pages/BlogPerfilGoogleNaoSubstituiSite";
import BlogSiteNaoConverte from "./pages/BlogSiteNaoConverte";
import BlogChatbotWhatsAppAtendimentoHumano from "./pages/BlogChatbotWhatsAppAtendimentoHumano";
import BlogIaWhatsAppBusiness2026 from "./pages/BlogIaWhatsAppBusiness2026";
import Presentation from "./pages/Presentation";
import ProdutoAtendenteVirtual from "./pages/ProdutoAtendenteVirtual";
import Templates from "./pages/Templates";
import FormularioCriacaoSite from "./pages/FormularioCriacaoSite";
import Agendar from "./pages/Agendar";
import Obrigado from "./pages/Obrigado";
import { captureAttribution } from "./lib/attribution";
import { initPixel } from "./lib/pixel";

captureAttribution(window.location.search, window.location.pathname);
initPixel(import.meta.env.VITE_META_PIXEL_ID);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/produtos/bot-whatsapp" element={<ProdutoAtendenteVirtual />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/futuro-do-seo-com-ia" element={<BlogFuturoSeoComIA />} />
          <Route
            path="/blog/aparece-no-instagram-mas-nao-no-google"
            element={<BlogInstagramNaoEGoogle />}
          />
          <Route path="/blog/perfil-google-nao-substitui-site" element={<BlogPerfilGoogleNaoSubstituiSite />} />
          <Route path="/blog/site-nao-converte-em-contato" element={<BlogSiteNaoConverte />} />
          <Route
            path="/blog/chatbot-para-whatsapp-atendimento-humano"
            element={<BlogChatbotWhatsAppAtendimentoHumano />}
          />
          <Route path="/blog/ia-whatsapp-business-2026" element={<BlogIaWhatsAppBusiness2026 />} />
          <Route path="/agendar" element={<Agendar />} />
          <Route path="/obrigado" element={<Obrigado />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/formulario_criacao_sites" element={<FormularioCriacaoSite />} />
          <Route path="/presentation" element={<Presentation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
