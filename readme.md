# gustavoo.me

Portfólio pessoal de **Gustavo Oliveira da Silva** — Desenvolvedor Full Stack Sênior (Web, Mobile, Infraestrutura & Automação).

Single-page dark portfolio construído com **React + Vite + TypeScript + Tailwind CSS + GSAP + Framer Motion**. Stack principal exibida no site: Rust · Actix · PostgreSQL · Supabase · React Native.

![Portfólio gustavoo.me](screenshots/image.webp)

## Desenvolvimento

```bash
npm install        # instala as dependências (primeira vez)
npm run dev        # servidor de desenvolvimento em http://localhost:5173
```

## Build estático (gera a pasta dist/)

```bash
npm run build      # type-check (tsc) + bundle de produção em dist/
npm run preview    # serve a dist/ localmente para conferir o build
```

A saída fica em **`dist/`** — HTML, CSS e JS estáticos, prontos para hospedar em
qualquer servidor de arquivos ou CDN (Vercel, Netlify, Cloudflare Pages, Nginx,
etc.). O `vite.config.ts` usa `base: "./"` (caminhos relativos), então a `dist/`
funciona tanto servida na raiz de um domínio quanto em um subdiretório.

## Estrutura

```
public/            # assets servidos como estão (vídeo, favicon, imagens dos projetos)
  projetos/        # imagens em 3 formatos: .avif / .webp / .jpg
src/
  components/      # seções: Hero, Works, Explorations, About, Contact, etc.
  data/projects.ts # dados dos projetos do portfólio
  index.css        # design system (variáveis HSL, animações, utilities)
```
