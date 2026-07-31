import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { PRODUCT } from "@/lib/products";

const LINKS = [
  { to: `/product/${PRODUCT.slug}`, label: "Shop" },
  { to: "/gebruik", label: "Gebruik" },
  { to: "/verhaal", label: "Verhaal" },
];

export function Nav({ overHero }: { overHero: boolean }) {
  const { count, setOpen } = useCart();
  const { y, dir } = useScrollDirection();
  const [menu, setMenu] = useState(false);

  const solid = !overHero || y > window.innerHeight * 0.45;
  const hidden = dir === 1 && y > 320 && !menu;

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-80 flex items-center gap-5 border-b transition-[transform,background-color,color,border-color,backdrop-filter] duration-500",
        solid
          ? "border-ink/15 bg-papyrus/90 text-ink backdrop-blur-md"
          : "border-transparent text-paper",
        hidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
      style={{ height: "var(--nav-h)", paddingInline: "var(--pad)", zIndex: 80 }}
    >
      <Link
        to="/"
        className="pr-2 font-display text-[19px] font-extrabold uppercase tracking-[0.34em]"
        style={{ fontVariationSettings: '"wdth" 118, "wght" 800' }}
      >
        Folea
      </Link>

      <button
        className="-mr-3 ml-auto flex items-center px-3 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] md:hidden"
        aria-expanded={menu}
        onClick={() => setMenu((m) => !m)}
      >
        {menu ? "Sluiten" : "Menu"}
      </button>

      <nav className="hidden md:ml-auto md:flex md:gap-[26px]">
        {LINKS.map((l) => (
          <NavLink key={l.to} to={l.to} className="navlink">
            {l.label}
          </NavLink>
        ))}
      </nav>

      <AnimatePresence>
        {menu && (
          <motion.nav
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
            className="fixed inset-x-0 top-[var(--nav-h)] flex flex-col bg-papyrus text-ink md:hidden"
            style={{ padding: "10px var(--pad) 26px" }}
          >
            {LINKS.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <NavLink
                  to={l.to}
                  onClick={() => setMenu(false)}
                  className="navlink flex min-h-[56px] items-center border-b border-ink/10 py-4 text-[18px]"
                >
                  {l.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <button
        className="ml-6 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em]"
        onClick={() => setOpen(true)}
      >
        Tas
        <span
          className={[
            "grid h-[19px] w-[19px] place-items-center rounded-full bg-flush text-[10px] font-bold text-ink transition-transform duration-400",
            count > 0 ? "scale-100" : "scale-0",
          ].join(" ")}
        >
          {count}
        </span>
      </button>
    </header>
  );
}
