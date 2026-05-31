import { motion } from "framer-motion";
import ServicosCTA from "./ServicosCTA";
import { TRUST_POINTS } from "../data/services";

/** Faixa persuasiva (isca principal) entre seções da home. */
export default function ServicosBand() {
  return (
    <section className="bg-surface py-16 md:py-24 border-y border-stroke">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">
            Serviços
          </span>
          <span className="w-8 h-px bg-stroke" />
        </div>

        <h2 className="text-3xl md:text-5xl tracking-tight text-text-primary leading-[1.1] mb-5">
          Vamos tirar sua ideia do{" "}
          <span className="font-display italic">papel</span>
        </h2>

        <p className="text-sm md:text-base text-muted max-w-xl mx-auto mb-3">
          Monte o seu projeto em menos de 1 minuto e receba um orçamento sem
          compromisso. Mais de{" "}
          <span className="text-text-primary font-medium">100 projetos</span>{" "}
          entregues.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-9">
          {TRUST_POINTS.map((p) => (
            <span
              key={p}
              className="flex items-center gap-2 text-xs text-muted"
            >
              <span className="w-1.5 h-1.5 rounded-full accent-gradient" />
              {p}
            </span>
          ))}
        </div>

        <ServicosCTA variant="band" label="Montar meu projeto" />
      </motion.div>
    </section>
  );
}
