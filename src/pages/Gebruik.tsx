import { UsageSteps } from "@/components/UsageSteps";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";
import { HAIRTYPE_ADVICE } from "@/lib/usage";
import { PRODUCT } from "@/lib/products";

export default function Gebruik() {
  return (
    <>
      <section className="section bg-papyrus text-ink" style={{ paddingTop: 0 }}>
        <div className="wrap page-head">
          <p className="eyebrow m-0 mb-5 opacity-50">Hoe te gebruiken</p>
          <h1 className="display max-w-[16ch] text-[clamp(38px,7.5vw,120px)]">
            Eén pot,
            <br />
            drie momenten
          </h1>
          <p className="mt-6 max-w-[42ch] text-[clamp(17px,1.55vw,22px)] leading-snug opacity-75">
            Geen schema om aan te houden. {PRODUCT.name} werkt op elk van deze momenten, kies wat
            bij je dag past.
          </p>
          <div className="mt-7">
            <ButtonLink to={`/product/${PRODUCT.slug}`}>Bestel {PRODUCT.name}</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section bg-flush text-ink">
        <div className="wrap">
          <UsageSteps />
        </div>
      </section>

      <section className="section bg-ink text-papyrus">
        <div className="wrap">
          <div className="grid gap-[clamp(26px,4vw,70px)] lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="display mb-5 text-[clamp(26px,3.4vw,48px)]">Hoeveel eigenlijk?</h2>
              <p className="max-w-[40ch] text-[15px] leading-relaxed opacity-75">
                Er bestaat geen hoeveelheid die voor iedereen klopt. Dit is het startpunt waar de
                meeste mensen op uitkomen. Pas het aan op wat je ziet.
              </p>
            </div>
            <div>
              {HAIRTYPE_ADVICE.map(([type, advice], i) => (
                <Reveal key={type} delay={i * 0.05}>
                  <div className="grid grid-cols-[auto_1fr] items-baseline gap-[clamp(16px,3vw,40px)] border-t border-papyrus/25 py-5">
                    <span className="text-[11px] font-semibold tracking-[0.14em] opacity-50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[19px] font-medium">
                      {type}
                      <b className="mt-1.5 block text-[13px] font-medium tracking-[0.05em] opacity-60">
                        {advice}
                      </b>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
