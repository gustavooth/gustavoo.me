import { Link } from "react-router-dom";
import { ArrowRight, LayoutGrid } from "lucide-react";

type Variant = "nav" | "hero" | "band";

/**
 * Botão-isca que leva ao configurador (/servicos). Parece um link passivo
 * para "ver os serviços", mas leva o visitante a descrever o que precisa.
 *
 * Visual chamativo (borda em gradiente sempre visível + glow pulsante) para
 * atrair o clique. O estado base é visível mesmo sem animação (seguro em
 * abas de segundo plano).
 */
export default function ServicosCTA({
  variant = "hero",
  label = "Conheça meus serviços",
}: {
  variant?: Variant;
  label?: string;
}) {
  // Navbar — discreto, mas com gradiente sutil sempre presente.
  if (variant === "nav") {
    return (
      <Link
        to="/servicos"
        className="group relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2"
      >
        <span className="absolute inset-0 rounded-full accent-gradient opacity-60 transition-opacity group-hover:opacity-100" />
        <span className="absolute inset-[1.5px] rounded-full bg-bg" />
        <span className="relative z-10 flex items-center gap-1.5 text-text-primary font-medium">
          {label}
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    );
  }

  // Band — grande e protagonista.
  if (variant === "band") {
    return (
      <Link
        to="/servicos"
        className="group relative inline-flex items-center text-base md:text-lg rounded-full px-8 py-4 transition-transform hover:scale-[1.04]"
      >
        {/* Glow pulsante */}
        <span className="absolute -inset-1.5 rounded-full accent-gradient blur-lg pulse-glow group-hover:opacity-80" />
        {/* Borda em gradiente animado (sempre visível) */}
        <span className="absolute inset-0 rounded-full accent-gradient-animated" />
        <span className="absolute inset-[2px] rounded-full bg-bg" />
        <span className="relative z-10 flex items-center gap-2.5 text-text-primary font-medium">
          <LayoutGrid className="w-5 h-5" />
          {label}
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    );
  }

  // Hero (padrão) — destacado, é a isca principal acima da dobra.
  return (
    <Link
      to="/servicos"
      className="group relative inline-flex items-center rounded-full text-sm px-7 py-3.5 transition-transform hover:scale-105"
    >
      {/* Glow pulsante atrás do botão */}
      <span className="absolute -inset-1 rounded-full accent-gradient blur-md pulse-glow group-hover:opacity-80" />
      {/* Borda em gradiente animado (sempre visível, chama o olho) */}
      <span className="absolute inset-0 rounded-full accent-gradient-animated" />
      <span className="absolute inset-[2px] rounded-full bg-bg" />
      <span className="relative z-10 flex items-center gap-2 text-text-primary font-medium">
        <LayoutGrid className="w-4 h-4" />
        {label}
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
