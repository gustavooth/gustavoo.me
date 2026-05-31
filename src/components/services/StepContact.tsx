import { Check } from "lucide-react";
import type { Service } from "../../data/services";
import TrustMicrocopy from "./TrustMicrocopy";

interface Props {
  service: Service;
  addons: Record<string, boolean>;
  texts: Record<string, string>;
  name: string;
  budget: string;
  hurry: boolean;
  hurryDays: string;
  onSetName: (value: string) => void;
  onSetBudget: (value: string) => void;
  onToggleHurry: () => void;
  onSetHurryDays: (value: string) => void;
}

/** Passo 3 — nome, orçamento, urgência + resumo do que será enviado. */
export default function StepContact({
  service,
  addons,
  texts,
  name,
  budget,
  hurry,
  hurryDays,
  onSetName,
  onSetBudget,
  onToggleHurry,
  onSetHurryDays,
}: Props) {
  const selectedAddons = service.addons.filter((a) => addons[a.id]);
  const filledTexts = (service.textareas ?? []).filter((ta) =>
    texts[ta.id]?.trim()
  );

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl tracking-tight text-text-primary mb-3">
          Quase lá! Como posso te{" "}
          <span className="font-display italic">chamar</span>?
        </h1>
        <p className="text-sm text-muted">
          Confira seu projeto e envie — respondo no mesmo dia.
        </p>
      </div>

      {/* Resumo */}
      <div className="rounded-2xl bg-surface border border-stroke p-5 mb-6 text-left">
        <p className="text-xs text-muted uppercase tracking-[0.2em] mb-3">
          Seu projeto
        </p>
        <p className="text-base text-text-primary mb-3">
          {service.title}{" "}
          <span className="font-display italic text-muted">
            {service.display}
          </span>
        </p>

        {service.includedNote && (
          <p className="flex items-start gap-2 text-sm text-muted mb-2">
            <Check className="w-4 h-4 mt-0.5 shrink-0 text-text-primary" />
            {service.includedNote}
          </p>
        )}

        {selectedAddons.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedAddons.map((a) => (
              <span
                key={a.id}
                className="text-xs text-text-primary bg-bg border border-stroke rounded-full px-3 py-1"
              >
                {a.label}
              </span>
            ))}
          </div>
        )}

        {filledTexts.map((ta) => (
          <p key={ta.id} className="text-sm text-muted mt-2">
            <span className="text-text-primary">{ta.label}:</span>{" "}
            {texts[ta.id]}
          </p>
        ))}
      </div>

      {/* Nome */}
      <div className="text-left">
        <label htmlFor="lead-name" className="block text-sm text-text-primary mb-2">
          Seu nome <span className="text-muted">*</span>
        </label>
        <input
          id="lead-name"
          type="text"
          value={name}
          onChange={(e) => onSetName(e.target.value)}
          placeholder="Como você se chama?"
          className="w-full rounded-2xl bg-surface border border-stroke p-4 text-sm text-text-primary placeholder:text-muted outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* Orçamento (opcional) */}
      <div className="text-left mt-5">
        <label
          htmlFor="lead-budget"
          className="block text-sm text-text-primary mb-2"
        >
          Orçamento previsto{" "}
          <span className="text-muted">(opcional)</span>
        </label>
        <input
          id="lead-budget"
          type="text"
          inputMode="numeric"
          value={budget}
          onChange={(e) => onSetBudget(e.target.value)}
          placeholder="Ex.: R$ 3.000 — me ajuda a montar a melhor proposta"
          className="w-full rounded-2xl bg-surface border border-stroke p-4 text-sm text-text-primary placeholder:text-muted outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* Urgência */}
      <div className="text-left mt-5">
        <button
          type="button"
          onClick={onToggleHurry}
          aria-pressed={hurry}
          className="flex items-center gap-3 w-full text-left"
        >
          <span
            className={`flex items-center justify-center w-5 h-5 rounded-md border shrink-0 transition-colors ${
              hurry ? "accent-gradient border-transparent" : "border-stroke"
            }`}
          >
            {hurry && <Check className="w-3.5 h-3.5 text-bg" strokeWidth={3} />}
          </span>
          <span className="text-sm text-text-primary">
            Estou com pressa
            <span className="text-muted">
              {" "}
              — preciso para ontem ⚡
            </span>
          </span>
        </button>

        {hurry && (
          <div className="mt-3 pl-8">
            <label
              htmlFor="lead-days"
              className="block text-xs text-muted mb-2"
            >
              Em quantos dias você precisa?
            </label>
            <div className="flex items-center gap-2">
              <input
                id="lead-days"
                type="number"
                min={1}
                value={hurryDays}
                onChange={(e) => onSetHurryDays(e.target.value)}
                placeholder="Ex.: 7"
                className="w-28 rounded-2xl bg-surface border border-stroke p-3 text-sm text-text-primary placeholder:text-muted outline-none focus:border-white/30 transition-colors"
              />
              <span className="text-sm text-muted">dias</span>
            </div>
          </div>
        )}
      </div>

      <TrustMicrocopy className="mt-6" />
    </div>
  );
}
