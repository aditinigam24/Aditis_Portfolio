import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "sonner";
import { Contact } from "@/components/portfolio/Contact";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { Experience } from "@/components/portfolio/Experience";
import { Hero } from "@/components/portfolio/Hero";
import { Navbar } from "@/components/portfolio/Navbar";
import { Outside } from "@/components/portfolio/Outside";
import { Projects } from "@/components/portfolio/Projects";
import { Quotes } from "@/components/portfolio/Quotes";
import { TechStack } from "@/components/portfolio/TechStack";
import { WhoAmI } from "@/components/portfolio/WhoAmI";
import { WhyMe } from "@/components/portfolio/WhyMe";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

const JerryChatbot = lazy(() =>
  import("@/components/portfolio/JerryChatbot").then((m) => ({
    default: m.JerryChatbot,
  })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aditi Nigam — Full Stack Developer & Generative AI Explorer" },
      {
        name: "description",
        content:
          "Portfolio of Aditi Nigam — Full Stack Developer, Generative AI explorer, entrepreneur, and community-driven leader crafting cinematic digital experiences.",
      },
      { property: "og:title", content: "Aditi Nigam — Portfolio" },
      {
        property: "og:description",
        content:
          "Cinematic, futuristic portfolio showcasing engineering, design, leadership, and impact.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const lite = usePerformanceMode();

  useEffect(() => {
    document.documentElement.toggleAttribute("data-perf-lite", lite);
    return () => document.documentElement.removeAttribute("data-perf-lite");
  }, [lite]);

  return (
    <main className="relative min-h-screen max-w-screen-2xl mx-auto px-6 lg:px-12 overflow-x-hidden">
      <CursorGlow />
      <Navbar />

      <div className="max-w-7xl mx-auto">
        <Hero />
        <WhoAmI />
        <WhyMe />
        <Outside />
        <Quotes />
        <TechStack />
        <Experience />
        <Projects />
        <Contact />
      </div>

      <Suspense fallback={null}>
        <JerryChatbot />
      </Suspense>
      <Toaster theme="dark" position="bottom-right" />
    </main>
  );
}
