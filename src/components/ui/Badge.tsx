import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  color?: string;
  borderColor?: string;
  className?: string;
}

export function Badge({ children, color = "#FF6B1A", borderColor, className = "" }: BadgeProps) {
  const border = borderColor ?? color;
  return (
    <span
      className={`inline-flex items-center font-display tracking-hud uppercase text-[10px] px-2.5 py-1 border ${className}`}
      style={{ color, borderColor: border, backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      {children}
    </span>
  );
}
