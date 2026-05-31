import type { Service } from "../../data/services";
import { ICONS } from "./icons";

interface Props {
  service: Service;
  selected: boolean;
  onSelect: () => void;
}

/** Card de serviço (F1). Seleção única; o card 'secondary' é mais discreto. */
export default function ServiceCard({ service, selected, onSelect }: Props) {
  const Icon = ICONS[service.icon] ?? ICONS.Code2;

  if (service.secondary) {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={`group relative col-span-full flex items-center gap-4 rounded-2xl border p-4 text-left transition-colors ${
          selected
            ? "border-transparent"
            : "border-stroke hover:border-white/20"
        }`}
      >
        {selected && (
          <span className="absolute inset-[-1.5px] rounded-2xl accent-gradient-animated -z-10" />
        )}
        <span className="absolute inset-0 rounded-2xl bg-surface -z-10" />
        <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-bg border border-stroke shrink-0">
          <Icon className="w-5 h-5 text-muted" />
        </span>
        <span className="flex-1">
          <span className="block text-sm text-text-primary">
            {service.title}{" "}
            <span className="font-display italic text-muted">
              {service.display}
            </span>
          </span>
          <span className="block text-xs text-muted">{service.blurb}</span>
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative flex flex-col items-start gap-3 rounded-3xl border p-6 text-left transition-all hover:-translate-y-1 ${
        selected ? "border-transparent" : "border-stroke hover:border-white/20"
      }`}
    >
      {selected && (
        <span className="absolute inset-[-1.5px] rounded-3xl accent-gradient-animated -z-10" />
      )}
      <span className="absolute inset-0 rounded-3xl bg-surface -z-10" />

      <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-bg border border-stroke">
        <Icon className="w-6 h-6 text-text-primary" />
      </span>

      <span className="text-lg text-text-primary">
        {service.title}{" "}
        <span className="font-display italic text-muted">
          {service.display}
        </span>
      </span>
      <span className="text-sm text-muted leading-relaxed">
        {service.blurb}
      </span>

      {service.note && (
        <span className="mt-1 text-[11px] text-muted uppercase tracking-[0.15em]">
          {service.note}
        </span>
      )}
    </button>
  );
}
