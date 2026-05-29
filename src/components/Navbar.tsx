import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Início", id: "inicio" },
  { label: "Projetos", id: "projetos" },
  { label: "Sobre", id: "sobre" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = [...LINKS.map((l) => l.id), "contato"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-xl border border-white/10 bg-surface/60 px-2 py-2 transition-shadow ${
          scrolled ? "shadow-lg shadow-black/20" : ""
        }`}
      >
        {/* Logo */}
        <a
          href="#inicio"
          onClick={go("inicio")}
          className="group relative w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-110"
          aria-label="Início"
        >
          <span className="absolute inset-0 rounded-full accent-gradient" />
          <span className="absolute inset-[2px] rounded-full bg-bg flex items-center justify-center overflow-hidden">
            <img
              src="favicon.svg"
              alt="Gustavo Oliveira"
              className="w-full h-full object-cover"
            />
          </span>
        </a>

        <span className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* Links */}
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={go(l.id)}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors ${
              active === l.id
                ? "text-text-primary bg-stroke/50"
                : "text-muted hover:text-text-primary hover:bg-stroke/50"
            }`}
          >
            {l.label}
          </a>
        ))}

        <span className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* Say hi */}
        <a
          href="mailto:contato@gustavoo.me"
          className="group relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2"
        >
          <span className="absolute inset-[-2px] rounded-full accent-gradient-animated opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="absolute inset-0 rounded-full bg-surface backdrop-blur-md" />
          <span className="relative z-10 flex items-center gap-1 text-text-primary">
            Fala comigo
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </a>
      </div>
    </nav>
  );
}
