# gustavoo.me

Portfólio pessoal de **Gustavo Oliveira da Silva** — Desenvolvedor Full Stack (Web, Mobile, Infraestrutura & Automação).

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

## Estrutura

```
public/            # assets servidos como estão (vídeo, favicon, imagens dos projetos)
  projetos/        # imagens em 3 formatos: .avif / .webp / .jpg
src/
  components/      # seções: Hero, Works, Explorations, About, Contact, etc.
  data/projects.ts # dados dos projetos do portfólio
  index.css        # design system (variáveis HSL, animações, utilities)
```
