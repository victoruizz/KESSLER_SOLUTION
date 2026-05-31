import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const base =
    "font-display tracking-hud uppercase inline-flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border";
  const sizes: Record<Size, string> = {
    sm: "text-[11px] px-3 py-2",
    md: "text-xs px-5 py-3",
    lg: "text-sm px-6 py-3.5",
  };
  const variants: Record<Variant, string> = {
    primary:
      "bg-mars-orange text-space-black border-mars-orange hover:bg-mars-amber hover:border-mars-amber",
    secondary:
      "bg-transparent text-text-primary border-space-border hover:border-mars-orange hover:text-mars-orange",
    ghost:
      "bg-transparent text-text-secondary border-transparent hover:text-mars-orange",
    danger:
      "bg-transparent text-risk-critical border-risk-critical hover:bg-risk-critical hover:text-space-black",
  };

  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
