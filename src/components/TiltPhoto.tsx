import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";
import { Photo } from "./Photo";

interface Props {
  src?: string;
  alt?: string;
  hue?: number;
  label?: string;
  ratio?: string;
  className?: string;
}

/** Foto met zachte schaduw, afgeronde hoeken en een subtiele cursor-tilt. */
export function TiltPhoto({ src, alt, hue, label, ratio = "4/5", className = "" }: Props) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 260, damping: 22, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), spring);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div
      className={`overflow-hidden rounded-[28px] shadow-[0_30px_70px_-30px_rgba(16,14,12,0.4)] ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 900 }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.035 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <Photo src={src} alt={alt} hue={hue} label={label} ratio={ratio} />
      </motion.div>
    </div>
  );
}
