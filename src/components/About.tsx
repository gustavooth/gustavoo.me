import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const PARAS = [
  <>
    Comecei pelos fundamentos: ao aprender a linguagem{" "}
    <strong className="text-text-primary font-medium">C</strong>, construí uma
    base sólida em lógica, algoritmos e gestão de memória — o que tornou natural
    o salto para linguagens de mais alto nível.
  </>,
  <>
    Hoje foco essa base em <strong className="text-text-primary font-medium">performance</strong> e{" "}
    <strong className="text-text-primary font-medium">segurança</strong>: construo back-ends de alta
    concorrência com <strong className="text-text-primary font-medium">Rust</strong> e{" "}
    <strong className="text-text-primary font-medium">Actix</strong>, onde ownership e tipagem forte
    eliminam classes inteiras de bugs em tempo de compilação.
  </>,
  <>
    Na camada de dados e nuvem modelo informações com{" "}
    <strong className="text-text-primary font-medium">PostgreSQL</strong> e{" "}
    <strong className="text-text-primary font-medium">Supabase</strong>; no mobile entrego apps
    multiplataforma com <strong className="text-text-primary font-medium">React Native</strong>.
  </>,
];

const STACK = [
  { label: "Linguagens", items: "Rust, Go, C, Java, Python, TS, SQL" },
  { label: "Frameworks & Mobile", items: "Actix, React, React Native, Next.js" },
  { label: "Dados", items: "PostgreSQL, Supabase, MongoDB" },
  { label: "Infra & Tools", items: "Docker, Linux, Git, Postman" },
];

const STATS = [
  { value: "8+", label: "Anos de experiência" },
  { value: "+100", label: "Projetos entregues" },
  { value: "100%", label: "Foco em performance" },
];

export default function About() {
  return (
    <section id="sobre" aria-label="Sobre" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Sobre"
          title={
            <>
              Engenharia com <span className="font-display italic">propósito</span>
            </>
          }
          subtitle="Desenvolvedor Full Stack — Web, Mobile, Infraestrutura & Automação."
        />

        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          <div className="md:col-span-2 space-y-5 text-base md:text-lg leading-relaxed text-muted">
            {PARAS.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3">
            {STACK.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-surface border border-stroke p-5"
              >
                <p className="text-xs text-muted uppercase tracking-[0.15em] mb-1.5">
                  {s.label}
                </p>
                <p className="text-sm text-text-primary">{s.items}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 md:mt-20 pt-12 border-t border-stroke">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center sm:text-left"
            >
              <div className="text-5xl md:text-6xl font-display text-text-primary mb-2">
                {s.value}
              </div>
              <div className="text-sm text-muted">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
