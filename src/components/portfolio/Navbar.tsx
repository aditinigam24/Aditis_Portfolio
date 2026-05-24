// aditi-s-digital-canvas-main/src/components/portfolio/Navbar.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  RESUME_DOWNLOAD_NAME,
  RESUME_PDF_URL,
} from "@/config/site";

const links = [
  { href: "#about", label: "About" },
  { href: "#why", label: "Why Me" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Journey" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        className={`flex w-full max-w-7xl mx-auto items-center justify-between gap-6 rounded-full px-6 lg:px-8 py-3 transition-all duration-500 ${
          scrolled ? "glass-strong glow-primary" : "glass"
        }`}
      >
        <a href="#top" className="flex items-center gap-2">
          <span className="relative grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-primary-foreground">
            AN
            <span className="absolute inset-0 rounded-full bg-primary/40 blur-md" />
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-wide sm:block">
            Aditi Nigam
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={RESUME_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            download={RESUME_DOWNLOAD_NAME}
            className="hidden rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-white/5 hover:text-foreground sm:inline-block"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="group relative overflow-hidden rounded-full border border-border bg-white/5 px-4 py-1.5 text-xs font-medium transition hover:border-primary/60"
          >
            <span className="relative z-10">Let's talk</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-primary/40 to-secondary/40 transition-transform duration-500 group-hover:translate-x-0" />
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
