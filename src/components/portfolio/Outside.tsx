// aditi-s-digital-canvas-main/src/components/portfolio/Outside.tsx
import { motion } from "framer-motion";
import { Crown, Gem, Users } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const communities = [
  {
    icon: Gem,
    title: "Adore Hive Jewellery",
    role: "Founder",
    body: "Built a jewellery brand from idea to identity — blending storytelling, branding, and craft.",
  },
  {
    icon: Users,
    title: "Codec Club, SUAS",
    role: "Marketing Associate",
    body: "Driving outreach, partnerships, and creative campaigns for the campus tech community.",
  },
  {
    icon: Crown,
    title: "Student Council, SUAS",
    role: "Academics Head",
    body: "Leading academic initiatives, events, and student-driven programs across campus.",
  },
];

export function Outside() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Beyond the screen"
          title={
            <>
              Outside the
              <br />
              <span className="text-gradient-primary">technical world.</span>
            </>
          }
          description="Beyond development, I enjoy building meaningful connections, leading communities, exploring creative ideas, and growing through collaboration and innovation."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {communities.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 backdrop-blur transition hover:border-secondary/40"
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-secondary/0 blur-3xl transition-all duration-700 group-hover:bg-secondary/15" />
              <div className="relative flex h-full flex-col">
                <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl border border-border bg-white/[0.04]">
                  <c.icon className="h-5 w-5 text-secondary" />
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {c.role}
                </div>
                <h3 className="mt-1 font-display text-2xl font-semibold text-gradient">
                  {c.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
