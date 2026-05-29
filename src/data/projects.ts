// Projetos reais do portfólio. Cada imagem tem 3 formatos (avif/webp/jpg)
// em /projetos/<dir>/<file>.<ext>, servidos via <Picture/>.

export interface ProjectImage {
  file: string;
  w: number;
  h: number;
  alt: string;
}

export interface Project {
  dir: string;
  title: string;
  /** palavra em itálico (font-display) destacada no título do card */
  display: string;
  category: string;
  stack: string[];
  desc: string;
  images: ProjectImage[];
}

export const PROJECTS: Project[] = [
  {
    dir: "aurelia-mmorpg",
    title: "Aurelia Online",
    display: "MMORPG",
    category: "Games · Multiplayer em Tempo Real",
    stack: ["Unity", "C#", "Sockets UDP", "Servidor Autoritário", "IAP"],
    desc: "Jogo multiplayer 3D em tempo real na Unity com C#. O coração do projeto é a infraestrutura de rede: sockets UDP com servidor autoritário, garantindo sincronização fluida entre jogadores e prevenção de fraudes — somado a um sistema de monetização in-game (IAP) sólido e seguro.",
    images: [
      { file: "aurelia-mmorpg-notebook", w: 1600, h: 900, alt: "Notebook exibindo o MMORPG Aurelia Online com cidade medieval 3D e interface de mercado" },
      { file: "aurelia-mmorpg-gameplay", w: 1600, h: 900, alt: "Cena de gameplay do MMORPG Aurelia Online com personagem explorando a capital do reino" },
    ],
  },
  {
    dir: "lumenix-engine",
    title: "Lumenix Engine",
    display: "render",
    category: "Software Desktop · Arquitetura Low-Level",
    stack: ["C++", "Vulkan", "CMake", "Dear ImGui"],
    desc: "Engine de renderização desktop de altíssima performance para visualização de cenas complexas, onde engines comerciais traziam overhead indesejado. Escrita em C++ sobre a Vulkan API, com editor visual em Dear ImGui: pipeline PBR, viewport 3D em tempo real e materiais editáveis, extraindo o máximo do hardware.",
    images: [
      { file: "lumenix-engine-viewport-3d", w: 1254, h: 1254, alt: "Engine Lumenix renderizando uma casa moderna em viewport 3D com editor de materiais" },
      { file: "lumenix-engine-interface", w: 1254, h: 1254, alt: "Interface da engine Lumenix com node graph, painéis de propriedades e biblioteca de assets" },
    ],
  },
  {
    dir: "aurabet-igaming",
    title: "AuraBet",
    display: "iGaming",
    category: "iGaming · Alta Disponibilidade · Tempo Real",
    stack: ["Rust", "Svelte 4", "WebSockets", "PostgreSQL", "Docker"],
    desc: "Plataforma de iGaming projetada para suportar picos massivos de tráfego durante grandes eventos esportivos. O núcleo de alta frequência roda em Rust, com odds em tempo real via WebSockets e front-end reativo em Svelte 4 — orquestrado em Docker sobre Linux, priorizando disponibilidade e segurança.",
    images: [
      { file: "aurabet-painel-apostas", w: 1536, h: 1024, alt: "Painel da plataforma AuraBet com partida ao vivo, odds e versão mobile do app de apostas" },
      { file: "aurabet-estatisticas-tempo-real", w: 1536, h: 1024, alt: "Dashboard da AuraBet exibindo estatísticas e gráficos de apostas em tempo real" },
    ],
  },
  {
    dir: "visionforge-app",
    title: "VisionForge",
    display: "IA",
    category: "Mobile · IA Generativa · Gráficos Low-Level",
    stack: ["React Native", "C++", "Vulkan", "IA Generativa"],
    desc: "App mobile que leva o poder da IA generativa de vídeo para a palma da mão dos criadores. Combina interface ágil em React Native com um núcleo gráfico em C++ e Vulkan para renderização local de alta performance, integrado a APIs de IA generativa (motion control) para transformar ideias em vídeos.",
    images: [
      { file: "visionforge-editor-video-ia", w: 1254, h: 1254, alt: "App VisionForge com editor de vídeo por IA e linha do tempo em telas de celular" },
      { file: "visionforge-projetos", w: 1254, h: 1254, alt: "Telas do app VisionForge mostrando lista de projetos de vídeo e ferramentas de IA" },
    ],
  },
  {
    dir: "papel-e-cor-ecommerce",
    title: "Papel & Cor",
    display: "e-commerce",
    category: "Mobile · E-commerce",
    stack: ["React Native", "Node.js", "PostgreSQL", "Stripe", "Mercado Pago"],
    desc: "Aplicativo mobile de e-commerce com experiência premium. Interface fluida em React Native sobre back-end Node.js e PostgreSQL, com checkout sem fricções integrado a Stripe e Mercado Pago — levando as vendas do varejista ao próximo nível com uma jornada de compra simples e confiável.",
    images: [
      { file: "papel-e-cor-app-multiplataforma", w: 1254, h: 1254, alt: "App de e-commerce Papel & Cor exibido em notebook, celular e tablet com vitrine de produtos" },
      { file: "papel-e-cor-catalogo-produtos", w: 1254, h: 1254, alt: "Telas do app Papel & Cor mostrando catálogo de produtos e categorias de papelaria" },
    ],
  },
  {
    dir: "lumina-hub",
    title: "Lumina Hub",
    display: "web",
    category: "Web Corporativa · Core Web Vitals · Edge",
    stack: ["Svelte 4 SSR", "TailwindCSS", "Cloudflare", "Google Tag Manager"],
    desc: "Plataforma institucional de alta performance para uma grande corporação dominar seu setor no digital. Experiência visual imersiva renderizada via SSR em Svelte 4 e servida na edge da Cloudflare, alcançando nota máxima em Core Web Vitals e SEO técnico sem abrir mão do impacto visual.",
    images: [
      { file: "lumina-hub-multiplataforma", w: 1024, h: 1536, alt: "Site corporativo Lumina Hub exibido em notebook, tablet e celular com métricas de conversão" },
      { file: "lumina-hub-recursos-conversao", w: 1254, h: 1254, alt: "Página do Lumina Hub destacando recursos institucionais e indicadores de performance" },
    ],
  },
  {
    dir: "clinica-medica",
    title: "Clínica Médica",
    display: "automação",
    category: "WordPress · Landing Pages · Automação",
    stack: ["WordPress", "Plugin PHP", "n8n", "APIs REST", "Meta Ads"],
    desc: "Ecossistema digital completo para uma clínica médica especializada elevar a captação de pacientes. Plugin WordPress customizado e landing pages de alta conversão, integrados a um fluxo de automação em n8n que substituiu o agendamento manual por um processo automático — da campanha no Meta Ads à confirmação da consulta.",
    images: [
      { file: "clinica-medica-site-agendamento", w: 863, h: 957, alt: "Site institucional da clínica médica com seção de agendamento online e painel de métricas" },
      { file: "clinica-medica-automacao-resultados", w: 863, h: 860, alt: "Página de resultados da clínica destacando ganhos de eficiência e crescimento de pacientes" },
    ],
  },
];

export const ROLES = ["Full Stack", "Rustacean", "Mobile Dev", "Builder"];
