import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" => caminhos relativos no build, então o dist/ funciona tanto
// servido na raiz do domínio quanto aberto diretamente via file://
export default defineConfig({
  base: "./",
  plugins: [react()],
});
