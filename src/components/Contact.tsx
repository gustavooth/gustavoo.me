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
