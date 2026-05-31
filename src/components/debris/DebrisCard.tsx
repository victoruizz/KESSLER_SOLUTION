import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Debris } from "../../types";
import { Card } from "../ui/Card";
import { RiskBadge } from "./RiskBadge";
import { formatBrl, formatDeg, formatKg, formatKm } from "../../lib/format";

interface DebrisCardProps {
  debris: Debris;
  fundedTotal: number;
}

export function DebrisCard({ debris, fundedTotal }: DebrisCardProps) {
  const fundingPct = Math.min(1, fundedTotal / debris.removalCostBrl);

  return (
    <Link to={`/detrito/${debris.id}`} className="block group">
      <Card hoverable className="h-full flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="hud-label text-mars-orange">{debris.id}</div>
            <div className="font-display text-lg text-text-primary mt-1 leading-tight group-hover:text-mars-orange transition-colors">
              {debris.name}
            </div>
            <div className="text-text-tertiary text-xs mt-1">
              {debris.countryOfOrigin} — {debris.launchYear}
            </div>
          </div>
          <RiskBadge level={debris.riskLevel} />
        </div>

        <div className="grid grid-cols-3 gap-3 text-xs">
          <div>
            <div className="hud-label">Altitude</div>
            <div className="text-text-primary font-display mt-1">{formatKm(debris.altitudeKm)}</div>
          </div>
          <div>
            <div className="hud-label">Massa</div>
            <div className="text-text-primary font-display mt-1">{formatKg(debris.massKg)}</div>
          </div>
          <div>
            <div className="hud-label">Inclinacao</div>
            <div className="text-text-primary font-display mt-1">{formatDeg(debris.inclinationDeg)}</div>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-text-tertiary">Financiamento</span>
            <span className="text-text-secondary">
              {formatBrl(fundedTotal)} <span className="text-text-tertiary">/ {formatBrl(debris.removalCostBrl)}</span>
            </span>
          </div>
          <div className="h-1.5 bg-space-elevated border border-space-border">
            <div className="h-full bg-mars-orange" style={{ width: `${fundingPct * 100}%` }} />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-2 border-t border-space-border">
          <span className="hud-label">{debris.orbitBand}</span>
          <span className="text-text-secondary inline-flex items-center gap-1 group-hover:text-mars-orange transition-colors">
            Ver detalhe <ArrowUpRight size={14} />
          </span>
        </div>
      </Card>
    </Link>
  );
}
