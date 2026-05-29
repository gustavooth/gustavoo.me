# syntax=docker/dockerfile:1

# ---------- Estágio 1: build do site estático ----------
FROM node:20-alpine AS build
WORKDIR /app

# Instala dependências primeiro (melhor cache: só reinstala se o lockfile mudar)
COPY package.json package-lock.json ./
RUN npm ci

# Copia o restante do código e gera o build de produção em /app/dist
COPY . .
RUN npm run build

# ---------- Estágio 2: serve os arquivos estáticos via nginx ----------
FROM nginx:1.27-alpine AS runtime

# Configuração do nginx (SPA + cache de assets + compressão)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia apenas o resultado do build do estágio anterior
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Healthcheck: nginx respondendo na porta 80.
# Usa 127.0.0.1 (IPv4 explícito) — "localhost" pode resolver para ::1 (IPv6),
# onde o nginx não escuta, causando "connection refused".
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
