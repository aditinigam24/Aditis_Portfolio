/** Lighter Framer Motion presets for mobile (no blur filters). */
export const viewportOnce = { once: true, margin: "-40px" as const, amount: 0.15 };

export function fadeInUp(lite: boolean, delay = 0) {
  if (lite) {
    return {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: viewportOnce,
      transition: { duration: 0.35, delay },
    };
  }
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: viewportOnce,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export function fadeIn(lite: boolean, delay = 0) {
  if (lite) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.35, delay },
    };
  }
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  };
}

export function heroTitle(lite: boolean, index: number) {
  if (lite) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { delay: 0.15 + index * 0.08, duration: 0.4 },
    };
  }
  return {
    initial: { opacity: 0, y: 60, filter: "blur(20px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: {
      delay: 0.3 + index * 0.15,
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };
}
