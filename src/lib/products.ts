export interface Product {
  slug: string;
  name: string;
  role: string;
  /** prijs in centen — Stripe rekent in centen, dus houden we het overal zo */
  price: number;
  hue: number;
  latin: string;
  desc: string;
  use: string;
  ing: string;
  /** shotlist: wat er op elke plek gefotografeerd moet worden */
  photos: string[];
  /** echte productfoto's zodra ze er zijn — bestandspaden in /public/media, vervangt de shotlist-placeholder */
  images?: string[];
  /** uitgelichte foto voor de homepage-showcase (los van de productpagina-galerij) */
  heroImage?: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: "folea",
    name: "Folea",
    // PLACEHOLDER: pas gewicht/prijs aan zodra je dat weet
    role: "Voedende hair butter · 200 g",
    price: 3600,
    hue: 34,
    // PLACEHOLDER: vervang door de werkelijke hoofdgrondstof van je formule
    latin: "Butyrospermum parkii",
    desc: "Een rijke, voedende hair butter voor haar dat meer nodig heeft dan shampoo en conditioner alleen. Smelt in de hand tot een lichte olie en trekt in zonder vet aan te voelen. Voor glans en minder pluis, van wortel tot punt.",
    use: "Een kleine schep tussen de handen laten smelten en verdelen over handdoekdroog of droog haar. Focus op de lengtes en punten; bij de hoofdhuid is een dun laagje al genoeg.",
    // PLACEHOLDER: hier komt de echte INCI-lijst zodra de formule definitief is
    ing: "Volledige ingrediëntenlijst volgt zodra de formule definitief is.",
    photos: [
      "pot met hair butter, open, zijlicht op de textuur",
      "textuur op de vingers, macro",
      "aangebracht op de lengtes, model van opzij",
    ],
    images: ["/media/folea-product-white.png", "/media/folea-lifestyle.png"],
    heroImage: "/media/folea-product-pink.png",
  },
];

export const bySlug = (slug?: string) => PRODUCTS.find((p) => p.slug === slug);

/** Zolang er maar één product is: het gemakkelijkste aanknopingspunt voor links elders op de site. */
export const PRODUCT = PRODUCTS[0];

/** gratis verzending vanaf dit bedrag (in centen) */
export const FREE_SHIPPING = 4500;
