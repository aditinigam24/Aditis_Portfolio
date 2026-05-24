import { motion } from "framer-motion";
import {
  Brain,
  Code2,
  Compass,
  Lightbulb,
  MessageSquare,
  Network,
  Palette,
  Users,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const traits = [
  { icon: Users, label: "Leadership", desc: "Leading initiatives & communities." },
  { icon: MessageSquare, label: "Communication", desc: "Clear, persuasive, human." },
  { icon: Network, label: "Networking", desc: "1500+ meaningful connections." },
  { icon: Compass, label: "Entrepreneurship", desc: "Founder mindset, ownership." },
  { icon: Brain, label: "AI Exploration", desc: "LLMs, agents, workflows." },
  { icon: Lightbulb, label: "Problem Solving", desc: "First-principles thinking." },
  { icon: Palette, label: "UI / UX Thinking", desc: "Design as a discipline." },
  { icon: Code2, label: "Full Stack Dev", desc: "Deploying solutions to problems." },
];

export function WhyMe() {
  return (
    <section id="why" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Why me"
          title={
            <>
              I don't just build projects —
              <br />
              <span className="text-gradient-primary">I build impact.</span>
            </>
          }
          description="I solve problems, lead initiatives, and create meaningful experiences through technology, design, and innovation."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {traits.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-white/[0.02] p-6 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-primary/50"
            >
              <div className="relative">
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl border border-border bg-white/[0.04] transition group-hover:border-secondary/60">
                  <t.icon className="h-4 w-4 text-secondary" />
                </div>
                <div className="font-display text-base font-semibold">{t.label}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
