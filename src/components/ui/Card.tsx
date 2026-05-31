import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  hoverable?: boolean;
  children: ReactNode;
}

export function Card({
  elevated = false,
  hoverable = false,
  className = "",
  children,
  ...rest
}: CardProps) {
  const base = "border border-space-border p-6";
  const surface = elevated ? "bg-space-elevated" : "bg-space-surface";
  const hover = hoverable ? "transition-colors duration-200 hover:border-mars-orange/70" : "";

  return (
    <div className={`${base} ${surface} ${hover} ${className}`} {...rest}>
      {children}
    </div>
  );
}
