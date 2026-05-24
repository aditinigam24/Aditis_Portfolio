// aditi-s-digital-canvas-main/src/components/portfolio/Quotes.tsx
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";

const quotes = [
  "The future belongs to those who build it.",
  "Creativity and technology together create impact.",
  "Innovation begins with curiosity.",
  "Dream. Build. Lead.",
];

export function Quotes() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % quotes.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-border p-12 sm:p-20"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-transparent to-secondary/15" />
          <div className="absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-secondary/15 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            <Quote className="mb-6 h-10 w-10 text-secondary/70 animate-pulse-glow" />
            <div className="relative min-h-[120px] w-full">
              <AnimatePresence mode="wait">
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-3xl font-medium leading-tight tracking-tight text-gradient sm:text-4xl md:text-5xl"
                >
                  "{quotes[i]}"
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="mt-8 flex gap-2">
              {quotes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Quote ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === i ? "w-8 bg-gradient-to-r from-primary to-secondary" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
