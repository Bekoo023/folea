import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Photo } from "./Photo";
import { Button } from "./Button";
import { useCart } from "@/lib/cart";
import { euro } from "@/lib/format";
import { FREE_SHIPPING, PRODUCT } from "@/lib/products";

export function CartDrawer() {
  const { open, setOpen, detailed, subtotal, setQty, remove, checkout, busy } = useCart();
  const left = Math.max(0, FREE_SHIPPING - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-90 bg-ink/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-95 flex w-full max-w-[440px] flex-col bg-papyrus-tint text-ink"
            initial={{ x: "101%" }}
            animate={{ x: 0 }}
            exit={{ x: "101%" }}
            transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
            role="dialog"
            aria-label="Je tas"
          >
            <div className="flex items-center justify-between border-b border-ink/15 px-6 py-5">
              <h2 className="m-0 text-[13px] font-bold uppercase tracking-[0.2em]">Je tas</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-[12px] uppercase tracking-[0.14em]"
              >
                Sluiten
              </button>
            </div>

            <div className="border-b border-ink/10 px-6 py-3.5 text-[12px]">
              {left > 0 ? `Nog ${euro(left)} tot gratis verzending` : "Gratis verzending geregeld"}
              <div className="relative mt-2 h-0.5 overflow-hidden bg-ink/15">
                <i
                  className="absolute inset-y-0 left-0 block bg-flush transition-[width] duration-500 ease-folea"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {!detailed.length ? (
                <p className="py-16 text-center text-[14px] opacity-60">
                  Je tas is nog leeg.
                  <br />
                  <Link
                    to={`/product/${PRODUCT.slug}`}
                    onClick={() => setOpen(false)}
                    className="underline"
                  >
                    Bekijk {PRODUCT.name}
                  </Link>
                </p>
              ) : (
                detailed.map(({ product, qty }) => (
                  <div
                    key={product.slug}
                    className="grid grid-cols-[70px_1fr_auto] items-start gap-3.5 border-b border-ink/10 py-4.5"
                  >
                    <Photo hue={product.hue} ratio="4/5" />
                    <div>
                      <h4 className="m-0 text-[14px] font-semibold">{product.name}</h4>
                      <div className="mb-2.5 text-[11.5px] opacity-60">{product.role}</div>
                      <div className="flex items-center gap-3">
                        <div className="inline-flex items-center overflow-hidden rounded-full border border-ink/30">
                          <button
                            className="px-2.5 py-1.5 text-[13px] transition-[background-color,transform] duration-150 ease-out hover:bg-ink/5 active:scale-95"
                            aria-label="Eén minder"
                            onClick={() => setQty(product.slug, qty - 1)}
                          >
                            –
                          </button>
                          <span className="min-w-[26px] text-center text-[13px] font-semibold tabular-nums">
                            {qty}
                          </span>
                          <button
                            className="px-2.5 py-1.5 text-[13px] transition-[background-color,transform] duration-150 ease-out hover:bg-ink/5 active:scale-95"
                            aria-label="Eén meer"
                            onClick={() => setQty(product.slug, qty + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="text-[11px] uppercase tracking-[0.1em] underline opacity-55 transition-opacity duration-200 hover:opacity-90"
                          onClick={() => remove(product.slug)}
                        >
                          Verwijderen
                        </button>
                      </div>
                    </div>
                    <strong className="text-[14px] tabular-nums">
                      {euro(product.price * qty)}
                    </strong>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-ink/15 px-6 pb-6 pt-5">
              <div className="mb-1.5 flex justify-between text-[15px] font-semibold">
                <span>Subtotaal</span>
                <span className="tabular-nums">{euro(subtotal)}</span>
              </div>
              <p className="mb-4 text-[11.5px] opacity-60">
                Verzendkosten worden bij het afrekenen berekend.
              </p>
              <Button
                variant="ink"
                className="w-full justify-center"
                disabled={!detailed.length || busy}
                onClick={checkout}
              >
                {busy ? "Moment…" : "Afrekenen"}
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
