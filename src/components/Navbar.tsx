import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ServicosCTA from "./ServicosCTA";
import { buildWhatsAppUrl } from "../lib/whatsapp";

const LINKS = [
  { label: "Início", id: "inicio" },
  { label: "Projetos", id: "projetos" },
  { label: "Sobre", id: "sobre" },
];

const HELLO = buildWhatsAppUrl(
  "Olá Gustavo! Vi seu portfólio e gostaria de conversar."
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
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
  }, [onHome]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Volta para a home e rola até a seção após o render.
      navigate("/");
      window.setTimeout(
        () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
        80
      );
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-xl border border-white/10 bg-surface/60 px-2 py-2 transition-shadow ${
          scrolled ? "shadow-lg shadow-black/20" : ""
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="group relative w-9 h-9 rounded-full flex items-center justify-center shrink-0 overflow-hidden transition-transform hover:scale-110"
          aria-label="Início"
        >
          <img
            src="favicon.svg"
            alt="Gustavo Oliveira"
            className="w-full h-full object-cover"
          />
        </Link>

        <span className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* Links de seção (rolagem na home) */}
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={`/#${l.id}`}
            onClick={go(l.id)}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors ${
              onHome && active === l.id
                ? "text-text-primary bg-stroke/50"
                : "text-muted hover:text-text-primary hover:bg-stroke/50"
            }`}
          >
            {l.label}
          </a>
        ))}

        <span className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* Isca: Serviços */}
        <ServicosCTA variant="nav" />

        {/* Contato (WhatsApp) */}
        <a
          href={HELLO}
          target="_blank"
          rel="noopener"
          className="group relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 ml-1"
        >
          <span className="absolute inset-[-2px] rounded-full accent-gradient-animated opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="absolute inset-0 rounded-full bg-surface backdrop-blur-md" />
          <span className="relative z-10 flex items-center gap-1 text-text-primary">
            <span className="hidden sm:inline">Vamos conversar</span>
            <span className="sm:hidden">Contato</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </a>
      </div>
    </nav>
  );
}
