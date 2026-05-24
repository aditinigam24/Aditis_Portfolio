// aditi-s-digital-canvas-main/src/components/portfolio/Projects.tsx
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { usePerformanceMode } from "@/hooks/use-performance-mode";
import { fadeInUp } from "@/lib/motion-presets";
import { SectionHeader } from "./SectionHeader";

const projects = [
  {
    no: "01",
    title: "Real Estate CRM",
    desc: "A full-stack CRM streamlining property pipelines, client relationships, and team workflows in real time.",
    tech: ["React", "Node.js", "MySQL", "REST APIs"],
    tag: "Live Product",
  },
  {
    no: "02",
    title: "NariShakti — Women Safety",
    desc: "An emergency response platform empowering women with real-time alerts, trusted contacts, and quick action tools.",
    tech: ["React Native", "Node.js", "Maps API"],
    tag: "Social Impact",
  },
  {
    no: "03",
    title: "Field Survey App — University Skill",
    desc: "A university-led mobile-first survey tool for capturing structured field data with offline-first reliability.",
    tech: ["React", "TypeScript", "REST APIs"],
    tag: "Academic",
  },
  {
    no: "04",
    title: "Dashboard UI Studies",
    desc: "A series of premium dashboard explorations focusing on data clarity, motion, and aesthetic information density.",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    tag: "Design",
  },
];

export function Projects() {
  const lite = usePerformanceMode();

  return (
    <section id="work" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Selected work"
          title={
            <>
              Projects that
              <br />
              <span className="text-gradient-primary">tell a story.</span>
            </>
          }
          description="A glimpse into the things I've built — engineered to feel as good as they work."
        />

        <div className="mt-16 grid gap-6 grid-cols-1 lg:grid-cols-2">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              {...fadeInUp(lite, i * 0.05)}
              className={`group relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 backdrop-blur hover:border-primary/50 sm:p-10 ${lite ? "" : "transition-all duration-500 hover:-translate-y-1"}`}
            >
              {!lite && (
                <>
                  <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/0 blur-3xl transition-all duration-700 group-hover:bg-primary/20" />
                  <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-secondary/0 blur-3xl transition-all duration-700 group-hover:bg-secondary/15" />
                </>
              )}

              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-5xl font-semibold text-white/10 transition group-hover:text-white/20">
                    {p.no}
                  </span>
                  <span className="rounded-full border border-border bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {p.tag}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl font-semibold text-gradient sm:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-white/[0.03] px-3 py-1 text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Case Study
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-white/[0.04] transition group-hover:border-primary/60 group-hover:bg-primary/15">
                    <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div> */}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
