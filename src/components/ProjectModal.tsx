import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "../data/projects";
import Picture from "./Picture";

interface Props {
  projects: Project[];
  openIndex: number | null;
  onClose: () => void;
}

export default function ProjectModal({ projects, openIndex, onClose }: Props) {
  const project = openIndex !== null ? projects[openIndex] : null;
  const [img, setImg] = useState(0);

  // Reseta a imagem ao trocar de projeto
  useEffect(() => {
    setImg(0);
  }, [openIndex]);

  const next = useCallback(() => {
    if (project) setImg((i) => (i + 1) % project.images.length);
  }, [project]);
  const prev = useCallback(() => {
    if (project) setImg((i) => (i - 1 + project.images.length) % project.images.length);
  }, [project]);

  // Teclado + trava de scroll
  useEffect(() => {
    if (!project) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose, next, prev]);

  // Auto-avanço a cada 5s
  useEffect(() => {
    if (!project || project.images.length < 2) return;
    const id = window.setInterval(next, 5000);
    return () => window.clearInterval(id);
  }, [project, next]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.96, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative w-full max-w-4xl max-h-[88vh] overflow-hidden rounded-3xl bg-surface border border-stroke flex flex-col"
          >
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute top-3 right-3 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-video bg-black shrink-0">
              <Picture
                key={img}
                dir={project.dir}
                image={project.images[img]}
                loading="eager"
                className="block w-full h-full"
                imgClassName="w-full h-full object-contain"
              />
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Próxima"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                    {project.images.map((_, d) => (
                      <span
                        key={d}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          d === img ? "bg-white" : "bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto">
              <p className="text-xs text-muted uppercase tracking-[0.2em] mb-2">
                {project.category}
              </p>
              <h3 className="text-2xl sm:text-3xl text-text-primary mb-3">
                {project.title}{" "}
                <span className="font-display italic text-text-primary/70">
                  {project.display}
                </span>
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-muted mb-5">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-medium text-text-primary/90 bg-bg border border-stroke rounded-full px-3 py-1"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
