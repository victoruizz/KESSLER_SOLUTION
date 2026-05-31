import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Debris } from "../../types";
import { bandRadius, debrisAngle, riskColor } from "../../lib/orbital";

interface OrbitMapProps {
  debris: Debris[];
}

export function OrbitMap({ debris }: OrbitMapProps) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<Debris | null>(null);
  const size = 620;
  const cx = size / 2;
  const cy = size / 2;

  const points = useMemo(() => {
    return debris.map((item) => {
      const radius = bandRadius(item.orbitBand);
      const angle = (debrisAngle(item.id) * Math.PI) / 180;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle) * 0.6;
      return { debris: item, x, y };
    });
  }, [debris, cx, cy]);

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-auto"
        role="img"
        aria-label="Mapa orbital de detritos"
      >
        <defs>
          <radialGradient id="earth-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFB347" stopOpacity={0.9} />
            <stop offset="55%" stopColor="#FF6B1A" stopOpacity={0.55} />
            <stop offset="100%" stopColor="#000000" stopOpacity={0} />
          </radialGradient>
          <radialGradient id="earth-atmos" cx="50%" cy="50%" r="55%">
            <stop offset="60%" stopColor="#FF6B1A" stopOpacity={0} />
            <stop offset="80%" stopColor="#FF6B1A" stopOpacity={0.18} />
            <stop offset="100%" stopColor="#FF6B1A" stopOpacity={0} />
          </radialGradient>
        </defs>

        <g opacity={0.5}>
          <ellipse cx={cx} cy={cy} rx={140} ry={84} fill="none" stroke="#FF6B1A" strokeOpacity={0.35} strokeDasharray="3 4" />
          <ellipse cx={cx} cy={cy} rx={200} ry={120} fill="none" stroke="#FACC15" strokeOpacity={0.22} strokeDasharray="3 4" />
          <ellipse cx={cx} cy={cy} rx={260} ry={156} fill="none" stroke="#FB923C" strokeOpacity={0.18} strokeDasharray="3 4" />
        </g>

        <text x={cx + 140 + 8} y={cy + 4} fill="#6E6E6E" fontFamily="Orbitron" fontSize={10} letterSpacing={3}>LEO</text>
        <text x={cx + 200 + 8} y={cy + 4} fill="#6E6E6E" fontFamily="Orbitron" fontSize={10} letterSpacing={3}>MEO</text>
        <text x={cx + 260 + 8} y={cy + 4} fill="#6E6E6E" fontFamily="Orbitron" fontSize={10} letterSpacing={3}>GEO</text>

        <circle cx={cx} cy={cy} r={120} fill="url(#earth-atmos)" />
        <circle cx={cx} cy={cy} r={70} fill="url(#earth-core)" />
        <circle cx={cx} cy={cy} r={42} fill="#000000" stroke="#FF6B1A" strokeOpacity={0.6} />
        <text x={cx} y={cy + 5} textAnchor="middle" fill="#B0B0B0" fontFamily="Orbitron" fontSize={12} letterSpacing={4}>TERRA</text>

        {points.map(({ debris: item, x, y }) => {
          const color = riskColor(item.riskLevel);
          const isHovered = hovered?.id === item.id;
          return (
            <g
              key={item.id}
              onMouseEnter={() => setHovered(item)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate(`/detrito/${item.id}`)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={x}
                cy={y}
                r={isHovered ? 14 : 9}
                fill={color}
                opacity={isHovered ? 0.25 : 0.15}
              />
              <circle cx={x} cy={y} r={isHovered ? 6 : 4} fill={color} />
              <circle cx={x} cy={y} r={isHovered ? 6 : 4} fill="none" stroke="#000000" strokeWidth={1} />
            </g>
          );
        })}
      </svg>

      {hovered && (
        <div className="pointer-events-none absolute top-4 right-4 surface-panel p-4 min-w-[220px] max-w-[260px]">
          <div className="hud-label" style={{ color: riskColor(hovered.riskLevel) }}>{hovered.id}</div>
          <div className="font-display text-sm text-text-primary mt-1 leading-tight">{hovered.name}</div>
          <div className="text-text-tertiary text-xs mt-2">{hovered.countryOfOrigin} — {hovered.launchYear}</div>
          <div className="text-text-secondary text-xs mt-1">{hovered.altitudeKm.toLocaleString("pt-BR")} km — {hovered.orbitBand}</div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-text-tertiary">
        <span className="hud-label">Legenda</span>
        {(["BAIXO", "MEDIO", "ALTO", "CRITICO"] as const).map((level) => (
          <span key={level} className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5" style={{ backgroundColor: riskColor(level) }}></span>
            <span className="uppercase tracking-hud">{level}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
