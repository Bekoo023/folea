import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "up" | "clip";

interface Props {
  children: ReactNode;
  delay?: number;
  variant?: Variant;
  className?: string;
}

// amount laag houden: bij snel scrollen kan een IntersectionObserver de piek
// van een strenger percentage missen, waardoor de reveal soms nooit triggert.
const viewport = { once: true, amount: 0.01 } as const;

export function Reveal({ children, delay = 0, variant = "up", className }: Props) {
  if (variant === "clip") {
    // De geobserveerde laag mag zelf nooit clip-path dragen — een element dat
    // start als clipPath: inset(0 0 100% 0) wordt door Chrome soms nooit als
    // "in beeld" gezien zodra het van buiten het scherm inscrollt, waardoor de
    // whileInView-animatie nooit triggert. Daarom clippen we een child i.p.v.
    // de geobserveerde node zelf.
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div
          variants={{
            hidden: { clipPath: "inset(0 0 100% 0)" },
            visible: { clipPath: "inset(0 0 0% 0)" },
          }}
          transition={{ duration: 1.1, delay, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.9, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
