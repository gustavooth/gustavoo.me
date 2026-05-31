import type { Service } from "../data/services";

// Número centralizado (antes duplicado como literal em Hero/Navbar/Contact/FloatingWhatsApp).
export const WHATSAPP_NUMBER = "5531995168069";

/** Monta a URL do WhatsApp com a mensagem codificada. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export interface ServiceMessageInput {
  service: Service;
  addons: Record<string, boolean>;
  texts: Record<string, string>;
  name: string;
  budget: string;
  hurry: boolean;
  hurryDays: string;
}

/**
 * Pura: estado entra, string PT-BR sai. Sem DOM, sem efeitos colaterais.
 * O WhatsApp renderiza *negrito* e quebras de linha.
 */
export function buildServiceMessage({
  service,
  addons,
  texts,
  name,
  budget,
  hurry,
  hurryDays,
}: ServiceMessageInput): string {
  const sections: string[] = [];

  const saudacaoNome = name.trim() ? `Sou ${name.trim()} e ` : "";
  sections.push(
    `Olá Gustavo! ${saudacaoNome}gostaria de um orçamento.`
  );

  sections.push(`*Serviço:* ${service.title}`);

  if (service.includedNote) {
    sections.push(`*Já incluído:* ${service.includedNote}`);
  }

  // Addons selecionados, na ordem da config.
  const selected = service.addons.filter((a) => addons[a.id]);
  if (selected.length > 0) {
    const list = selected.map((a) => `• ${a.label}`).join("\n");
    sections.push(`*Quero incluir:*\n${list}`);
  }

  // Campos de texto preenchidos, na ordem da config.
  for (const ta of service.textareas ?? []) {
    const value = texts[ta.id]?.trim();
    if (value) {
      sections.push(`*${ta.label}:*\n${value}`);
    }
  }

  if (budget.trim()) {
    sections.push(`*Orçamento:* ${budget.trim()}`);
  }

  if (hurry) {
    const dias = hurryDays.trim();
    sections.push(
      dias
        ? `*Prazo:* com pressa — preciso em ${dias} dia(s)`
        : `*Prazo:* estou com pressa`
    );
  }

  sections.push("(Enviado pelo configurador em gustavoo.me)");

  return sections.join("\n\n");
}
