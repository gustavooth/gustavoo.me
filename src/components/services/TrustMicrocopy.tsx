import { TRUST_POINTS } from "../../data/services";

/** Linha de microcopy de confiança (reduz fricção perto dos CTAs). */
export default function TrustMicrocopy({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 ${className}`}
    >
      {TRUST_POINTS.map((p) => (
        <span key={p} className="flex items-center gap-2 text-xs text-muted">
          <span className="w-1.5 h-1.5 rounded-full accent-gradient" />
          {p}
        </span>
      ))}
    </div>
  );
}
