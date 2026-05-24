import { useMemo } from "react";

export function Particles({
  count = 30,
  lite = false,
}: {
  count?: number;
  lite?: boolean;
}) {
  const effectiveCount = lite ? 0 : count;

  const particles = useMemo(
    () =>
      Array.from({ length: effectiveCount }, (_, i) => ({
        id: i,
        size: 1 + Math.random() * 2.5,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 14,
        opacity: 0.15 + Math.random() * 0.45,
      })),
    [effectiveCount],
  );

  if (effectiveCount === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-foreground"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: p.opacity,
            animation: `float-slow ${p.duration}s ease-in-out ${p.delay}s infinite`,
            boxShadow: "0 0 8px currentColor",
          }}
        />
      ))}
    </div>
  );
}
