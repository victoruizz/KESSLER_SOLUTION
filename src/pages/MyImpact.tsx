import { Link } from "react-router-dom";
import { ArrowRight, Trash2 } from "lucide-react";
import { PageShell } from "../components/layout/PageShell";
import { SectionTitle } from "../components/ui/SectionTitle";
import { Card } from "../components/ui/Card";
import { StatNumber } from "../components/ui/StatNumber";
import { Button } from "../components/ui/Button";
import { RiskBadge } from "../components/debris/RiskBadge";
import { OrbitalRings } from "../components/visual/OrbitalRings";
import { useKessler } from "../hooks/useKessler";
import { formatBrl, formatDate, formatKg } from "../lib/format";

export function MyImpact() {
  const {
    adoptions,
    monitoredIds,
    getDebris,
    getUserContributedTotal,
    getUserSupportedDebris,
    getUserMassRemovedKg,
    resetAll,
  } = useKessler();

  const supported = getUserSupportedDebris();
  const totalContributed = getUserContributedTotal();
  const massRemoved = getUserMassRemovedKg();
  const monitored = monitoredIds
    .map((id) => getDebris(id))
    .filter((item): item is NonNullable<ReturnType<typeof getDebris>> => item !== undefined);

  const hasActivity = adoptions.length > 0 || monitoredIds.length > 0;

  return (
    <PageShell>
      <div className="space-y-10">
        <SectionTitle
          eyebrow="Meu Impacto"
          title="Seu papel contra a cascata"
          description="Tudo o que voce monitora e apoia fica registrado apenas neste navegador, como demonstracao."
        />

        {!hasActivity ? (
          <Card className="relative overflow-hidden">
            <div className="absolute -right-12 -top-12 opacity-40">
              <OrbitalRings size={260} />
            </div>
            <div className="relative max-w-xl space-y-4 py-10">
              <div className="hud-label text-mars-orange">Sem registros ainda</div>
              <h3 className="font-display text-2xl">Comece monitorando ou apoiando um detrito.</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                A cada apoio simbolico, voce contribui para a visibilidade do problema. Comece pelo
                catalogo e escolha o detrito cuja historia mais importa para voce.
              </p>
              <div className="flex gap-3">
                <Link to="/catalogo">
                  <Button>
                    Ver catalogo <ArrowRight size={14} />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="secondary">Abrir painel</Button>
                </Link>
              </div>
            </div>
          </Card>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              <Card elevated>
                <StatNumber label="Total contribuido" value={formatBrl(totalContributed)} />
              </Card>
              <Card elevated>
                <StatNumber label="Detritos apoiados" value={String(supported.length)} emphasized={false} />
              </Card>
              <Card elevated>
                <StatNumber label="Massa apoiada" value={formatKg(massRemoved)} />
              </Card>
            </div>

            {supported.length > 0 && (
              <Card>
                <div className="hud-label text-mars-orange mb-4">Detritos apoiados</div>
                <div className="divide-y divide-space-border">
                  {supported.map((item) => (
                    <Link
                      key={item.id}
                      to={`/detrito/${item.id}`}
                      className="flex items-center justify-between gap-4 py-4 text-sm hover:text-mars-orange transition-colors"
                    >
                      <div>
                        <div className="hud-label text-mars-orange">{item.id}</div>
                        <div className="font-display text-text-primary mt-1">{item.name}</div>
                        <div className="text-text-tertiary text-xs mt-1">
                          {item.countryOfOrigin} — {item.launchYear}
                        </div>
                      </div>
                      <RiskBadge level={item.riskLevel} />
                    </Link>
                  ))}
                </div>
              </Card>
            )}

            <Card>
              <div className="hud-label text-mars-orange mb-4">Historico de apoios</div>
              <div className="divide-y divide-space-border">
                {adoptions
                  .slice()
                  .reverse()
                  .map((adoption, index) => {
                    const debris = getDebris(adoption.debrisId);
                    return (
                      <div
                        key={`${adoption.debrisId}-${index}`}
                        className="flex items-center justify-between gap-4 py-4 text-sm"
                      >
                        <div>
                          <div className="font-display text-text-primary">
                            {debris?.name ?? adoption.debrisId}
                          </div>
                          <div className="text-text-tertiary text-xs mt-1">
                            {adoption.supporterName} — {formatDate(adoption.date)}
                          </div>
                        </div>
                        <div className="font-display text-mars-orange">{formatBrl(adoption.amountBrl)}</div>
                      </div>
                    );
                  })}
              </div>
            </Card>

            {monitored.length > 0 && (
              <Card>
                <div className="hud-label text-mars-orange mb-4">Em monitoramento</div>
                <div className="grid gap-3 md:grid-cols-2">
                  {monitored.map((item) => (
                    <Link
                      key={item.id}
                      to={`/detrito/${item.id}`}
                      className="border border-space-border p-4 flex items-center justify-between gap-3 hover:border-mars-orange/60 transition-colors"
                    >
                      <div>
                        <div className="hud-label text-mars-orange">{item.id}</div>
                        <div className="font-display text-text-primary mt-1 text-sm">{item.name}</div>
                      </div>
                      <RiskBadge level={item.riskLevel} />
                    </Link>
                  ))}
                </div>
              </Card>
            )}

            <div className="flex items-center justify-end">
              <Button variant="danger" onClick={resetAll}>
                <Trash2 size={14} /> Limpar dados locais
              </Button>
            </div>
          </>
        )}
      </div>
    </PageShell>
  );
}
