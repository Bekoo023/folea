import { useEffect, useState } from "react";

/** Geeft scrollpositie + richting terug. Gebruikt door de nav (verbergen bij
 *  naar beneden scrollen) en door de marquee (omkeren van looprichting). */
export function useScrollDirection() {
  const [y, setY] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const update = () => {
      const next = window.scrollY;
      setDir(next >= last ? 1 : -1);
      setY(next);
      last = next;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { y, dir };
}
