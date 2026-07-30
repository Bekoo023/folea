import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, bySlug, type Product } from "./products";

export interface CartLine {
  slug: string;
  qty: number;
}

interface CartValue {
  lines: CartLine[];
  detailed: { product: Product; qty: number }[];
  count: number;
  subtotal: number;
  open: boolean;
  toast: string | null;
  busy: boolean;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  setOpen: (open: boolean) => void;
  checkout: () => Promise<void>;
}

const CartContext = createContext<CartValue | null>(null);
const KEY = "folea.cart.v1";

function read(): CartLine[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    // regels van verwijderde producten stilletjes opruimen
    return parsed.filter((l) => PRODUCTS.some((p) => p.slug === l.slug) && l.qty > 0);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(read);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const add = useCallback((slug: string, qty = 1) => {
    const product = bySlug(slug);
    if (!product) return;
    setLines((prev) => {
      const hit = prev.find((l) => l.slug === slug);
      return hit
        ? prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l))
        : [...prev, { slug, qty }];
    });
    setToast(`${product.name} toegevoegd`);
    setOpen(true);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty < 1
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const detailed = useMemo(
    () =>
      lines
        .map((l) => ({ product: bySlug(l.slug)!, qty: l.qty }))
        .filter((l) => Boolean(l.product)),
    [lines],
  );

  const subtotal = useMemo(
    () => detailed.reduce((sum, l) => sum + l.product.price * l.qty, 0),
    [detailed],
  );

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);

  const checkout = useCallback(async () => {
    if (!lines.length || busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      if (!res.ok) throw new Error(await res.text());
      const { url } = (await res.json()) as { url: string };
      window.location.href = url;
    } catch (err) {
      console.error(err);
      setToast("Afrekenen lukt nu niet. Probeer het zo nog eens.");
      setBusy(false);
    }
  }, [lines, busy]);

  const value: CartValue = {
    lines,
    detailed,
    count,
    subtotal,
    open,
    toast,
    busy,
    add,
    setQty,
    remove,
    setOpen,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart moet binnen <CartProvider> gebruikt worden");
  return ctx;
}
