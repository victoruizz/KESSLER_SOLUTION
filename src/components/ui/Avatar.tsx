import { initialsFromName } from "../../lib/image";

interface AvatarProps {
  name: string;
  src?: string | null;
  size?: number;
  className?: string;
  glow?: boolean;
}

export function Avatar({ name, src, size = 40, className = "", glow = false }: AvatarProps) {
  const fontSize = Math.max(11, Math.round(size * 0.36));
  return (
    <span
      className={`relative inline-flex items-center justify-center overflow-hidden border border-mars-orange/60 bg-space-elevated text-mars-orange select-none ${
        glow ? "orange-glow" : ""
      } ${className}`}
      style={{ width: size, height: size, borderRadius: 4 }}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" draggable={false} />
      ) : (
        <span className="font-display font-bold tracking-[0.08em]" style={{ fontSize }}>
          {initialsFromName(name)}
        </span>
      )}
    </span>
  );
}
