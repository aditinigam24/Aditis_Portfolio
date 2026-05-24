import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const stack = [
  { name: "React", hint: "UI Library" },
  { name: "Next.js", hint: "Framework" },
  { name: "TypeScript", hint: "Type Safety" },
  { name: "Node.js", hint: "Runtime" },
  { name: "Express", hint: "Backend" },
  { name: "MySQL", hint: "Database" },
  { name: "Tailwind", hint: "Styling" },
  { name: "REST APIs", hint: "Integration" },
  { name: "Python", hint: "AI / Scripting" },
  { name: "Generative AI", hint: "LLMs · Agents" },
];

export function TechStack() {
  return (
    <section id="stack" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Toolkit"
          title={
            <>
              The stack behind
              <br />
              <span className="text-gradient-primary">every experience.</span>
            </>
          }
          description="Tools I reach for to ship intelligent, beautiful, and reliable products."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {stack.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              whileHover={{ y: -6 }}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-white/[0.02] p-5 backdrop-blur transition hover:border-primary/50"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 to-secondary/0 transition-all duration-500 group-hover:from-primary/15 group-hover:to-secondary/10" />
              <div className="flex h-full flex-col justify-between">
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {s.hint}
                </div>
                <div className="font-display text-lg font-semibold leading-tight text-gradient sm:text-xl">
                  {s.name}
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{boxShadow: "inset 0 0 30px -5px color-mix(in oklab, var(--primary) 35%, transparent)"}} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
