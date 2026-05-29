import { useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "../data/projects";
import Picture from "./Picture";
import SectionHeader from "./SectionHeader";
import ProjectModal from "./ProjectModal";

// Bento: spans alternados 7/5/5/7 nos 4 primeiros projetos
const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];
const ASPECTS = ["aspect-[16/10]", "aspect-[16/10]", "aspect-[16/10]", "aspect-[16/10]"];

export default function Works() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const featured = PROJECTS.slice(0, 4);

  return (
    <section id="projetos" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Projetos selecionados"
          title={
            <>
              Trabalhos em <span className="font-display italic">destaque</span>
            </>
          }
          subtitle="Uma seleção de projetos que desenvolvi, do conceito ao lançamento."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {featured.map((p, i) => (
            <motion.button
              key={p.dir}
              type="button"
              onClick={() => setOpenIndex(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className={`group relative ${SPANS[i]} ${ASPECTS[i]} bg-surface border border-stroke rounded-3xl overflow-hidden text-left`}
            >
              <Picture
                dir={p.dir}
                image={p.images[0]}
                className="block w-full h-full"
                imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Halftone */}
              <span
                className="pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #000 1px, transparent 1px)",
                  backgroundSize: "4px 4px",
                }}
              />
              {/* Hover wash */}
              <span className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-opacity duration-300" />

              {/* Categoria sempre visível */}
              <span className="absolute top-5 left-5 z-10 text-xs text-text-primary/70 uppercase tracking-[0.2em] group-hover:opacity-0 transition-opacity">
                {p.category.split(" · ")[0]}
              </span>

              {/* Label hover */}
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="relative inline-flex items-center rounded-full px-5 py-2.5">
                  <span className="absolute inset-[-2px] rounded-full accent-gradient-animated" />
                  <span className="absolute inset-0 rounded-full bg-white" />
                  <span className="relative z-10 text-sm text-black">
                    Ver — <span className="font-display italic">{p.title}</span>
                  </span>
                </span>
              </span>

              {/* Título no rodapé */}
              <span className="absolute bottom-5 left-5 right-5 z-10 flex items-baseline justify-between gap-3 group-hover:opacity-0 transition-opacity">
                <span className="text-xl md:text-2xl text-text-primary">
                  {p.title}{" "}
                  <span className="font-display italic text-text-primary/70">
                    {p.display}
                  </span>
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <ProjectModal
        projects={PROJECTS}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
      />
    </section>
  );
}
