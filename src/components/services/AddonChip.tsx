import { Check } from "lucide-react";
import type { ServiceAddon } from "../../data/services";

interface Props {
  addon: ServiceAddon;
  selected: boolean;
  onToggle: () => void;
}

/** Chip de multiseleção (F2). Variante 'small' para opções secundárias. */
export default function AddonChip({ addon, selected, onToggle }: Props) {
  const sizing = addon.small
    ? "text-xs px-3 py-1.5"
    : "text-sm px-4 py-2.5";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`group relative inline-flex items-center gap-2 rounded-full transition-colors ${sizing} ${
        selected ? "text-text-primary" : "text-muted hover:text-text-primary"
      }`}
    >
      {selected && (
        <span className="absolute inset-[-1.5px] rounded-full accent-gradient-animated -z-10" />
      )}
      <span
        className={`absolute inset-0 rounded-full -z-10 ${
          selected ? "bg-bg" : "bg-surface border border-stroke"
        }`}
      />
      <span
        className={`flex items-center justify-center w-4 h-4 rounded-full border transition-colors ${
          selected
            ? "accent-gradient border-transparent"
            : "border-stroke"
        }`}
      >
        {selected && <Check className="w-3 h-3 text-bg" strokeWidth={3} />}
      </span>
      {addon.label}
    </button>
  );
}
