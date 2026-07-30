import { useEffect } from "react";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/Button";
import { PRODUCT } from "@/lib/products";

const item = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

/** Stripe stuurt de klant hierheen na een geslaagde betaling. */
export default function Bedankt() {
  useEffect(() => {
    localStorage.removeItem("folea.cart.v1");
  }, []);

  return (
    <section className="section flex min-h-[80svh] items-center bg-papyrus text-ink">
      <div className="wrap" style={{ paddingTop: "var(--nav-h)" }}>
        <motion.p
          className="eyebrow m-0 mb-5 opacity-50"
          initial={item.initial}
          animate={item.animate}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Bestelling geplaatst
        </motion.p>
        <motion.h1
          className="display max-w-[14ch] text-[clamp(38px,7vw,110px)]"
          initial={item.initial}
          animate={item.animate}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Dank je.
          <br />
          Hij gaat
          <br />
          morgen weg.
        </motion.h1>
        <motion.p
          className="mt-6 max-w-[42ch] text-[16px] opacity-75"
          initial={item.initial}
          animate={item.animate}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Je krijgt binnen een paar minuten een bevestiging per mail, met het track &amp;
          trace-nummer zodra het pakket is opgehaald.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={item.initial}
          animate={item.animate}
          transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <ButtonLink to="/gebruik">Lees hoe je begint</ButtonLink>
          <ButtonLink to={`/product/${PRODUCT.slug}`} variant="ghost">
            Terug naar {PRODUCT.name}
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
