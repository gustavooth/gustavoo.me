# gustavoo.me

Portfólio pessoal de **Gustavo Oliveira da Silva** — Desenvolvedor Full Stack (Web, Mobile, Infraestrutura & Automação).

Single-page dark portfolio construído com **React + Vite + TypeScript + Tailwind CSS + GSAP + Framer Motion**. Stack principal exibida no site: Rust · Actix · PostgreSQL · Supabase · React Native.

![Portfólio gustavoo.me](screenshots/image.webp)

## Funcionalidades

- 🎬 **Loading screen** animado (contador 000→100) e **hero** com vídeo de fundo
- 🧩 **Seções**: Hero, Projetos (bento grid + modal), Explorações (galeria parallax com GSAP ScrollTrigger), Sobre, Contato
- 🖼️ **Imagens otimizadas** em 3 formatos via `<picture>` (AVIF → WebP → JPG)
- 🎞️ **Vídeo** de fundo em WebM (VP9) com fallback MP4 (H.264), ~90% menor que o original
- 🔍 **SEO completo**: meta tags, Open Graph/Twitter, JSON-LD (Schema.org), `sitemap.xml`, `robots.txt` e `llms.txt` para crawlers de IA
- 🐳 **Docker**: build e deploy estático com um comando

## Tecnologias

React 18 · Vite 5 · TypeScript · Tailwind CSS 3 · GSAP · Framer Motion · nginx (Docker)

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

## Docker (rodar com um comando)

Não precisa de Node instalado — o build acontece dentro do container.

```bash
docker compose up --build      # builda o site e sobe o nginx
```

Acesse **http://localhost:8080**. Para rodar em segundo plano use `-d`, e para
parar:

```bash
docker compose down
```

Como funciona: o `Dockerfile` é multi-stage — o primeiro estágio (Node) roda
`npm ci` + `npm run build` e gera a `dist/`; o segundo estágio (nginx alpine)
serve apenas os arquivos estáticos, com gzip, cache de assets e fallback de SPA
configurados em `nginx.conf`. A imagem final tem ~86 MB.

> **Deploy em VPS:** a imagem é **construída localmente**, não vem de um
> registry. O `docker-compose.yml` usa `pull_policy: build`, então o Docker
> sempre constrói a partir do `Dockerfile` em vez de tentar baixar a imagem
> (o que causaria `pull access denied`). Copie o **projeto inteiro** para a VPS
> (não só o `docker-compose.yml`) e rode `docker compose up -d --build`.

## Estrutura

```
public/              # assets servidos como estão
  projetos/          # imagens dos projetos em 3 formatos (.avif / .webp / .jpg)
  hero.webm/.mp4     # vídeo de fundo do hero
  favicon.svg        # ícone do site
  og-image.jpg       # imagem de preview para redes sociais
  robots.txt         # regras de indexação (inclui crawlers de IA)
  sitemap.xml        # mapa do site
  llms.txt           # guia para agentes de IA
  site.webmanifest   # manifesto PWA
src/
  components/        # seções: Hero, Works, Explorations, About, Contact, etc.
  data/projects.ts   # dados dos projetos do portfólio
  index.css          # design system (variáveis HSL, animações, utilities)
index.html           # HTML base com meta tags de SEO e JSON-LD
Dockerfile           # build multi-stage (Node → nginx)
docker-compose.yml   # orquestração para "docker compose up"
nginx.conf           # configuração do nginx (gzip, cache, SPA)
```
