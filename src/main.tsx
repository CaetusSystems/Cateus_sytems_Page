import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles.css";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { NotFound } from "./components/NotFound";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogFuturoSeoComIA from "./pages/BlogFuturoSeoComIA";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/futuro-do-seo-com-ia" element={<BlogFuturoSeoComIA />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
