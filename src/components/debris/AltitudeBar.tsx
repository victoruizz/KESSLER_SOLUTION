interface AltitudeBarProps {
  altitudeKm: number;
}

const MAX_ALTITUDE = 40000;

export function AltitudeBar({ altitudeKm }: AltitudeBarProps) {
  const clamped = Math.min(altitudeKm, MAX_ALTITUDE);
  const positionPct = (clamped / MAX_ALTITUDE) * 100;
  const leoEndPct = (2000 / MAX_ALTITUDE) * 100;
  const meoEndPct = (35000 / MAX_ALTITUDE) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="hud-label">Faixa Orbital</span>
        <span className="font-display text-mars-orange text-sm">{altitudeKm.toLocaleString("pt-BR")} km</span>
      </div>
      <div className="relative h-3 bg-space-elevated border border-space-border">
        <div
          className="absolute top-0 bottom-0 left-0 bg-mars-orange/15"
          style={{ width: `${leoEndPct}%` }}
        />
        <div
          className="absolute top-0 bottom-0 bg-mars-orange/10"
          style={{ left: `${leoEndPct}%`, width: `${meoEndPct - leoEndPct}%` }}
        />
        <div
          className="absolute top-0 bottom-0 bg-mars-orange/5"
          style={{ left: `${meoEndPct}%`, right: 0 }}
        />
        <div
          className="absolute top-[-4px] bottom-[-4px] w-[2px] bg-mars-orange"
          style={{ left: `calc(${positionPct}% - 1px)` }}
        />
        <div
          className="absolute -top-2 w-3 h-3 border border-mars-orange bg-space-black"
          style={{ left: `calc(${positionPct}% - 6px)`, transform: "rotate(45deg)" }}
        />
      </div>
      <div className="grid grid-cols-3 mt-3 text-[10px] font-display uppercase tracking-hud text-text-tertiary">
        <span>LEO</span>
        <span className="text-center">MEO</span>
        <span className="text-right">GEO</span>
      </div>
    </div>
  );
}
