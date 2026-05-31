const STEPS = ["Serviço", "Detalhes", "Contato"];

/** Barra de progresso de 3 passos (accent-gradient). Visível por padrão. */
export default function WizardProgress({ step }: { step: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted uppercase tracking-[0.3em]">
          Passo {step} de {STEPS.length}
        </span>
        <span className="text-xs text-text-primary">{STEPS[step - 1]}</span>
      </div>
      <div className="flex gap-2">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full bg-stroke overflow-hidden"
          >
            <div
              className="h-full accent-gradient transition-all duration-500"
              style={{ width: i < step ? "100%" : "0%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
