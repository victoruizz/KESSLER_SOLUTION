import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "../components/layout/PageShell";
import { SectionTitle } from "../components/ui/SectionTitle";
import { Card } from "../components/ui/Card";
import { StatNumber } from "../components/ui/StatNumber";
import { OrbitMap } from "../components/visual/OrbitMap";
import { RiskBadge } from "../components/debris/RiskBadge";
import { useKessler } from "../hooks/useKessler";
import {
  distributionByBand,
  distributionByRisk,
  totalCatalogedMassKg,
} from "../data/stats";
import { formatBrl, formatKg, formatNumber } from "../lib/format";
import { riskColor } from "../lib/orbital";
import type { OrbitBand, RiskLevel } from "../types";

const bandOrder: OrbitBand[] = ["LEO", "MEO", "GEO"];
const riskOrder: RiskLevel[] = ["BAIXO", "MEDIO", "ALTO", "CRITICO"];

export function Dashboard() {
  const { debris, getGlobalFundedTotal } = useKessler();
  const massTotal = totalCatalogedMassKg();
  const criticalTotal = debris.filter((item) => item.riskLevel === "CRITICO").length;
  const fundedTotal = getGlobalFundedTotal();
  const bandDist = distributionByBand();
  const riskDist = distributionByRisk();

  const bandMax = Math.max(...bandOrder.map((band) => bandDist[band]));
  const riskMax = Math.max(...riskOrder.map((risk) => riskDist[risk]));

  const topRisk = [...debris].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5);

  return (
    <PageShell>
      <div className="space-y-12">
        <SectionTitle
          eyebrow="Painel Operacional"
          title="Visao geral da rede de detritos"
          description="Indicadores agregados do catalogo Kessler, atualizados a partir da sua sessao."
        />

        <div className="grid gap-4 md:grid-cols-4">
          <Card elevated>
            <StatNumber label="Detritos monitorados" value={formatNumber(debris.length)} emphasized={false} />
          </Card>
          <Card elevated>
            <StatNumber label="Massa em orbita" value={formatKg(massTotal)} />
          </Card>
          <Card elevated>
            <StatNumber label="Em risco critico" value={formatNumber(criticalTotal)} />
          </Card>
          <Card elevated>
            <StatNumber label="Financiamento total" value={formatBrl(fundedTotal)} />
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="hud-label text-mars-orange">Mapa Orbital</div>
                <h3 className="font-display text-xl mt-1">Distribuicao por faixa e risco</h3>
              </div>
              <Link to="/catalogo" className="hud-label text-text-secondary hover:text-mars-orange inline-flex items-center gap-1">
                Catalogo <ArrowUpRight size={14} />
              </Link>
            </div>
            <OrbitMap debris={debris} />
          </Card>

          <div className="space-y-6">
            <Card>
              <div className="hud-label text-mars-orange mb-4">Por faixa orbital</div>
              <div className="space-y-3">
                {bandOrder.map((band) => {
                  const count = bandDist[band];
                  const pct = bandMax === 0 ? 0 : count / bandMax;
                  return (
                    <div key={band}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-display tracking-hud">{band}</span>
                        <span className="text-text-secondary">{count}</span>
                      </div>
                      <div className="h-2 bg-space-elevated border border-space-border">
                        <div className="h-full bg-mars-orange" style={{ width: `${pct * 100}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
            <Card>
              <div className="hud-label text-mars-orange mb-4">Por nivel de risco</div>
              <div className="space-y-3">
                {riskOrder.map((risk) => {
                  const count = riskDist[risk];
                  const pct = riskMax === 0 ? 0 : count / riskMax;
                  return (
                    <div key={risk}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-display tracking-hud" style={{ color: riskColor(risk) }}>{risk}</span>
                        <span className="text-text-secondary">{count}</span>
                      </div>
                      <div className="h-2 bg-space-elevated border border-space-border">
                        <div
                          className="h-full"
                          style={{ width: `${pct * 100}%`, backgroundColor: riskColor(risk) }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>

        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="hud-label text-mars-orange">Top 5 maior risco</div>
              <h3 className="font-display text-xl mt-1">Alvos prioritarios para remocao</h3>
            </div>
          </div>
          <div className="divide-y divide-space-border">
            {topRisk.map((item) => (
              <Link
                key={item.id}
                to={`/detrito/${item.id}`}
                className="grid grid-cols-[80px_1fr_120px_120px_40px] items-center gap-4 py-4 text-sm hover:text-mars-orange transition-colors"
              >
                <span className="hud-label text-mars-orange">{item.id}</span>
                <span className="font-display text-text-primary truncate">{item.name}</span>
                <span className="text-text-tertiary text-xs">{item.altitudeKm.toLocaleString("pt-BR")} km</span>
                <RiskBadge level={item.riskLevel} />
                <ArrowUpRight size={16} className="justify-self-end text-text-tertiary" />
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
