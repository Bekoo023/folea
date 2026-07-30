import { useState, type CSSProperties } from "react";

interface Props {
  /** kleurtoon van de placeholder — hoort bij het product */
  hue?: number;
  /** aspect ratio, bv "4/5" of "16/11" */
  ratio?: string;
  /** shotlist-label: wat hier gefotografeerd moet worden */
  label?: string;
  dark?: boolean;
  className?: string;
  /** zodra de foto er is: geef src mee en de placeholder verdwijnt */
  src?: string;
  alt?: string;
}

/**
 * Tijdelijke fotoplaatshouder. Elk exemplaar draagt zijn eigen shotlist-label,
 * dus de fotograaf weet precies wat waar komt. Vervang met `src`.
 */
export function Photo({
  hue = 38,
  ratio = "4/5",
  label,
  dark,
  className = "",
  src,
  alt = "",
}: Props) {
  const [loaded, setLoaded] = useState(false);

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-[opacity,transform] duration-700 ease-folea ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
        } ${className}`}
        style={{ aspectRatio: ratio }}
      />
    );
  }
  return (
    <div
      className={`ph ${dark ? "ph--dark" : ""} ${className}`}
      style={{ "--h": hue, "--r": ratio } as CSSProperties}
      role="img"
      aria-label={label ?? "Productfoto volgt"}
    >
      {label && <span className="ph__tag">{label}</span>}
    </div>
  );
}
