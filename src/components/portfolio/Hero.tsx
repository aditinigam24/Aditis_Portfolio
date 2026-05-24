// aditi-s-digital-canvas-main/src/components/portfolio/Hero.tsx
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Mail, Sparkles } from "lucide-react";
import {
  RESUME_DOWNLOAD_NAME,
  RESUME_PDF_URL,
} from "@/config/site";
import { Particles } from "./Particles";

const stats = [
  { value: "1.5K+", label: "LinkedIn Network" },
  { value: "Full Stack", label: "Developer" },
  { value: "Gen AI", label: "Explorer" },
  { value: "Community", label: "Leader" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-6 lg:px-12 pt-32 md:pt-24"
    >
      <Particles count={40} />
      <div className="grid-fade absolute inset-0 opacity-60" aria-hidden />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* LEFT */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-secondary/70" />
              <span className="relative h-2 w-2 rounded-full bg-secondary" />
            </span>
            Available for opportunities · 2026
          </motion.div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] font-semibold leading-[0.85] tracking-tighter">
            {['ADITI', 'NIGAM'].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.3 + i * 0.15,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block"
              >
                <span className={i === 1 ? "text-gradient-primary" : "text-gradient"}>
                  {word}
                </span>
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-8 max-w-xl text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
          >
            Full Stack Developer · Generative AI Explorer · Entrepreneur
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Creating intelligent and aesthetic digital experiences through code,
            creativity, and innovation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_var(--primary)] transition-all hover:scale-[1.03] hover:shadow-[0_15px_50px_-10px_var(--primary)]"
            >
              View Projects
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={RESUME_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              download={RESUME_DOWNLOAD_NAME}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-6 py-3 text-sm font-semibold backdrop-blur transition hover:border-primary/50 hover:bg-white/[0.07]"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              Contact
            </a>
          </motion.div>
        </div>

        {/* RIGHT — personality card */}
        <motion.div
          initial={{ opacity: 0, x: 40, filter: "blur(20px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-primary/30 via-transparent to-secondary/25 opacity-60 blur-3xl" />

          <div className="glass-strong relative overflow-hidden rounded-[2rem] p-8 sm:p-10">
            <div className="absolute right-0 top-0 h-40 w-40 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/2 translate-y-1/2 rounded-full bg-secondary/25 blur-3xl" />

            <div className="relative">
              <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-secondary" />
                Manifesto
              </div>

              <blockquote className="font-display text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
                <span className="text-gradient">Code is my craft.</span>
                <br />
                <span className="text-gradient">Innovation is my habit.</span>
                <br />
                <span className="text-gradient-primary">Impact is my purpose.</span>
              </blockquote>

              <div className="my-8 h-px hairline" />

              <div className="grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-white/[0.02] p-4 transition hover:border-primary/40 hover:bg-white/[0.05]"
                  >
                    <div className="font-display text-lg font-semibold text-gradient-primary">
                      {s.value}
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="font-display text-base italic text-foreground/70">
                  — Aditi
                </span>
                <span className="h-px flex-1 hairline" />
                <span className="tracking-widest">2026</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex"
      >
        Scroll
        <ArrowDown className="h-3 w-3 animate-bounce" />
      </motion.div>
    </section>
  );
}
