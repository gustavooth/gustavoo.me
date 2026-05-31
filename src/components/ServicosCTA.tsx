import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

type Variant = "nav" | "hero" | "band";

/**
 * Botão-isca reutilizável que leva ao configurador (/servicos).
 * Usa a receita de borda em gradiente do site, mas como <Link> de rota.
 */
export default function ServicosCTA({
  variant = "hero",
  label = "Serviços",
}: {
  variant?: Variant;
  label?: string;
}) {
  if (variant === "nav") {
    return (
      <Link
        to="/servicos"
        className="group relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2"
      >
        <span className="absolute inset-[-2px] rounded-full accent-gradient-animated opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="absolute inset-0 rounded-full bg-surface backdrop-blur-md" />
        <span className="relative z-10 flex items-center gap-1 text-text-primary">
          {label}
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </Link>
    );
  }

  if (variant === "band") {
    return (
      <Link
        to="/servicos"
        className="group relative inline-flex items-center gap-2 rounded-full text-base md:text-lg px-8 py-4 text-text-primary transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 rounded-full border-2 border-stroke transition-colors group-hover:border-transparent" />
        <span className="absolute inset-[-2px] rounded-full accent-gradient-animated opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="absolute inset-[2px] rounded-full bg-bg" />
        <span className="relative z-10 flex items-center gap-2">
          {label}
          <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    );
  }

  // hero (padrão) — botão primário sólido
  return (
    <Link
      to="/servicos"
      className="group relative rounded-full text-sm px-7 py-3.5 bg-text-primary text-bg transition-transform hover:scale-105"
    >
      <span className="absolute inset-[-2px] rounded-full accent-gradient-animated opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="absolute inset-0 rounded-full bg-text-primary transition-colors group-hover:bg-bg" />
      <span className="relative z-10 flex items-center gap-2 transition-colors group-hover:text-text-primary">
        {label}
        <ArrowUpRight className="w-4 h-4" />
      </span>
    </Link>
  );
}
