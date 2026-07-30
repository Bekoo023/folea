import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { TiltPhoto } from "@/components/TiltPhoto";
import { UsageSteps } from "@/components/UsageSteps";
import { Marquee } from "@/components/Marquee";
import { ButtonLink, Button } from "@/components/Button";
import { PRODUCT } from "@/lib/products";
import { euro } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { INGREDIENTS, QUOTES } from "@/lib/journal";

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.22]);
  const dimOpacity = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 0.5]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -70]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const wordmarkY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 50]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.75], [0.95, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[600px] overflow-hidden bg-ink text-paper"
    >
      <motion.div className="absolute inset-0" style={{ scale: mediaScale }}>
        {/* Zichtbaar zolang de merkfilm er nog niet is */}
        <div className="hero-fallback absolute inset-0" />
        {/* VERVANG: zet de merkfilm in /public/media/ (stil, loopend, ±12 sec) */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/media/hero-poster.jpg"
        >
          <source src="/media/folea-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-tint absolute inset-0" />
      </motion.div>

      <motion.div className="absolute inset-0 bg-ink" style={{ opacity: dimOpacity }} />

      <motion.div
        className="relative flex h-full flex-col"
        style={{
          padding: "calc(var(--nav-h) + 24px) var(--pad) 0",
          y: textY,
          opacity: textOpacity,
        }}
      >
        <h1 className="display mt-auto max-w-[15ch] text-[clamp(34px,5.6vw,86px)]">
          Haar wordt
          <br />
          elke dag
          <br />
          <em className="latin block font-normal">gedragen.</em>
        </h1>

        <p className="mt-5 max-w-[34ch] text-[clamp(15px,1.25vw,18px)] opacity-90">
          Eén hair butter, gemaakt voor haar dat om meer vraagt.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink to={`/product/${PRODUCT.slug}`} variant="flush">
            Bestel {PRODUCT.name}
          </ButtonLink>
          <ButtonLink to="/gebruik" variant="ghost" className="backdrop-blur-sm bg-ink/15">
            Hoe te gebruiken
          </ButtonLink>
        </div>
      </motion.div>

      <motion.p
        className="wordmark absolute inset-x-0 bottom-0 translate-y-[16%] px-[var(--pad)] opacity-95"
        style={{ y: wordmarkY, opacity: wordmarkOpacity }}
      >
        Folea
      </motion.p>
    </section>
  );
}

const FACTS: [string, string][] = [
  ["01", "Eén formule, geen twaalf stappen"],
  ["02", "Klein verpakt, nooit getest op dieren"],
  ["03", "Navulbaar vanaf je tweede bestelling"],
  ["04", "Volledige ingrediëntenlijst op het etiket"],
];

