import { Reveal } from "@/components/Reveal";
import { useMeta } from "@/hooks/useMeta";
import { COMPANY } from "@/lib/company";

const SECTIONS: [string, string[]][] = [
  [
    "Wie we zijn",
    [
      `${COMPANY.legalName} (KVK ${COMPANY.kvk}), gevestigd aan ${COMPANY.address}, is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in dit privacybeleid. Vragen? Mail ${COMPANY.email}.`,
    ],
  ],
  [
    "Welke gegevens we verwerken",
    [
      "Naam, adres- en contactgegevens die je invult bij het bestellen (voor levering en communicatie over je bestelling).",
      "Betaalgegevens: deze verwerken wij zelf niet. Betalingen lopen via Stripe, die als zelfstandige verwerkingsverantwoordelijke optreedt voor de betaalgegevens.",
      "Je e-mailadres als je je aanmeldt voor de nieuwsbrief.",
      "Technische gegevens (zoals IP-adres en browsertype) via eventuele analytics op de website.",
    ],
  ],
  [
    "Waarom we deze gegevens verwerken",
    [
      "Om je bestelling te verwerken, te verzenden en je daarover te informeren.",
      "Om je vragen te beantwoorden.",
      "Om — alleen met jouw toestemming — de nieuwsbrief te versturen.",
      "Om de website te verbeteren op basis van geanonimiseerd gebruik.",
    ],
  ],
  [
    "Hoe lang we gegevens bewaren",
    [
      "Niet langer dan nodig voor het doel waarvoor ze zijn verzameld, en niet langer dan de wettelijke bewaartermijnen (bijvoorbeeld de fiscale bewaarplicht van 7 jaar voor factuurgegevens).",
    ],
  ],
  [
    "Delen met derden",
    [
      "We delen gegevens alleen met partijen die nodig zijn om de overeenkomst uit te voeren: onze betaalverwerker (Stripe) en de bezorgdienst. Met deze partijen maken we afspraken om je gegevens te beschermen.",
    ],
  ],
  [
    "Jouw rechten",
    [
      "Je hebt het recht om je gegevens in te zien, te corrigeren of te laten verwijderen, en het recht om eventuele toestemming voor gegevensverwerking in te trekken. Stuur daarvoor een mail naar " +
        COMPANY.email +
        ". Je hebt ook het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens.",
    ],
  ],
  [
    "Cookies",
    [
      "Deze website gebruikt alleen technisch noodzakelijke cookies om te onthouden wat er in je winkelmand zit. Voor eventuele analytics-cookies vragen we, waar wettelijk vereist, vooraf toestemming.",
    ],
  ],
  [
    "Beveiliging",
    [
      "We nemen passende maatregelen om misbruik, verlies, onbevoegde toegang en andere ongewenste handelingen met persoonsgegevens tegen te gaan.",
    ],
  ],
];

export default function Privacybeleid() {
  useMeta({
    title: "Privacybeleid",
    description: `Hoe ${COMPANY.name} omgaat met je persoonsgegevens.`,
  });

  return (
    <section className="section bg-papyrus text-ink" style={{ paddingTop: 0 }}>
      <div className="wrap page-head">
        <Reveal>
          <p className="eyebrow m-0 mb-5 opacity-50">Juridisch</p>
          <h1 className="display max-w-[18ch] text-[clamp(34px,6vw,80px)]">Privacybeleid</h1>
          <p className="mt-6 max-w-[56ch] text-[15px] leading-relaxed opacity-70">
            Laatst bijgewerkt: januari 2026. Hieronder lees je welke gegevens {COMPANY.name}{" "}
            verzamelt, waarom, en welke rechten je hebt.
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
