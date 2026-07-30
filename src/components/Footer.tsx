import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./Button";
import { PRODUCT } from "@/lib/products";

const COLUMNS: { title: string; links: [string, string][] }[] = [
  {
    title: "Winkel",
    links: [
      [PRODUCT.name, `/product/${PRODUCT.slug}`],
      ["Hoe te gebruiken", "/gebruik"],
    ],
  },
  {
    title: "Folea",
    links: [
      ["Ons verhaal", "/verhaal"],
      ["Ingrediënten", "/verhaal"],
    ],
  },
  {
    title: "Hulp",
    links: [
      ["Verzending & retour", `/product/${PRODUCT.slug}`],
      ["Contact", "mailto:hallo@foleahair.nl"],
    ],
  },
];

export function Footer() {
  const [mail, setMail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = () => {
    if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(mail.trim())) {
      setMsg("Vul een geldig e-mailadres in.");
      return;
    }
    // koppel hier je mailinglijst (Resend audiences, Loops, MailerLite…)
    setMsg("Gelukt! Je krijgt de eerste brief volgende maand.");
    setMail("");
  };

  return (
    <footer
      className="overflow-hidden bg-ink text-papyrus"
      style={{ padding: "clamp(56px,7vw,110px) var(--pad) 0" }}
    >
      <div className="wrap">
        <div className="grid gap-[clamp(30px,4vw,60px)] lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow m-0 mb-4 opacity-55">Brief</p>
            <h3 className="display mb-4 max-w-[16ch] text-[clamp(24px,3.2vw,44px)]">
              Eén mail per maand. Over haar, niet over korting.
            </h3>
            <p className="m-0 max-w-[44ch] text-[15px] opacity-70">
              Wat we testen, wat we afkeuren, en wanneer een nieuwe batch klaar is.
            </p>
            <div className="mt-5 flex max-w-[460px] flex-wrap gap-2.5">
              <input
                type="email"
                className="field"
                placeholder="je@mail.nl"
                aria-label="E-mailadres"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
              />
              <Button variant="flush" onClick={submit}>
                Inschrijven
              </Button>
            </div>
            <div className="relative m-0 mt-3 min-h-[18px] text-[12px] opacity-60">
              <AnimatePresence mode="wait">
                {msg && (
                  <motion.p
                    key={msg}
                    className="m-0"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                  >
                    {msg}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="m-0 mb-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] opacity-55">
                  {col.title}
                </h4>
                <ul className="m-0 list-none p-0">
                  {col.links.map(([label, to]) => (
                    <li key={label} className="mb-2.5">
                      {to.startsWith("mailto:") ? (
                        <a
                          href={to}
                          className="text-[14px] opacity-85 transition-colors hover:text-flush hover:opacity-100"
                        >
                          {label}
                        </a>
                      ) : (
                        <Link
                          to={to}
                          className="text-[14px] opacity-85 transition-colors hover:text-flush hover:opacity-100"
                        >
                          {label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          className="border-t border-papyrus/20 pt-6"
          style={{ marginTop: "clamp(40px,6vw,80px)" }}
        >
          <h2 className="wordmark translate-y-[14%] text-papyrus opacity-90">Folea</h2>
        </div>

        <div className="flex flex-wrap justify-between gap-4 py-5 pb-6 text-[11px] uppercase tracking-[0.1em] opacity-50">
          <span>© 2026 Folea</span>
          <span>KVK 00000000 · BTW NL000000000B01</span>
          <span>Privacy · Voorwaarden</span>
        </div>
      </div>
    </footer>
  );
}
