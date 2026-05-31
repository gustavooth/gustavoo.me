import { SERVICES } from "../../data/services";
import ServiceCard from "./ServiceCard";
import TrustMicrocopy from "./TrustMicrocopy";

interface Props {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

/** Passo 1 — seleção do serviço principal (seleção única, auto-avança). */
export default function StepService({ selectedId, onSelect }: Props) {
  const featured = SERVICES.filter((s) => !s.secondary);
  const secondary = SERVICES.filter((s) => s.secondary);

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl tracking-tight text-text-primary mb-3">
          O que você quer{" "}
          <span className="font-display italic">construir</span>?
        </h1>
        <p className="text-sm text-muted">
          Escolha um serviço para começar — leva menos de 1 minuto.
        </p>
        <TrustMicrocopy className="mt-5" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {featured.map((s) => (
          <ServiceCard
            key={s.id}
            service={s}
            selected={selectedId === s.id}
            onSelect={() => onSelect(s.id)}
          />
        ))}
        {secondary.map((s) => (
          <ServiceCard
            key={s.id}
            service={s}
            selected={selectedId === s.id}
            onSelect={() => onSelect(s.id)}
          />
        ))}
      </div>
    </div>
  );
}
