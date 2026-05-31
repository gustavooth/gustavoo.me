import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";
import Servicos from "./pages/Servicos";

export default function App() {
  // O loader é a intro da home. Num deep-link direto para /servicos
  // (ex.: anúncio), pular o loader reduz fricção e melhora a conversão.
  const [isLoading, setIsLoading] = useState(
    () => !window.location.pathname.startsWith("/servicos")
  );

  return (
    <BrowserRouter>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
