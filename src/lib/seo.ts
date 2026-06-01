// Sincroniza <title> e <meta description> no client-side. Necessário para a
// navegação SPA (/ <-> /servicos sem reload): o HTML estático de cada rota já
// traz as meta tags corretas para crawlers, e isto mantém o documento correto
// quando o usuário navega dentro do app.

export interface PageSeo {
  title: string;
  description?: string;
}

export function setPageSeo({ title, description }: PageSeo): void {
  if (title) document.title = title;
  if (description) {
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", description);
  }
}

export const HOME_SEO: PageSeo = {
  title: "Gustavo Oliveira | Desenvolvedor Full Stack",
  description:
    "Gustavo Oliveira da Silva — Desenvolvedor Full Stack. Crio sites, aplicativos e sistemas sob medida: rápidos, seguros e feitos para escalar.",
};

export const SERVICOS_SEO: PageSeo = {
  title: "Serviços | Gustavo Oliveira — Sites, Apps, IA e Automação",
  description:
    "Monte o seu projeto sob medida em 1 minuto: sites, lojas, apps, automação com IA e chatbots. Receba um orçamento gratuito no WhatsApp.",
};
