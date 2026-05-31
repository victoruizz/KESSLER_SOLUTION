import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Eye, EyeOff } from "lucide-react";
import { PageShell } from "../components/layout/PageShell";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { RiskBadge } from "../components/debris/RiskBadge";
import { AltitudeBar } from "../components/debris/AltitudeBar";
import { RiskGauge } from "../components/visual/RiskGauge";
import { AdoptionModal } from "../components/adoption/AdoptionModal";
import { useKessler } from "../hooks/useKessler";
import { formatBrl, formatDeg, formatKg, formatKm } from "../lib/format";
import { bandFullLabel } from "../lib/orbital";

export function DebrisDetail() {
  const { id } = useParams<{ id: string }>();
  const {
    getDebris,
    getFundedTotalForDebris,
    missions,
    isMonitored,
    toggleMonitor,
  } = useKessler();
  const [open, setOpen] = useState(false);

  const debris = id ? getDebris(id) : undefined;

  const linkedMissions = useMemo(() => {
    if (!debris) return [];
    return missions.filter((mission) => mission.targetDebrisId === debris.id);
  }, [debris, missions]);

  if (!debris) {
    return (
      <PageShell>
        <Card>
          <div className="text-center space-y-4 py-10">
            <div className="hud-label">Detrito nao encontrado</div>
            <p className="text-text-secondary">O identificador informado nao esta no catalogo.</p>
            <Link to="/catalogo">
              <Button>Voltar ao catalogo</Button>
            </Link>
          </div>
        </Card>
      </PageShell>
    );
  }

  const fundedTotal = getFundedTotalForDebris(debris.id);
  const fundingPct = Math.min(1, fundedTotal / debris.removalCostBrl);
  const monitored = isMonitored(debris.id);

  return (
    <PageShell>
      <div className="space-y-8">
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-mars-orange text-xs font-display tracking-hud uppercase"
        >
          <ArrowLeft size={14} /> Voltar ao catalogo
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] items-start">
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="hud-label text-mars-orange">{debris.id}</div>
                <h1 className="font-display text-3xl md:text-4xl text-text-primary mt-2 leading-tight uppercase tracking-wide">
                  {debris.name}
                </h1>
                <div className="text-text-tertiary text-sm mt-2">
                  {debris.countryOfOrigin} — Lancado em {debris.launchYear} — {debris.type}
                </div>
              </div>
              <RiskBadge level={debris.riskLevel} />
            </div>

            <Card>
              <div className="hud-label mb-3">Historia</div>
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">{debris.story}</p>
            </Card>

            <Card>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <div className="hud-label">Massa</div>
                  <div className="font-display text-mars-orange text-xl mt-1">{formatKg(debris.massKg)}</div>
                </div>
                <div>
                  <div className="hud-label">Inclinacao</div>
                  <div className="font-display text-text-primary text-xl mt-1">{formatDeg(debris.inclinationDeg)}</div>
                </div>
                <div>
                  <div className="hud-label">Ano de lancamento</div>
                  <div className="font-display text-text-primary text-xl mt-1">{debris.launchYear}</div>
                </div>
                <div>
                  <div className="hud-label">Tipo</div>
                  <div className="text-text-secondary text-sm mt-1">{debris.type}</div>
                </div>
                <div>
                  <div className="hud-label">Faixa orbital</div>
                  <div className="text-text-secondary text-sm mt-1">{bandFullLabel(debris.orbitBand)}</div>
                </div>
                <div>
                  <div className="hud-label">Missao de origem</div>
                  <div className="text-text-secondary text-sm mt-1">{debris.originMission}</div>
                </div>
              </div>
            </Card>

            <Card>
              <AltitudeBar altitudeKm={debris.altitudeKm} />
            </Card>

            {linkedMissions.length > 0 && (
              <Card>
                <div className="hud-label mb-4">Missoes relacionadas</div>
                <div className="space-y-3">
                  {linkedMissions.map((mission) => (
                    <div
                      key={mission.id}
                      className="flex items-center justify-between text-sm border border-space-border p-3"
                    >
                      <div>
                        <div className="font-display text-text-primary">{mission.name}</div>
                        <div className="text-text-tertiary text-xs">{mission.company} — Lancamento {mission.launchYear}</div>
                      </div>
                      <div className="hud-label text-mars-orange">{mission.status.replace("_", " ")}</div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-5">
            <Card className="flex flex-col items-center text-center">
              <RiskGauge score={debris.riskScore} level={debris.riskLevel} />
            </Card>

            <Card>
              <div className="hud-label mb-2">Financiamento</div>
              <div className="flex items-end justify-between mt-2">
                <div>
                  <div className="font-display text-mars-orange text-2xl">{formatBrl(fundedTotal)}</div>
                  <div className="text-text-tertiary text-xs mt-1">
                    de {formatBrl(debris.removalCostBrl)} necessarios
                  </div>
                </div>
                <div className="font-display text-text-secondary">{Math.round(fundingPct * 100)}%</div>
              </div>
              <div className="h-2 mt-4 bg-space-elevated border border-space-border">
                <div className="h-full bg-mars-orange" style={{ width: `${fundingPct * 100}%` }} />
              </div>
            </Card>

            <div className="space-y-3">
              <Button size="lg" className="w-full" onClick={() => setOpen(true)}>
                <Heart size={16} /> Adotar este detrito
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="w-full"
                onClick={() => toggleMonitor(debris.id)}
              >
                {monitored ? (
                  <>
                    <EyeOff size={16} /> Deixar de monitorar
                  </>
                ) : (
                  <>
                    <Eye size={16} /> Monitorar
                  </>
                )}
              </Button>
            </div>

            <Card elevated>
              <div className="hud-label text-mars-orange">Coordenadas</div>
              <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                <div>
                  <div className="text-text-tertiary">Altitude</div>
                  <div className="font-display text-text-primary text-sm mt-1">{formatKm(debris.altitudeKm)}</div>
                </div>
                <div>
                  <div className="text-text-tertiary">Faixa</div>
                  <div className="font-display text-text-primary text-sm mt-1">{debris.orbitBand}</div>
                </div>
                <div>
                  <div className="text-text-tertiary">Score</div>
                  <div className="font-display text-text-primary text-sm mt-1">{debris.riskScore} / 100</div>
                </div>
                <div>
                  <div className="text-text-tertiary">Origem</div>
                  <div className="font-display text-text-primary text-sm mt-1">{debris.countryOfOrigin}</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <AdoptionModal debris={debris} open={open} onClose={() => setOpen(false)} />
    </PageShell>
  );
}
