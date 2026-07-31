import { useState, type FormEvent } from "react";
import { Button } from "@/components/Button";

// Tijdelijk slot op de homepage terwijl de site nog in review is bij de koper.
// Puur een bezoekersdrempel, geen echte beveiliging (het wachtwoord staat
// gewoon in de client-bundle) — verwijder dit component + de check in App.tsx
// zodra de homepage is goedgekeurd.
const PASSWORD = "ZOMER2026";
const STORAGE_KEY = "folea:home-unlocked";

export function isHomeUnlocked() {
  return typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY) === "1";
}

export function HomeLock({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (value === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      onUnlock();
    } else {
      setError(true);
    }
  }

  return (
    <div className="grid min-h-[100svh] place-items-center bg-papyrus px-[var(--pad)] text-ink">
      <form onSubmit={handleSubmit} className="w-full max-w-[360px] text-center">
        <p
          className="font-display text-[19px] font-extrabold uppercase tracking-[0.34em]"
          style={{ fontVariationSettings: '"wdth" 118, "wght" 800' }}
        >
          Folea
        </p>

        <h1 className="display mt-7 text-[clamp(24px,4vw,32px)]">Nog in review</h1>
        <p className="mt-3 text-[14px] leading-relaxed opacity-70">
          Deze preview is nog niet openbaar. Vul het wachtwoord in om verder te gaan.
        </p>

        <input
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="Wachtwoord"
          autoFocus
          className="field field--ink mt-8 w-full text-center"
        />
        {error && (
          <p className="mt-2 text-[12px] font-semibold text-flush-deep">
            Onjuist wachtwoord, probeer het opnieuw.
          </p>
        )}

        <Button type="submit" variant="ink" className="mt-6 w-full justify-center">
          Bekijken
        </Button>
      </form>
    </div>
  );
}
