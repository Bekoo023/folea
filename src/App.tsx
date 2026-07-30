import { Route, Routes, useLocation } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Toast } from "@/components/Toast";
import { ScrollProgress } from "@/components/ScrollProgress";
import { useScrollTop } from "@/hooks/useScrollTop";
import Home from "@/pages/Home";
import Product from "@/pages/Product";
import Gebruik from "@/pages/Gebruik";
import Verhaal from "@/pages/Verhaal";
import Bedankt from "@/pages/Bedankt";

export default function App() {
  useScrollTop();
  const { pathname } = useLocation();

  return (
    <>
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
    </>
  );
}
