// aditi-s-digital-canvas-main/src/components/portfolio/WhoAmI.tsx
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Rocket, Sparkles } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const chapters = [
  {
    icon: GraduationCap,
    title: "Student & Thinker",
    body: "Currently pursuing B.Tech in Computer Science — channeling curiosity into systems, design, and intelligent products.",
  },
  {
    icon: Briefcase,
    title: "Full Stack Developer Intern",
    body: "At i-SoftZone, contributing to a live CRM system with React, Node.js, MySQL, REST APIs, and scalable backend architecture.",
  },
  {
    icon: Sparkles,
    title: "Gen AI Intern @ EY",
    body: "Exploring LLMs, AI workflows, intelligent systems, and AI-powered innovation at enterprise scale.",
  },
  {
    icon: Rocket,
    title: "Founder · Adore Hive",
    body: "Founder of Adore Hive Jewellery — turning creativity and craft into a brand. Building a network through real conversations.",
  },
];

export function WhoAmI() {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Who am I"
          title={
            <>
              A builder shaped by
              <br />
              <span className="text-gradient-primary">code, craft & curiosity.</span>
            </>
          }
          description="Full Stack Developer, Generative AI enthusiast, entrepreneur, and community-driven leader — passionate about building impactful and aesthetically driven digital experiences."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {chapters.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-white/[0.02] p-7 backdrop-blur transition hover:border-primary/40"
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/0 blur-3xl transition-all duration-700 group-hover:bg-primary/20" />
              <div className="relative flex items-start gap-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-border bg-white/[0.04] transition group-hover:border-primary/50">
                  <c.icon className="h-5 w-5 text-secondary transition group-hover:text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-display text-xl font-semibold text-gradient">
                    {c.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {c.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
