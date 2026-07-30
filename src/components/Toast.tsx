import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart";

export function Toast() {
  const { toast } = useCart();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          className="fixed bottom-6 left-1/2 z-120 rounded-full bg-ink px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-papyrus"
          initial={{ y: 80, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: 80, x: "-50%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
          role="status"
        >
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
