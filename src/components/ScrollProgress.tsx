import { motion, useScroll, useSpring } from "framer-motion";

/** Dun voortgangslijntje bovenaan de pagina, gekoppeld aan scrollpositie. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 280, damping: 32, mass: 0.3 });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-90 h-[2px] origin-left bg-flush"
      style={{ scaleX }}
    />
  );
}
