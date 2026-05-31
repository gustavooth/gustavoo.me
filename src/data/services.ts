// Configuração dos serviços que dirige o wizard (F1 cards + F2 opções).
// Tudo é data-driven: adicionar/remover uma opção é editar este arquivo,
// nunca o JSX dos passos.

export interface ServiceAddon {
  id: string; // chave estável usada no estado + mensagem
  label: string; // texto do chip
  small?: boolean; // renderiza como chip menor/secundário
  defaultOn?: boolean; // pré-selecionado
}

export interface ServiceTextarea {
  id: string; // chave no estado
  label: string; // pergunta acima da textarea
  placeholder: string;
  required?: boolean;
}

export interface Service {
  id: string;
  title: string; // título do card (F1)
  display: string; // palavra em itálico (font-display)
  blurb: string; // descrição de uma linha (F1)
  icon: string; // nome do ícone lucide-react
  secondary?: boolean; // #7 — card menor, "para serviços no geral"
  note?: string; // legenda no card (ex.: "até 6 páginas")
  step2Title: string; // título do F2
  step2Subtitle?: string;
  includedNote?: string; // "Site + app + e-mail já incluídos"
  addons: ServiceAddon[]; // multiseleção (pode ser vazio)
  textareas?: ServiceTextarea[]; // campos livres (opcional)
}

export const SERVICES: Service[] = [
  {
    id: "site",
    title: "Site profissional",
    display: "sob medida",
    blurb: "Landing page, site institucional, portfólio ou página de vendas.",
    icon: "Globe",
    note: "Até 6 páginas",
    step2Title: "O que incluir no seu site?",
    step2Subtitle: "Selecione tudo que faz sentido para o seu projeto.",
    addons: [
      { id: "email", label: "E-mail personalizado" },
      { id: "chatbot", label: "Chatbot WhatsApp com IA" },
      { id: "app", label: "Também quero app (site + aplicativo)" },
      { id: "checkout", label: "Checkout (Stripe / Asaas)" },
    ],
  },
  {
    id: "loja",
    title: "Loja online",
    display: "sob medida",
    blurb: "E-commerce completo, pronto para vender com escala.",
    icon: "ShoppingBag",
    step2Title: "Vamos turbinar sua loja",
    step2Subtitle: "Site, aplicativo e e-mail já vêm inclusos.",
    includedNote: "Site + aplicativo + e-mail personalizado já inclusos",
    addons: [
      { id: "ia", label: "Automação com Inteligência Artificial" },
      { id: "chatbot", label: "Chatbot WhatsApp com IA" },
      { id: "superfrete", label: "Integração SuperFrete (etiquetas)", small: true },
      { id: "asaas", label: "Checkout Asaas", small: true },
    ],
  },
  {
    id: "app",
    title: "Aplicativo",
    display: "mobile",
    blurb: "Aplicativo Android e iOS nativo para o seu negócio.",
    icon: "Smartphone",
    step2Title: "O que incluir no seu aplicativo?",
    step2Subtitle: "Selecione tudo que faz sentido para o seu projeto.",
    addons: [
      { id: "email", label: "E-mail personalizado" },
      { id: "chatbot", label: "Chatbot WhatsApp com IA" },
      { id: "web", label: "Também quero versão para computador/notebook" },
    ],
  },
  {
    id: "ia",
    title: "Automação com IA",
    display: "inteligente",
    blurb: "Processos automáticos com Inteligência Artificial.",
    icon: "Bot",
    step2Title: "Onde a IA vai te ajudar?",
    addons: [],
    textareas: [
      {
        id: "onde",
        label: "Onde você precisa de integração com Inteligência Artificial?",
        placeholder:
          "Ex.: atendimento automático, geração de conteúdo, análise de dados, cobranças...",
        required: true,
      },
    ],
  },
  {
    id: "chatbot",
    title: "Chatbot WhatsApp",
    display: "com IA",
    blurb: "Atendimento automático e inteligente no WhatsApp.",
    icon: "MessageCircle",
    step2Title: "Como seu chatbot vai trabalhar?",
    step2Subtitle: "Selecione as integrações que precisa.",
    addons: [
      { id: "agendamento", label: "Agendamento" },
      { id: "catalogo", label: "Catálogo / cardápio" },
      { id: "crm", label: "Integração com CRM" },
      { id: "pagamentos", label: "Pagamentos no chat" },
    ],
    textareas: [
      {
        id: "caso",
        label: "Descreva o caso de uso do seu chatbot",
        placeholder: "Ex.: atender clientes, qualificar leads, tirar dúvidas...",
      },
    ],
  },
  {
    id: "cursos",
    title: "Plataforma de cursos",
    display: "sob medida",
    blurb: "Área de membros para vender e entregar seus cursos.",
    icon: "GraduationCap",
    step2Title: "O que sua plataforma precisa?",
    step2Subtitle: "Selecione tudo que faz sentido para o seu projeto.",
    addons: [
      { id: "membros", label: "Área de membros" },
      { id: "pagamentos", label: "Pagamentos / assinaturas" },
      { id: "app", label: "Aplicativo do aluno" },
      { id: "certificados", label: "Certificados" },
      { id: "email", label: "E-mail personalizado" },
    ],
    textareas: [
      {
        id: "detalhes",
        label: "Algum detalhe a mais?",
        placeholder: "Conte um pouco sobre o seu conteúdo e público.",
      },
    ],
  },
  {
    id: "freelancer",
    title: "Desenvolvedor freelancer",
    display: "à disposição",
    blurb: "Para serviços em geral — me conte o que você precisa.",
    icon: "Code2",
    secondary: true,
    step2Title: "Conte o que você precisa",
    addons: [],
    textareas: [
      {
        id: "descricao",
        label: "Descreva o que você precisa",
        placeholder:
          "Ex.: manutenção de sistema, integração, consultoria técnica, MVP...",
        required: true,
      },
    ],
  },
];

export const getService = (id: string | null): Service | undefined =>
  SERVICES.find((s) => s.id === id);

// Microcopy de confiança reutilizada no CTA e nos passos.
export const TRUST_POINTS = [
  "Resposta no mesmo dia",
  "Orçamento gratuito",
  "Sem compromisso",
] as const;
