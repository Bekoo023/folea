import { useEffect } from "react";
import { ButtonLink } from "@/components/Button";
import { PRODUCT } from "@/lib/products";

/** Stripe stuurt de klant hierheen na een geslaagde betaling. */
export default function Bedankt() {
  useEffect(() => {
    localStorage.removeItem("folea.cart.v1");
  }, []);

  return (
    <section className="section flex min-h-[80svh] items-center bg-papyrus text-ink">
      <div className="wrap" style={{ paddingTop: "var(--nav-h)" }}>
        <p className="eyebrow m-0 mb-5 opacity-50">Bestelling geplaatst</p>
        <h1 className="display max-w-[14ch] text-[clamp(38px,7vw,110px)]">
          Dank je.
          <br />
          Hij gaat
          <br />
          morgen weg.
        </h1>
        <p className="mt-6 max-w-[42ch] text-[16px] opacity-75">
          Je krijgt binnen een paar minuten een bevestiging per mail, met het track &amp;
          trace-nummer zodra het pakket is opgehaald.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink to="/gebruik">Lees hoe je begint</ButtonLink>
          <ButtonLink to={`/product/${PRODUCT.slug}`} variant="ghost">
            Terug naar {PRODUCT.name}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
