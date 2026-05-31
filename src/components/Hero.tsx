import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ROLES } from "../data/projects";
import ServicosCTA from "./ServicosCTA";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Rotação de cargos a cada 2s
  useEffect(() => {
    const id = window.setInterval(
      () => setRoleIndex((i) => (i + 1) % ROLES.length),
      2000
    );
    return () => window.clearInterval(id);
  }, []);

  // Entrada GSAP.
  // Usa .from() (não .fromTo()) para que o estado FINAL seja o padrão do CSS:
  // se o GSAP não rodar (ex.: aba aberta em segundo plano, onde o
  // requestAnimationFrame fica congelado), o conteúdo permanece visível.
  useEffect(() => {
    const ctx = gsap.context(() => {
      // immediateRender: false => o estado inicial (opacity 0) só é aplicado
      // quando o GSAP realmente "tica". Se o ticker nunca rodar (aba em segundo
      // plano, ambiente sem rAF), o conteúdo fica no estado natural: visível.
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", immediateRender: false },
      });
      tl.from(".name-reveal", { opacity: 0, y: 50, duration: 1.2, delay: 0.1 })
        .from(
          ".blur-in",
          { opacity: 0, filter: "blur(10px)", y: 20, duration: 1, stagger: 0.1 },
          0.3
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      ref={rootRef}
      aria-label="Apresentação"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg"
    >
      {/* Vídeo de fundo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
      >
        <source src="hero.webm" type="video/webm" />
        <source src="hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />
      {/* Vinheta radial: garante contraste do texto central mesmo sobre
          frames claros do vídeo (ou se o vídeo ainda não pintou). */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.55)_0%,_rgba(0,0,0,0.2)_45%,_transparent_75%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <span className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          Portfólio
        </span>
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Gustavo Oliveira
        </h1>
        <p className="blur-in text-lg md:text-xl text-text-primary/90 mb-6">
          Um{" "}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
          >
            {ROLES[roleIndex]}
          </span>{" "}
          que constrói.
        </p>
        <p className="blur-in text-sm md:text-base text-text-primary/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] max-w-md mb-12">
          Crio sites, aplicativos e sistemas sob medida — rápidos, seguros e
          feitos para crescer junto com o seu negócio.
        </p>

        <div className="blur-in inline-flex flex-wrap justify-center gap-4">
          <ServicosCTA variant="hero" label="Montar meu projeto" />
          <a
            href="#projetos"
            onClick={scrollTo("projetos")}
            className="group relative rounded-full text-sm px-7 py-3.5 text-text-primary transition-transform hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full border-2 border-stroke transition-colors group-hover:border-transparent" />
            <span className="absolute inset-[-2px] rounded-full accent-gradient-animated opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="absolute inset-[2px] rounded-full bg-bg" />
            <span className="relative z-10">Ver projetos</span>
          </a>
          <a
            href="https://wa.me/5531995168069?text=Ol%C3%A1%20Gustavo!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar."
            target="_blank"
            rel="noopener"
            className="group relative rounded-full text-sm px-7 py-3.5 text-text-primary transition-transform hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full border-2 border-stroke transition-colors group-hover:border-transparent" />
            <span className="absolute inset-[-2px] rounded-full accent-gradient-animated opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="absolute inset-[2px] rounded-full bg-bg" />
            <span className="relative z-10">Entrar em contato</span>
          </a>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">
          Role
        </span>
        <div className="w-px h-10 bg-stroke overflow-hidden relative">
          <div className="absolute inset-0 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
