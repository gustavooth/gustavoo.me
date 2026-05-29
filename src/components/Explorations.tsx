import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "../data/projects";
import Picture from "./Picture";

gsap.registerPlugin(ScrollTrigger);

// Usa os 3 projetos restantes (após os 4 do bento) + suas 2 imagens => 6 itens
const REST = PROJECTS.slice(4);
const ITEMS = REST.flatMap((p) =>
  p.images.map((image) => ({ dir: p.dir, image, title: p.title }))
).slice(0, 6);

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const colARef = useRef<HTMLDivElement>(null);
  const colBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pino do conteúdo central
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      // Parallax nas colunas
      gsap.to(colARef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(colBRef.current, {
        yPercent: -28,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const colA = ITEMS.filter((_, i) => i % 2 === 0);
  const colB = ITEMS.filter((_, i) => i % 2 === 1);
  const rotations = [-3, 2, -2, 3, -1, 2];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[300vh] bg-bg"
    >
      {/* Camada 1: conteúdo pinado */}
      <div
        ref={contentRef}
        className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-none"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">
            Explorações
          </span>
          <span className="w-8 h-px bg-stroke" />
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-tight text-text-primary leading-[1.05]">
          Playground <span className="font-display italic">visual</span>
        </h2>
        <p className="text-sm md:text-base text-muted max-w-sm mt-4">
          Detalhes de interface, render e experiências que nasceram da
          curiosidade de explorar o que a tecnologia permite.
        </p>
      </div>

      {/* Camada 2: colunas parallax */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="max-w-[1400px] mx-auto px-6 h-full">
          <div className="grid grid-cols-2 gap-12 md:gap-40">
            <div ref={colARef} className="flex flex-col gap-16 pt-[30vh]">
              {colA.map((it, i) => (
                <Card key={`a-${i}`} {...it} rotate={rotations[i * 2]} />
              ))}
            </div>
            <div ref={colBRef} className="flex flex-col gap-16 pt-[55vh]">
              {colB.map((it, i) => (
                <Card key={`b-${i}`} {...it} rotate={rotations[i * 2 + 1]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({
  dir,
  image,
  rotate,
}: {
  dir: string;
  image: (typeof ITEMS)[number]["image"];
  title: string;
  rotate: number;
}) {
  return (
    <div
      className="aspect-square w-full max-w-[320px] rounded-2xl overflow-hidden border border-stroke bg-surface"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <Picture
        dir={dir}
        image={image}
        className="block w-full h-full"
        imgClassName="w-full h-full object-cover"
      />
    </div>
  );
}
