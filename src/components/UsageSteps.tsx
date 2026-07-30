import { useEffect, useRef, useState } from "react";
import { Photo } from "./Photo";
import { MOMENTS } from "@/lib/usage";

/**
 * Signature element: terwijl je door de momenten scrollt wisselt links
 * de foto én het reusachtige nummer mee.
 */
export function UsageSteps() {
  const [active, setActive] = useState(0);
  const stepsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.index);
            if (!Number.isNaN(i)) setActive(i);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-25% 0px -25% 0px" },
    );
    stepsRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {/* Desktop: één gedeelde sticky foto die meekruist met de actieve stap */}
      <div
        className="hidden lg:sticky lg:top-[var(--nav-h)] lg:flex lg:h-[calc(100svh-var(--nav-h))] lg:flex-col lg:justify-center lg:self-start lg:pr-[clamp(0px,3vw,50px)]"
      >
        <div className="relative aspect-square w-full max-w-[520px]">
          {MOMENTS.map((step, i) => (
            <div
              key={step.no}
              className={[
                "absolute inset-0 overflow-hidden rounded-[28px] shadow-[0_30px_70px_-30px_rgba(16,14,12,0.4)] transition-all duration-700 ease-folea",
                i === active ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]",
              ].join(" ")}
            >
              {step.image ? (
                <Photo src={step.image} alt={step.title} ratio="1/1" />
              ) : (
                <Photo hue={step.hue} ratio="1/1" label={`Foto moment ${step.no}, 1:1`} />
              )}
            </div>
          ))}
          <span className="ritual-bigno pointer-events-none absolute -bottom-[6%] -right-[2%] z-4">
            {MOMENTS[active].no}
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        {MOMENTS.map((step, i) => (
          <article
            key={step.no}
            data-index={i}
            data-active={i === active}
            ref={(el) => {
              stepsRef.current[i] = el;
            }}
            className="step"
          >
            {/* Mobiel/tablet: elk moment krijgt zijn eigen foto, direct bij de tekst */}
            <div className="relative mb-5 aspect-square w-full max-w-[420px] overflow-hidden rounded-[28px] shadow-[0_30px_70px_-30px_rgba(16,14,12,0.4)] lg:hidden">
              {step.image ? (
                <Photo src={step.image} alt={step.title} ratio="1/1" />
              ) : (
                <Photo hue={step.hue} ratio="1/1" label={`Foto moment ${step.no}, 1:1`} />
              )}
              <span className="ritual-bigno pointer-events-none absolute -bottom-[6%] -right-[2%] z-4">
                {step.no}
              </span>
            </div>

            <div className="mb-2.5 font-display text-[13px] font-extrabold tracking-[0.14em]">
              {step.no}
            </div>
            <h3 className="display mb-3.5 text-[clamp(26px,3.4vw,46px)]">{step.title}</h3>
            <p className="mb-4 max-w-[40ch] text-[15px] leading-relaxed">{step.body}</p>
            <div className="flex flex-wrap gap-4.5 text-[12px] tracking-[0.06em] opacity-70">
              <span>{step.meta[0]}</span>
              <span>{step.meta[1]}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
