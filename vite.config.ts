import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "/" => caminhos absolutos. Necessário para o BrowserRouter funcionar
// em rotas profundas (ex.: /servicos) sem quebrar a resolução dos assets.
export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    // Multi-page: gera index.html (home) e servicos.html (SEO próprio da
    // página de serviços). Ambos carregam o mesmo bundle React; o router
    // decide o que renderizar pelo pathname.
    rollupOptions: {
      input: {
        main: "index.html",
        servicos: "servicos.html",
      },
    },
  },
});
