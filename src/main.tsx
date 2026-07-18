import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import "./styles.css";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { NotFound } from "./components/NotFound";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Blog from "./pages/Blog";
import BlogFuturoSeoComIA from "./pages/BlogFuturoSeoComIA";
import Presentation from "./pages/Presentation";
import ProdutoAtendenteVirtual from "./pages/ProdutoAtendenteVirtual";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/produtos/bot-whatsapp" element={<ProdutoAtendenteVirtual />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/futuro-do-seo-com-ia" element={<BlogFuturoSeoComIA />} />
          <Route path="/presentation" element={<Presentation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
