import { useEffect, useState } from "react";

/** True on phones, touch devices, or when user prefers reduced motion. */
export function usePerformanceMode() {
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 767px)");
    const coarse = window.matchMedia("(hover: none) and (pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setLite(narrow.matches || coarse.matches || reduced.matches);
    };

    update();
    narrow.addEventListener("change", update);
    coarse.addEventListener("change", update);
    reduced.addEventListener("change", update);

    return () => {
      narrow.removeEventListener("change", update);
      coarse.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return lite;
}
