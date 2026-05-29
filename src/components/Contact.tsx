import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/gustavooth" },
  { label: "Itch.io", href: "https://gustavooth.itch.io/" },
  { label: "E-mail", href: "mailto:contato@gustavoo.me" },
];

export default function Contact() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contato"
      aria-label="Contato"
      className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden"
    >
      {/* Vídeo de fundo (invertido) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
      >
        <source src="hero.webm" type="video/webm" />
        <source src="hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />

      <div className="relative z-10">
        {/* Marquee */}
        <div className="overflow-hidden whitespace-nowrap mb-16 md:mb-24">
          <div ref={marqueeRef} className="inline-flex">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="text-5xl md:text-7xl lg:text-8xl font-display italic text-text-primary/90 px-6"
              >
                Construindo o futuro •
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 text-center mb-20 md:mb-28">
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-6">
            Vamos conversar
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <a
              href="mailto:contato@gustavoo.me"
              className="group relative inline-flex items-center gap-2 rounded-full text-2xl md:text-4xl px-8 py-5 text-text-primary"
            >
              <span className="absolute inset-0 rounded-full border-2 border-stroke transition-colors group-hover:border-transparent" />
              <span className="absolute inset-[-2px] rounded-full accent-gradient-animated opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="absolute inset-[2px] rounded-full bg-bg" />
              <span className="relative z-10 flex items-center gap-3">
                contato@gustavoo.me
                <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </a>
            <a
              href="https://wa.me/5531995168069?text=Ol%C3%A1%20Gustavo!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar."
              target="_blank"
              rel="noopener"
              aria-label="Conversar no WhatsApp"
              className="group relative inline-flex items-center justify-center w-16 h-16 md:w-[5.2rem] md:h-[5.2rem] rounded-full text-text-primary shrink-0"
            >
              <span className="absolute inset-0 rounded-full border-2 border-stroke transition-colors group-hover:border-transparent" />
              <span className="absolute inset-[-2px] rounded-full accent-gradient-animated opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="absolute inset-[2px] rounded-full bg-bg" />
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="relative z-10 w-7 h-7 md:w-9 md:h-9 transition-transform group-hover:scale-110"
              >
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-stroke">
          <div className="flex items-center gap-2 text-sm text-muted">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            Disponível para projetos
          </div>

          <div className="flex items-center gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener"
                className="text-sm text-muted hover:text-text-primary transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>

          <p className="text-xs text-muted">© 2026 gustavoo.me</p>
        </div>
      </div>
    </footer>
  );
}
