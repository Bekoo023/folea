import { Reveal } from "@/components/Reveal";
import { useMeta } from "@/hooks/useMeta";
import { COMPANY } from "@/lib/company";

const SECTIONS: [string, string[]][] = [
  [
    "1. Wie we zijn",
    [
      `${COMPANY.legalName}, KVK ${COMPANY.kvk}, BTW ${COMPANY.btw}, gevestigd aan ${COMPANY.address}. Bereikbaar via ${COMPANY.email}.`,
    ],
  ],
  [
    "2. Toepasselijkheid",
    [
      "Deze voorwaarden gelden voor elk aanbod van ons en elke overeenkomst die via deze website tot stand komt.",
    ],
  ],
  [
    "3. Het aanbod en de overeenkomst",
    [
      "Prijzen op de website zijn in euro's en inclusief btw. Een overeenkomst komt tot stand op het moment dat je bestelling en de bijbehorende betaling zijn bevestigd.",
      "Kennelijke vergissingen of fouten in het aanbod binden ons niet.",
    ],
  ],
  [
    "4. Herroepingsrecht",
    [
      "Je hebt het recht om je bestelling tot 30 dagen na ontvangst zonder opgave van reden te retourneren — ruimer dan de wettelijk verplichte 14 dagen. Dit geldt ook als de verpakking al geopend is.",
      `Meld een retour via ${COMPANY.email}. Je krijgt het aankoopbedrag, inclusief de standaard verzendkosten van de heenzending, terug zodra wij het product retour hebben ontvangen.`,
      `Retouradres: ${COMPANY.returnAddress}.`,
    ],
  ],
  [
    "5. Prijs en betaling",
    [
      "Betalen gebeurt via onze beveiligde betaalpartner Stripe. Wij ontvangen en bewaren zelf geen kaart- of betaalgegevens.",
    ],
  ],
  [
    "6. Levering",
    [
      "We doen ons best om binnen de op de website genoemde termijn te verzenden. Zodra je bestelling is verzonden, ontvang je een bevestiging.",
      "Is een product onverhoopt niet op voorraad? Dan laten we dat zo snel mogelijk weten.",
    ],
  ],
  [
    "7. Klachten",
    [
      `Heb je een klacht over je bestelling? Mail ${COMPANY.email} — we reageren binnen 2 werkdagen.`,
    ],
  ],
  [
    "8. Toepasselijk recht",
    ["Op deze voorwaarden is Nederlands recht van toepassing."],
  ],
];

export default function Voorwaarden() {
  useMeta({
    title: "Algemene voorwaarden",
    description: `De algemene voorwaarden van ${COMPANY.name}.`,
  });

  return (
    <section className="section bg-papyrus text-ink" style={{ paddingTop: 0 }}>
      <div className="wrap page-head">
        <Reveal>
          <p className="eyebrow m-0 mb-5 opacity-50">Juridisch</p>
          <h1 className="display max-w-[18ch] text-[clamp(34px,6vw,80px)]">
            Algemene
            <br />
            voorwaarden
          </h1>
          <p className="mt-6 max-w-[56ch] text-[15px] leading-relaxed opacity-70">
            Laatst bijgewerkt: januari 2026.
          </p>
        </Reveal>
      </div>

      <div className="wrap max-w-[72ch]" style={{ paddingBottom: "clamp(60px,8vw,120px)" }}>
        {SECTIONS.map(([title, paragraphs], i) => (
          <Reveal key={title} delay={Math.min(i * 0.04, 0.2)}>
            <div className="border-t border-ink/15 py-8 first:pt-0">
              <h2 className="display mb-4 text-[clamp(20px,2.2vw,28px)]">{title}</h2>
              {paragraphs.map((p) => (
                <p key={p} className="mb-3 text-[15px] leading-relaxed opacity-80 last:mb-0">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
