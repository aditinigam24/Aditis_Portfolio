// aditi-s-digital-canvas-main/src/components/portfolio/Experience.tsx
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const timeline = [
  {
    when: "2026",
    role: "Generative AI Intern",
    org: "EY",
    body: "Exploring LLMs, AI workflows, and intelligent enterprise systems.",
    tag: "Internship",
  },
  {
    when: "2025",
    role: "Full Stack Developer Intern",
    org: "i-SoftZone",
    body: "Built features for a live CRM with React, Node.js, MySQL, REST APIs, and scalable services.",
    tag: "Internship",
  },
  {
    when: "2024 — 2026",
    role: "Marketing Associate",
    org: "Codec Club, SUAS",
    body: "Driving outreach, branding, and creative campaigns for the campus tech community.",
    tag: "Community",
  },
  {
    when: "2024",
    role: "Academics Head",
    org: "Student Council, SUAS",
    body: "Leading academic initiatives, events, and student-led programs.",
    tag: "Leadership",
  },
  {
    when: "Present",
    role: "Founder",
    org: "Adore Hive Jewellery",
    body: "Building a jewellery brand — identity, storytelling, and craft.",
    tag: "Entrepreneur",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Journey"
          title={
            <>
              Chapters of a
              <br />
              <span className="text-gradient-primary">curious career.</span>
            </>
          }
        />

        <div className="relative mt-16">
          {/* center spine */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent md:left-1/2" />

          <div className="space-y-8">
            {timeline.map((t, i) => {
              const right = i % 2 === 1;
              return (
                <motion.div
                  key={t.role + t.when}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.05 }}
                  className={`relative grid md:grid-cols-2 md:gap-12 ${right ? "md:[&>*:first-child]:order-2" : ""}`}
                >
                  <div className={`pl-12 md:pl-0 ${right ? "md:pl-12 md:text-left" : "md:pr-12 md:text-right"}`}>
                    {/* node */}
                    <span className="absolute left-4 top-6 -translate-x-1/2 md:left-1/2">
                      <span className="relative grid h-4 w-4 place-items-center">
                        <span className="absolute inset-0 animate-ping rounded-full bg-primary/50" />
                        <span className="relative h-3 w-3 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0_0_20px_var(--primary)]" />
                      </span>
                    </span>

                    <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      {t.when} · {t.tag}
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-gradient">
                      {t.role}
                    </h3>
                    <div className="mt-1 text-sm font-medium text-secondary">{t.org}</div>
                  </div>

                  <div className={`mt-4 pl-12 md:mt-0 md:pl-0 ${right ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="rounded-2xl border border-border bg-white/[0.02] p-6 backdrop-blur transition hover:border-primary/40">
                      <p className="text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
