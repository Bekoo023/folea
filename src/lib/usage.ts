export interface UsageMoment {
  no: string;
  title: string;
  body: string;
  meta: [string, string];
  hue: number;
  image?: string;
}

/** Drie momenten om dezelfde pot te gebruiken — geen volgordelijke stappen, gewoon opties. */
export const MOMENTS: UsageMoment[] = [
  {
    no: "01",
    title: "Op handdoekdroog haar",
    body: "Een kleine schep laten smelten tussen de handen en verdelen over de lengtes. De basis voor elke wasbeurt.",
    meta: ["30 sec", "Elke wasbeurt"],
    hue: 34,
    image: "/media/folea-lifestyle.png",
  },
  {
    no: "02",
    title: "Vóór het föhnen",
    body: "Een dun laagje beschermt tegen hitte en houdt pluis onder controle, zonder het haar plat te maken.",
    meta: ["30 sec", "Bij het föhnen"],
    hue: 30,
    image: "/media/folea-product-white.png",
  },
  {
    no: "03",
    title: "'s Avonds op de punten",
    body: "Op droog haar smeedt een klein beetje de punten weer aan elkaar tegen het slapen gaan.",
    meta: ["10 sec", "Naar wens"],
    hue: 26,
    image: "/media/folea-product-pink.png",
  },
];

/** Advies over hoeveel je nodig hebt, per haartype. */
export const HAIRTYPE_ADVICE: [string, string][] = [
  ["Fijn haar, snel vet", "Kleine hoeveelheid, alleen op de punten"],
  ["Normaal, geen kleur", "Standaard schep, lengtes en punten"],
  ["Geblondeerd of gekleurd", "Ruime schep, dagelijks op de punten"],
  ["Krullend of dik", "Extra schep, ook op de lengtes"],
];
