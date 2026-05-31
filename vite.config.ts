import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "/" => caminhos absolutos. Necessário para o BrowserRouter funcionar
// em rotas profundas (ex.: /servicos) sem quebrar a resolução dos assets.
export default defineConfig({
  base: "/",
  plugins: [react()],
});
