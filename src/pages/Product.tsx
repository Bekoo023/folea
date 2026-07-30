import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { bySlug } from "@/lib/products";
import { euro } from "@/lib/format";
import { useCart } from "@/lib/cart";

export default function Product() {
  const { slug } = useParams();
  const product = bySlug(slug);
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  useEffect(() => setQty(1), [slug]);

  if (!product) return <Navigate to="/" replace />;

  return (
    <>
      <section className="section bg-papyrus text-ink" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div
            className="grid gap-[clamp(26px,3vw,60px)] lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
            style={{ paddingTop: "calc(var(--nav-h) + clamp(28px,4vw,60px))" }}
          >
            <div className="grid gap-2.5 sm:grid-cols-2">
              {product.images && product.images.length > 0 ? (
                <>
                  <Reveal variant="clip" className="sm:col-span-2">
                    <Photo src={product.images[0]} alt={product.name} ratio="5/4" />
                  </Reveal>
                  {product.images.slice(1).map((src, i) => (
                    <Reveal key={src} delay={i * 0.07}>
                      <Photo src={src} alt={product.name} ratio="1/1" />
                    </Reveal>
                  ))}
                </>
              ) : (
                <>
                  <Reveal variant="clip" className="sm:col-span-2">
                    <Photo hue={product.hue} ratio="5/4" label={`Foto ${product.photos[0]}`} />
                  </Reveal>
                  {product.photos.slice(1).map((shot, i) => (
                    <Reveal key={shot} delay={i * 0.07}>
                      <Photo hue={product.hue + 6} ratio="1/1" label={`Foto ${shot}`} />
                    </Reveal>
                  ))}
                </>
              )}
            </div>

            <div className="lg:sticky lg:self-start" style={{ top: "calc(var(--nav-h) + 30px)" }}>
              <p className="eyebrow m-0 opacity-50">{product.role}</p>
              <h1 className="display mb-1 mt-3 text-[clamp(30px,4.2vw,60px)]">{product.name}</h1>
              <p className="latin m-0 mt-1.5 text-[19px] opacity-70">{product.latin}</p>
              <p className="mt-4 text-[20px] font-semibold tabular-nums">{euro(product.price)}</p>
              <p className="my-5 max-w-[42ch] leading-relaxed opacity-85">{product.desc}</p>

              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center overflow-hidden rounded-full border border-ink/30">
                  <button
                    className="px-4 py-3 text-[15px]"
                    aria-label="Eén minder"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    –
                  </button>
                  <span className="min-w-[34px] text-center font-semibold tabular-nums">{qty}</span>
                  <button
                    className="px-4 py-3 text-[15px]"
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

              <p className="mt-4 text-[12px] opacity-60">
                Gratis verzending vanaf € 45 · voor 16:00 besteld, morgen in huis
              </p>

              <div className="acc mt-8 border-t border-ink/20">
                <details open className="border-b border-ink/20">
                  <summary>Zo gebruik je het</summary>
                  <div className="max-w-[52ch] pb-5 text-[15px] leading-relaxed opacity-85">
                    {product.use}
                  </div>
                </details>
                <details className="border-b border-ink/20">
                  <summary>Volledige ingrediëntenlijst</summary>
                  <div className="max-w-[52ch] pb-5 text-[15px] leading-relaxed opacity-85">
                    {product.ing}
                  </div>
                </details>
                <details className="border-b border-ink/20">
                  <summary>Verzending &amp; retour</summary>
                  <div className="max-w-[52ch] pb-5 text-[15px] leading-relaxed opacity-85">
                    Verzending binnen Nederland en België duurt één werkdag. Niets voor jou? Stuur
                    het binnen 30 dagen terug ook als de pot open is. Dat is het hele punt van
                    proberen.
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
