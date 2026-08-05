import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
import Privacybeleid from "@/pages/Privacybeleid";
import Voorwaarden from "@/pages/Voorwaarden";

const OTHER_ROUTES = [
  /^\/product\//,
  /^\/gebruik$/,
  /^\/verhaal$/,
  /^\/bedankt$/,
  /^\/privacybeleid$/,
  /^\/voorwaarden$/,
];

// Alles wat niet één van de bekende andere pagina's is, valt terug op <Home /> —
// dus telt voor het slot mee als "homepage".
function isHomeRoute(pathname: string) {
  return !OTHER_ROUTES.some((re) => re.test(pathname));
}

export default function App() {
  useScrollTop();
  const location = useLocation();
  const { pathname } = location;
  const [unlocked, setUnlocked] = useState(isHomeUnlocked);
  const reduceMotion = useReducedMotion();

  if (isHomeRoute(pathname) && !unlocked) {
    return <HomeLock onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <>
      <ScrollProgress />
      <Nav overHero={pathname === "/"} />
      <main>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
            transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/product/:slug" element={<Product />} />
              <Route path="/gebruik" element={<Gebruik />} />
              <Route path="/verhaal" element={<Verhaal />} />
              <Route path="/bedankt" element={<Bedankt />} />
              <Route path="/privacybeleid" element={<Privacybeleid />} />
              <Route path="/voorwaarden" element={<Voorwaarden />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
    </>
  );
}
