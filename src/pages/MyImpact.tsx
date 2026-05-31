import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Award, Trash2, Eye } from "lucide-react";
import { PageShell } from "../components/layout/PageShell";
import { SectionTitle } from "../components/ui/SectionTitle";
import { Card } from "../components/ui/Card";
import { StatNumber } from "../components/ui/StatNumber";
import { Button } from "../components/ui/Button";
import { OrbitalRings } from "../components/visual/OrbitalRings";
import { RiskBadge } from "../components/debris/RiskBadge";
import { useKessler } from "../hooks/useKessler";
import { computeGlobalImpact, getSupporterStanding, SUPPORTER_LEVELS } from "../lib/impact";
import { formatBrl, formatKg, formatNumber } from "../lib/format";
import type { Debris } from "../types";

export function MyImpact() {
  const {
    debris,
    adoptions,
    monitoredIds,
    getDebris,
    getUserContributedTotal,
    getUserSupportedDebris,
    getUserMassRemovedKg,
    resetAll,
  } = useKessler();

  const contributed = getUserContributedTotal();
  const supported = getUserSupportedDebris();
  const massRemoved = getUserMassRemovedKg();
  const standing = getSupporterStanding(contributed);
  const global = computeGlobalImpact(debris, adoptions);

  const contributedByDebris = new Map<string, number>();
  for (const adoption of adoptions) {
    contributedByDebris.set(
      adoption.debrisId,
      (contributedByDebris.get(adoption.debrisId) ?? 0) + adoption.amountBrl,
    );
  }

  const monitored = monitoredIds
    .map((id) => getDebris(id))
    .filter((item): item is Debris => item !== undefined);

  const hasActivity = adoptions.length > 0 || monitored.length > 0;

  return (
    <PageShell>
      <div className="space-y-12">
        <SectionTitle
          eyebrow="Sua contribuicao"
          title="Meu impacto"
          description="Acompanhe o que o seu apoio ja representa em remocao de detritos e como a comunidade avanca em conjunto."
        />

        <div className="relative overflow-hidden surface-panel p-6 md:p-8">
          <div className="absolute inset-0 grid-overlay opacity-30" aria-hidden />
          <div className="relative">
            <div className="hud-label text-mars-orange">Impacto coletivo da plataforma</div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-6">
              <StatNumber label="Total arrecadado" value={formatBrl(global.totalRaisedBrl)} />
              <StatNumber label="Detrito removido" value={formatKg(global.massRemovedKg)} emphasized={false} />
              <StatNumber label="Satelites protegidos" value={formatNumber(global.satellitesSecured)} emphasized={false} />
              <StatNumber label="Detritos com apoio" value={formatNumber(global.debrisSupported)} emphasized={false} />
            </div>
          </div>
        </div>

        {contributed > 0 ? (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: "Total contribuido", value: formatBrl(contributed), emphasized: true },
                { label: "Detritos apoiados", value: formatNumber(supported.length), emphasized: false },
                { label: "Massa que ajudou a remover", value: formatKg(massRemoved), emphasized: false },
              ].map((metric) => (
                <motion.div
                  key={metric.label}
                  whileHover={{ y: -4, borderColor: "rgba(255, 107, 26, 0.45)" }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="border border-space-border bg-space-elevated p-6"
                >
                  <StatNumber label={metric.label} value={metric.value} emphasized={metric.emphasized} />
                </motion.div>
              ))}
            </div>

            <Card>
              <div className="flex items-center gap-3">
                <Award size={20} className="text-mars-orange" />
                <div>
                  <div className="hud-label text-mars-orange">Nivel de apoiador</div>
                  <div className="font-display text-2xl text-text-primary mt-1">{standing.current.name}</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-text-tertiary">
                    {standing.next ? `Proximo nivel: ${standing.next.name}` : "Nivel maximo alcancado"}
                  </span>
                  <span className="text-text-secondary">
                    {standing.next ? `faltam ${formatBrl(standing.amountToNext)}` : "Sentinela"}
                  </span>
                </div>
                <div className="h-2 bg-space-black border border-space-border">
                  <div className="h-full bg-mars-orange" style={{ width: `${standing.progressToNext * 100}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-6">
                {SUPPORTER_LEVELS.map((level) => {
                  const active = level.key === standing.current.key;
                  return (
                    <div
                      key={level.key}
                      className={`p-3 border text-center ${
                        active
                          ? "border-mars-orange bg-mars-orange/10"
                          : "border-space-border"
                      }`}
                    >
                      <div className={`font-display text-sm ${active ? "text-mars-orange" : "text-text-secondary"}`}>
                        {level.name}
                      </div>
                      <div className="hud-label mt-1">{formatBrl(level.min)}+</div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card>
              <div className="hud-label text-mars-orange mb-4">Detritos que voce apoiou</div>
              <div className="divide-y divide-space-border">
                {supported.map((item) => (
                  <Link
                    key={item.id}
                    to={`/detrito/${item.id}`}
                    className="grid grid-cols-[80px_1fr_auto_auto] items-center gap-4 py-4 text-sm group"
                  >
                    <span className="hud-label text-mars-orange">{item.id}</span>
                    <span className="font-display text-text-primary truncate group-hover:text-mars-orange transition-colors">
                      {item.name}
                    </span>
                    <span className="text-text-secondary">{formatBrl(contributedByDebris.get(item.id) ?? 0)}</span>
                    <RiskBadge level={item.riskLevel} />
                  </Link>
                ))}
              </div>
            </Card>
          </>
        ) : (
          <Card className="relative overflow-hidden">
            <div className="absolute -top-12 -right-12 opacity-40" aria-hidden>
              <OrbitalRings size={240} />
            </div>
            <div className="relative text-center py-10 space-y-4">
              <div className="hud-label text-mars-orange">Nenhuma adocao ainda</div>
              <h3 className="font-display text-2xl text-text-primary">Comece a deixar sua marca em orbita</h3>
              <p className="text-text-secondary max-w-md mx-auto leading-relaxed">
                Escolha um detrito no catalogo e apoie sua remocao. Voce vera, em tempo real, quanto lixo ajuda
                a remover e quantos satelites ficam mais seguros.
              </p>
              <div className="pt-2">
                <Link to="/catalogo">
                  <Button size="lg">
                    Explorar catalogo <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        )}

        {monitored.length > 0 && (
          <Card>
            <div className="hud-label text-mars-orange mb-4">Detritos monitorados</div>
            <div className="divide-y divide-space-border">
              {monitored.map((item) => (
                <Link
                  key={item.id}
                  to={`/detrito/${item.id}`}
                  className="grid grid-cols-[80px_1fr_auto] items-center gap-4 py-4 text-sm group"
                >
                  <span className="hud-label text-mars-orange">{item.id}</span>
                  <span className="font-display text-text-primary truncate group-hover:text-mars-orange transition-colors">
                    {item.name}
                  </span>
                  <span className="inline-flex items-center gap-2 text-text-tertiary">
                    <Eye size={14} /> Monitorando
                  </span>
                </Link>
              ))}
            </div>
          </Card>
        )}

        {hasActivity && (
          <div className="flex justify-end">
            <Button variant="ghost" onClick={resetAll}>
              <Trash2 size={16} /> Limpar meus dados locais
            </Button>
          </div>
        )}
      </div>
    </PageShell>
  );
}
