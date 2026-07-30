import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { ButtonLink } from "@/components/Button";
import { useParallax } from "@/hooks/useParallax";
import { TIMELINE } from "@/lib/journal";
import { PRODUCT } from "@/lib/products";

export default function Verhaal() {
  const fig = useParallax<HTMLDivElement>(0.05);

  return (
    <>
      <section className="section bg-papyrus text-ink" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div
            className="grid gap-[clamp(26px,4vw,70px)] lg:grid-cols-2 lg:items-start"
            style={{ paddingTop: "calc(var(--nav-h) + clamp(40px,6vw,90px))" }}
          >
            <div className="max-w-[62ch] text-[clamp(16px,1.15vw,18px)] leading-[1.68]">
              <p className="mb-5">
                Folea begon met een weegschaal die op één gram nauwkeurig was en een lijst
                ingrediënten die we niet konden uitspreken. Dat laatste bleek het probleem.
              </p>
              <p className="mb-5">
                We wilden geen merk bouwen dat je haar behandelt als een probleem dat je met steeds
                meer flesjes moet oplossen. Dus draaiden we het om: welke ene formule doet echt iets,
                zonder de rest erbij te verkopen? Dat werd {PRODUCT.name}.
              </p>
              <h3 className="display mb-3.5 mt-11 text-[clamp(20px,2.2vw,28px)]">Wat we niet doen</h3>
              <p className="mb-5">
                Geen dierproeven. Geen siliconen die na drie dagen ophopen. Geen navulverpakking die
                duurder is dan de pot zelf. En geen ingrediëntenlijst waarop het werkzame
                bestanddeel op plek negentien staat.
              </p>
              <h3 className="display mb-3.5 mt-11 text-[clamp(20px,2.2vw,28px)]">Wat we wél doen</h3>
              <p className="mb-5">
                Elke batch wordt met de hand gemengd, genummerd en gedateerd. Als een batch niet
                klopt, gaat 'ie niet de deur uit. Dat betekent soms dat iets twee weken uitverkocht
                is dat vinden we een beter probleem dan het alternatief.
              </p>
            </div>

            <div>
              <Reveal
                variant="clip"
                className="overflow-hidden rounded-[24px] shadow-[0_30px_70px_-30px_rgba(16,14,12,0.4)]"
              >
                <div ref={fig}>
                  <Photo src="/media/folea-ingredients.png" alt="Ingrediënten van Folea" ratio="4/5" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-ink text-papyrus">
        <div className="wrap">
          <Reveal>
            <p className="latin m-0 max-w-[26ch] text-[clamp(24px,3.4vw,42px)] leading-snug opacity-95">
              “We maken liever één ding dat klopt, dan tien dingen die goed genoeg zijn.”
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-paper text-ink">
        <div className="wrap">
          <div className="mb-[clamp(34px,4vw,64px)] flex flex-wrap items-baseline gap-[clamp(20px,4vw,64px)]">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-50">
              Vooruitblik
            </span>
            <h2 className="display flex-1 basis-[320px] text-[clamp(30px,4.6vw,66px)]">
              Wat je kan
              <br />
              verwachten
            </h2>
            <p className="max-w-[32ch] text-[15px] opacity-70">
              Geen beloftes over honderd producten. Wel een duidelijke volgorde.
            </p>
          </div>
          <div className="border-t border-ink/25">
            {TIMELINE.map(([when, text], i) => (
              <Reveal key={when} delay={i * 0.05}>
                <div className="grid grid-cols-[40px_80px_1fr] items-baseline gap-5 border-b border-ink/15 py-5">
                  <span className="text-[11px] font-semibold tracking-[0.14em] opacity-40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[14px] font-extrabold tracking-[0.06em]">
                    {when}
                  </span>
                  <p className="m-0 text-[15px] leading-snug opacity-80">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-flush text-ink">
        <div className="wrap flex flex-wrap items-end justify-between gap-6">
          <h2 className="display m-0 max-w-[15ch] text-[clamp(28px,4.6vw,64px)]">
            Vragen voordat je bestelt?
          </h2>
          <ButtonLink to="mailto:hallo@foleahair.nl">Neem contact op</ButtonLink>
        </div>
      </section>

      <Marquee />
    </>
  );
}
