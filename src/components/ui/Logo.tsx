interface LogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export function Logo({ size = 36, className = "", glow = true }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      focusable="false"
      className={className}
      style={glow ? { filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.35))" } : undefined}
    >
      <g stroke="currentColor" strokeWidth={6.5} strokeLinejoin="round">
        <ellipse cx="50" cy="50" rx="40" ry="22" transform="rotate(45 50 50)" />
        <ellipse cx="50" cy="50" rx="40" ry="22" transform="rotate(-45 50 50)" />
      </g>
      <circle cx="50" cy="50" r="13.5" fill="currentColor" />
    </svg>
  );
}
