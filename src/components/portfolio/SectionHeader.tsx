// aditi-s-digital-canvas-main/src/components/portfolio/SectionHeader.tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePerformanceMode } from "@/hooks/use-performance-mode";
import { fadeInUp } from "@/lib/motion-presets";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  const lite = usePerformanceMode();

  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      <motion.div
        {...fadeInUp(lite)}
        className={`mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground backdrop-blur`}
      >
        <span className="h-1 w-1 rounded-full bg-secondary" />
        {eyebrow}
      </motion.div>
      <motion.h2
        {...fadeInUp(lite, 0.05)}
        className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-gradient sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          {...fadeInUp(lite, 0.1)}
          className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
