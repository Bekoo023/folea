import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type Tone = "ink" | "flush" | "ghost";

const tone: Record<Tone, string> = {
  ink: "btn btn--ink",
  flush: "btn btn--flush",
  ghost: "btn",
};

export function ButtonLink({
  to,
  children,
  variant = "ink",
  className = "",
}: {
  to: string;
  children: ReactNode;
  variant?: Tone;
  className?: string;
}) {
  if (to.startsWith("mailto:") || to.startsWith("http")) {
    return (
      <a href={to} className={`${tone[variant]} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={`${tone[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "ink",
  className = "",
  ...rest
}: { children: ReactNode; variant?: Tone; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${tone[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