function Manifest() {
  return (
    <section className="section bg-papyrus text-ink">
      <div className="wrap">
        <div className="grid gap-[clamp(40px,6vw,90px)] lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <Reveal>
              <p className="eyebrow m-0 mb-6 opacity-50">Waarom Folea bestaat</p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="m-0 mb-7 max-w-[22ch] text-[clamp(19px,2.05vw,30px)] font-medium leading-[1.34] tracking-[-0.01em]">
                Er zijn genoeg potten die beloven je haar te veranderen. Wij maken er één die het
                gewoon gezond houdt.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="m-0 mb-7 max-w-[46ch] text-[clamp(15px,1.1vw,17px)] leading-relaxed opacity-75">
                Folea begon met een simpele vraag: waarom heeft haarverzorging twaalf stappen nodig
                als de meeste ervan hetzelfde doen? Dus maakten we er één van. Eén pot, met precies
                de werkstoffen die iets doen niks dat er alleen in zit om de textuur te verkopen.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="m-0 mb-7 max-w-[46ch] text-[clamp(15px,1.1vw,17px)] leading-relaxed opacity-75">
                Alles wordt in kleine batches gemengd en verpakt. Geen dierproeven,
                navulbaar vanaf de tweede bestelling, en op elk etiket staat de datum waarop het is
                gemaakt.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ButtonLink to="/verhaal">Lees het verhaal</ButtonLink>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="border-t border-ink/20 pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-1">
              <p className="latin m-0 mb-8 max-w-[24ch] text-[clamp(21px,2.1vw,28px)] leading-snug opacity-90">
                “Geen ingrediënt dat er alleen staat om de textuur te verkopen.”
              </p>
              <ul className="m-0 list-none p-0">
                {FACTS.map(([no, text]) => (
                  <li
                    key={no}
                    className="grid grid-cols-[auto_1fr] items-baseline gap-4 border-t border-ink/15 py-4 first:border-t-0"
                  >
                    <span className="text-[11px] font-semibold tracking-[0.14em] opacity-50">
                      {no}
                    </span>
                    <span className="text-[14.5px] leading-snug opacity-80">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProductShowcase() {
  const { add } = useCart();

  return (
    <section className="section bg-paper text-ink">
      <div className="wrap">
        <div className="grid gap-[clamp(30px,5vw,80px)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal variant="clip">
            {PRODUCT.heroImage ? (
              <TiltPhoto src={PRODUCT.heroImage} alt={PRODUCT.name} ratio="4/5" />
            ) : (
              <Photo hue={PRODUCT.hue} ratio="4/5" label={`Foto ${PRODUCT.photos[0]}`} />
            )}
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow m-0 mb-5 opacity-50">Het product</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display mb-2 text-[clamp(30px,4.6vw,66px)]">
                Eén pot.
                <br />
                Voedt van wortel tot punt.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="latin m-0 mb-5 text-[17px] opacity-70">{PRODUCT.latin}</p>
            </Reveal>
            <Reveal delay={0.13}>
              <p className="max-w-[46ch] text-[15px] leading-relaxed opacity-80">{PRODUCT.desc}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <span className="text-[20px] font-semibold tabular-nums">
                  {euro(PRODUCT.price)}
                </span>
                <Button variant="ink" onClick={() => add(PRODUCT.slug)}>
                  In de tas
                </Button>
                <ButtonLink to={`/product/${PRODUCT.slug}`} variant="ghost">
                  Bekijk product
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Manifest />

      <ProductShowcase />

      {/* flushing pink — signature */}
      <section className="section bg-flush text-ink">
        <div className="wrap">
          <div className="mb-[clamp(34px,4vw,64px)] flex flex-wrap items-baseline gap-[clamp(20px,4vw,64px)]">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-50">
              Hoe te gebruiken
            </span>
            <h2 className="display flex-1 basis-[320px] text-[clamp(30px,4.6vw,66px)]">
              Drie momenten,
              <br />
              één pot
            </h2>
          </div>
          <UsageSteps />
        </div>
      </section>

      <Marquee />

      {/* zwart */}
      <section className="section bg-ink text-papyrus">
        <div className="wrap">
          <div className="grid gap-[clamp(28px,4vw,64px)] lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Reveal>
                <p className="eyebrow m-0 mb-5 opacity-55">Wat erin zit</p>
                <h2 className="display mb-5 text-[clamp(28px,3.8vw,54px)]">
                  Korte lijsten,
                  <br />
                  hele namen
                </h2>
                <p className="max-w-[38ch] text-[15px] leading-relaxed opacity-75">
                  Een formule wordt niet beter van meer ingrediënten. Op de pot staat de volledige
                  INCI-lijst, met de werkstoffen die het verschil maken bovenaan en het percentage
                  erbij.
                </p>
                <div className="mt-7">
                  <ButtonLink to="/verhaal" variant="flush">
                    Volledige lijsten
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <div>
              {INGREDIENTS.map(([name, note, pct], i) => (
                <Reveal key={name} delay={i * 0.05}>
                  <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-[clamp(16px,3vw,40px)] border-t border-papyrus/25 py-5">
                    <span className="text-[11px] font-semibold tracking-[0.14em] opacity-50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="latin text-[clamp(20px,2.4vw,32px)] leading-tight">
                      {name}
                      <b className="mt-1.5 block font-body text-[13px] font-medium not-italic tracking-[0.05em] opacity-60">
                        {note}
                      </b>
                    </span>
                    <span className="text-[13px] tabular-nums opacity-80">{pct}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* papyrus */}
      <section className="section bg-papyrus text-ink">
        <div className="wrap">
          <div className="mb-[clamp(34px,4vw,64px)] flex flex-wrap items-baseline gap-[clamp(20px,4vw,64px)]">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-50">
              Gelezen &amp; gehoord
            </span>
            <h2 className="display flex-1 basis-[320px] text-[clamp(30px,4.6vw,66px)]">
              Wat mensen
              <br />
              terugzeggen
            </h2>
          </div>
          <div className="grid gap-[clamp(22px,3vw,44px)] md:grid-cols-3">
            {QUOTES.map(([text, who], i) => (
              <Reveal key={who} delay={i * 0.07}>
                <blockquote className="m-0 border-t border-ink/25 pt-5">
                  <p className="latin m-0 mb-4 text-[clamp(19px,1.9vw,26px)] leading-[1.32]">
                    “{text}”
                  </p>
                  <cite className="text-[11px] uppercase not-italic tracking-[0.18em] opacity-60">
                    {who}
                  </cite>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
