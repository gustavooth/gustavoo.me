import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  actionLabel?: string;
  actionHref?: string;
}

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  actionLabel,
  actionHref,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14"
    >
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">
            {eyebrow}
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-text-primary leading-[1.05]">
          {title}
        </h2>
        <p className="text-sm md:text-base text-muted max-w-md mt-4">
          {subtitle}
        </p>
      </div>

      {actionLabel && (
        <a
          href={actionHref}
          className="group relative hidden md:inline-flex items-center gap-2 self-start md:self-auto rounded-full px-5 py-2.5 text-sm text-text-primary"
        >
          <span className="absolute inset-0 rounded-full border border-stroke transition-colors group-hover:border-transparent" />
          <span className="absolute inset-[-1.5px] rounded-full accent-gradient-animated opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="absolute inset-0 m-[1.5px] rounded-full bg-bg" />
          <span className="relative z-10 flex items-center gap-2">
            {actionLabel}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>
      )}
    </motion.div>
  );
}
