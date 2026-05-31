import { Check } from "lucide-react";
import type { Service } from "../../data/services";
import AddonChip from "./AddonChip";

interface Props {
  service: Service;
  addons: Record<string, boolean>;
  texts: Record<string, string>;
  onToggleAddon: (id: string) => void;
  onSetText: (id: string, value: string) => void;
}

/** Passo 2 — opções do serviço (multiseleção + textareas), tudo via config. */
export default function StepConfig({
  service,
  addons,
  texts,
  onToggleAddon,
  onSetText,
}: Props) {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl tracking-tight text-text-primary mb-3">
          {service.step2Title}
        </h1>
        {service.step2Subtitle && (
          <p className="text-sm text-muted">{service.step2Subtitle}</p>
        )}
      </div>

      {service.includedNote && (
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-surface border border-stroke px-4 py-2 text-xs text-text-primary">
            <span className="flex items-center justify-center w-4 h-4 rounded-full accent-gradient">
              <Check className="w-3 h-3 text-bg" strokeWidth={3} />
            </span>
            {service.includedNote}
          </span>
        </div>
      )}

      {service.addons.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2.5 md:gap-3 mb-8">
          {service.addons.map((a) => (
            <AddonChip
              key={a.id}
              addon={a}
              selected={!!addons[a.id]}
              onToggle={() => onToggleAddon(a.id)}
            />
          ))}
        </div>
      )}

      {(service.textareas ?? []).map((ta) => (
        <div key={ta.id} className="mb-5 text-left">
          <label
            htmlFor={`ta-${ta.id}`}
            className="block text-sm text-text-primary mb-2"
          >
            {ta.label}
            {ta.required && <span className="text-muted"> *</span>}
          </label>
          <textarea
            id={`ta-${ta.id}`}
            rows={4}
            value={texts[ta.id] ?? ""}
            onChange={(e) => onSetText(ta.id, e.target.value)}
            placeholder={ta.placeholder}
            className="w-full rounded-2xl bg-surface border border-stroke p-4 text-sm text-text-primary placeholder:text-muted outline-none focus:border-white/30 transition-colors resize-none"
          />
        </div>
      ))}
    </div>
  );
}
