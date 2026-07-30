import { useEffect, useRef } from "react";
import { Photo } from "./Photo";
import { useScrollDirection } from "@/hooks/useScrollDirection";

const SLOT_COUNT = 16;
const IMAGES = [
  "/media/folea-product-pink.png",
  "/media/folea-product-white.png",
  "/media/folea-lifestyle.png",
  "/media/folea-ingredients.png",
];

/** Doorlopende band foto's die van richting wisselt met je scrollrichting. */
export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { dir } = useScrollDirection();
  const dirRef = useRef(dir);
  dirRef.current = dir;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let offset = 0;
    let raf = 0;

    const loop = () => {
      offset -= 0.45 * dirRef.current;
      const half = track.scrollWidth / 2;
      if (half > 0) {
        if (offset <= -half) offset += half;
        if (offset > 0) offset -= half;
      }
      track.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-ink"
      style={{ padding: "clamp(30px,4vw,56px) 0" }}
      aria-hidden
    >
      <div className="marquee-track" ref={trackRef}>
        {Array.from({ length: SLOT_COUNT }, (_, i) => (
          <figure
            key={i}
            className="m-0 overflow-hidden rounded-xl"
            style={{ flex: "0 0 clamp(180px,20vw,300px)" }}
          >
            <Photo
              src={IMAGES[i % IMAGES.length]}
              alt=""
              ratio="3/4"
              label={`Foto ${String((i % 8) + 1).padStart(2, "0")}`}
            />
          </figure>
        ))}
      </div>
      <span className="marquee-label pointer-events-none absolute left-1/2 top-1/2 z-5 -translate-x-1/2 -translate-y-1/2">
        Folea · Folea · Folea .
      </span>
    </section>
  );
}
