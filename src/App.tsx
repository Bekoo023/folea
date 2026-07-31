import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Toast } from "@/components/Toast";
import { ScrollProgress } from "@/components/ScrollProgress";
import { HomeLock, isHomeUnlocked } from "@/components/HomeLock";
import { useScrollTop } from "@/hooks/useScrollTop";
import Home from "@/pages/Home";
import Product from "@/pages/Product";
import Gebruik from "@/pages/Gebruik";
import Verhaal from "@/pages/Verhaal";
import Bedankt from "@/pages/Bedankt";

const OTHER_ROUTES = [/^\/product\//, /^\/gebruik$/, /^\/verhaal$/, /^\/bedankt$/];

// Alles wat niet één van de bekende andere pagina's is, valt terug op <Home /> —
// dus telt voor het slot mee als "homepage".
function isHomeRoute(pathname: string) {
  return !OTHER_ROUTES.some((re) => re.test(pathname));
}

// Tijdelijk, samen met het slot: alleen de homepage wordt gepresenteerd, dus
// een klik op een link naar een andere pagina (Shop/Gebruik/Verhaal, CTA's,
// footer-links, ...) doet gewoon niks. Blokkeert alleen interne route-links —
// mailto/tel/http(s)-links en anchors (#...) blijven gewoon werken.
function blockOtherPageLinks(e: React.MouseEvent) {
  const anchor = (e.target as HTMLElement).closest("a");
  if (!anchor) return;
  const href = anchor.getAttribute("href");
  if (!href || href === "/" || href.startsWith("#")) return;
  if (/^([a-z]+:|\/\/)/i.test(href)) return; // mailto:, tel:, http(s):, //cdn...
  e.preventDefault();
  e.stopPropagation();
}

export default function App() {
  useScrollTop();
  const { pathname } = useLocation();
  const [unlocked, setUnlocked] = useState(isHomeUnlocked);

  if (isHomeRoute(pathname) && !unlocked) {
    return <HomeLock onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div onClickCapture={blockOtherPageLinks}>
      <ScrollProgress />
      <Nav overHero={pathname === "/"} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/gebruik" element={<Gebruik />} />
          <Route path="/verhaal" element={<Verhaal />} />
          <Route path="/bedankt" element={<Bedankt />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
    </div>
  );
}
