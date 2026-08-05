import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Photo } from "@/components/Photo";
import { TiltPhoto } from "@/components/TiltPhoto";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { bySlug } from "@/lib/products";
import { euro } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { useMeta } from "@/hooks/useMeta";

export default function Product() {
  const { slug } = useParams();
  const product = bySlug(slug);
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  useEffect(() => setQty(1), [slug]);
  useMeta({
    title: product ? `${product.name} — ${product.role}` : "Product niet gevonden",
    description: product?.desc,
    image: product?.heroImage ?? product?.images?.[0]?.src,
  });

  if (!product) return <Navigate to="/" replace />;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.desc,
    image: product.heroImage ?? product.images?.[0]?.src,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: (product.price / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      url: typeof window !== "undefined" ? window.location.href : undefined,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <section className="section bg-papyrus text-ink" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div
            className="grid gap-[clamp(26px,3vw,60px)] lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
            style={{ paddingTop: "calc(var(--nav-h) + clamp(28px,4vw,60px))" }}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {product.images && product.images.length > 0 ? (
                <>
                  <Reveal variant="clip" className="sm:col-span-2">
                    <TiltPhoto src={product.images[0].src} alt={product.images[0].alt} ratio="5/4" />
                  </Reveal>
                  {product.images.slice(1).map((img, i) => (
                    <Reveal
                      key={img.src}
                      delay={i * 0.07}
                      className="overflow-hidden rounded-[24px] shadow-[0_24px_60px_-30px_rgba(16,14,12,0.35)]"
                    >
                      <Photo
                        src={img.src}
                        alt={img.alt}
                        ratio="1/1"
                        className="transition-transform duration-500 ease-folea hover:scale-[1.05]"
                      />
                    </Reveal>
                  ))}
                </>
              ) : (
                <>
                  <Reveal variant="clip" className="sm:col-span-2">
                    <TiltPhoto hue={product.hue} ratio="5/4" label={`Foto ${product.photos[0]}`} />
                  </Reveal>
                  {product.photos.slice(1).map((shot, i) => (
                    <Reveal
                      key={shot}
                      delay={i * 0.07}
                      className="overflow-hidden rounded-[24px] shadow-[0_24px_60px_-30px_rgba(16,14,12,0.35)]"
                    >
                      <Photo hue={product.hue + 6} ratio="1/1" label={`Foto ${shot}`} />
                    </Reveal>
                  ))}
                </>
              )}
            </div>

            <div className="lg:sticky lg:self-start" style={{ top: "calc(var(--nav-h) + 30px)" }}>
              <Reveal>
                <p className="eyebrow m-0 opacity-50">{product.role}</p>
                <h1 className="display mb-1 mt-3 text-[clamp(30px,4.2vw,60px)]">{product.name}</h1>
                <p className="latin m-0 mt-1.5 text-[19px] opacity-70">{product.latin}</p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-4 text-[20px] font-semibold tabular-nums">{euro(product.price)}</p>
                <p className="my-5 max-w-[42ch] leading-relaxed opacity-85">{product.desc}</p>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center overflow-hidden rounded-full border border-ink/30">
                    <button
                      className="px-4 py-3 text-[15px] transition-[background-color,transform] duration-200 hover:bg-ink/5 active:scale-90"
                      aria-label="Eén minder"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                    >
                      –
                    </button>
                    <span className="min-w-[34px] text-center font-semibold tabular-nums">{qty}</span>
                    <button
                      className="px-4 py-3 text-[15px] transition-[background-color,transform] duration-200 hover:bg-ink/5 active:scale-90"
                      aria-label="Eén meer"
                      onClick={() => setQty((q) => q + 1)}
                    >
                      +
                    </button>
                  </div>
                  <Button variant="ink" onClick={() => add(product.slug, qty)}>
                    In de tas
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-3 p-0 border-t border-ink/15 pt-5 sm:grid-cols-3">
                  {[
                    {
                      text: "Gratis vanaf € 45",
                      icon: (
                        <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                      ),
                    },
                    {
                      text: "30 dagen bedenktijd",
                      icon: <path d="M4 12a8 8 0 1 0 3-6.3M4 4v4h4 M12 8v4l3 2" />,
                    },
                    {
                      text: "Nooit getest op dieren",
                      icon: <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" />,
                    },
                  ].map((item) => (
                    <li
                      key={item.text}
                      className="group flex items-center gap-2.5 text-[12px] opacity-70 transition-opacity duration-300 ease-folea hover:opacity-100"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0 transition-colors duration-300 ease-folea group-hover:text-flush-deep"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </svg>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="acc mt-8 border-t border-ink/20">
                  <details open className="border-b border-ink/20">
                    <summary>Zo gebruik je het</summary>
                    <div className="acc-panel">
                      <div className="max-w-[52ch] pb-5 text-[15px] leading-relaxed opacity-85">
                        {product.use}
                      </div>
                    </div>
                  </details>
                  <details className="border-b border-ink/20">
                    <summary>Volledige ingrediëntenlijst</summary>
                    <div className="acc-panel">
                      <div className="max-w-[52ch] pb-5 text-[15px] leading-relaxed opacity-85">
                        {product.ing}
                      </div>
                    </div>
                  </details>
                  <details className="border-b border-ink/20">
                    <summary>Verzending &amp; retour</summary>
                    <div className="acc-panel">
                      <div className="max-w-[52ch] pb-5 text-[15px] leading-relaxed opacity-85">
                        Verzending binnen Nederland en België duurt één werkdag. Niets voor jou?
                        Stuur het binnen 30 dagen terug ook als de pot open is. Dat is het hele
                        punt van proberen.
                      </div>
                    </div>
                  </details>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
