interface OrbitalRingsProps {
  size?: number;
  className?: string;
}

export function OrbitalRings({ size = 320, className = "" }: OrbitalRingsProps) {
  const cx = size / 2;
  const cy = size / 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden
    >
      <defs>
        <radialGradient id="planet-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6B1A" stopOpacity={0.7} />
          <stop offset="60%" stopColor="#B84A0F" stopOpacity={0.15} />
          <stop offset="100%" stopColor="#000000" stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={size * 0.46} ry={size * 0.16} stroke="#1F1F1F" fill="none" />
      <ellipse cx={cx} cy={cy} rx={size * 0.36} ry={size * 0.12} stroke="#1F1F1F" fill="none" />
      <ellipse cx={cx} cy={cy} rx={size * 0.26} ry={size * 0.08} stroke="#FF6B1A" strokeOpacity={0.4} fill="none" />
      <circle cx={cx} cy={cy} r={size * 0.08} fill="url(#planet-glow)" />
      <circle cx={cx} cy={cy} r={size * 0.05} fill="#FF6B1A" fillOpacity={0.5} />
    </svg>
  );
}
