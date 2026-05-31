import { useMemo, useState } from "react";
import { PageShell } from "../components/layout/PageShell";
import { SectionTitle } from "../components/ui/SectionTitle";
import { DebrisCard } from "../components/debris/DebrisCard";
import {
  DebrisFilters,
  type BandFilter,
  type RiskFilter,
  type SortKey,
} from "../components/debris/DebrisFilters";
import { useKessler } from "../hooks/useKessler";

const riskWeight: Record<string, number> = {
  CRITICO: 4,
  ALTO: 3,
  MEDIO: 2,
  BAIXO: 1,
};

export function Catalog() {
  const { debris, getFundedTotalForDebris } = useKessler();
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState<RiskFilter>("TODOS");
  const [band, setBand] = useState<BandFilter>("TODAS");
  const [sort, setSort] = useState<SortKey>("RISCO");

  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase();
    return debris
      .filter((item) => {
        if (risk !== "TODOS" && item.riskLevel !== risk) return false;
        if (band !== "TODAS" && item.orbitBand !== band) return false;
        if (!lower) return true;
        return (
          item.name.toLowerCase().includes(lower) ||
          item.countryOfOrigin.toLowerCase().includes(lower)
        );
      })
      .sort((a, b) => {
        if (sort === "RISCO") {
          const delta = riskWeight[b.riskLevel] - riskWeight[a.riskLevel];
          if (delta !== 0) return delta;
          return b.riskScore - a.riskScore;
        }
        if (sort === "ALTITUDE") return a.altitudeKm - b.altitudeKm;
        return b.massKg - a.massKg;
      });
  }, [debris, query, risk, band, sort]);

  return (
    <PageShell>
      <div className="space-y-10">
        <SectionTitle
          eyebrow="Catalogo Kessler"
          title="16 detritos sob observacao"
          description="Filtre, busque e ordene para encontrar o detrito que voce quer apoiar ou estudar."
        />

        <DebrisFilters
          query={query}
          onQueryChange={setQuery}
          risk={risk}
          onRiskChange={setRisk}
          band={band}
          onBandChange={setBand}
          sort={sort}
          onSortChange={setSort}
          count={filtered.length}
        />

        {filtered.length === 0 ? (
          <div className="surface-panel p-12 text-center">
            <div className="hud-label">Nenhum resultado</div>
            <p className="text-text-secondary text-sm mt-3">
              Ajuste os filtros para visualizar detritos do catalogo.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <DebrisCard
                key={item.id}
                debris={item}
                fundedTotal={getFundedTotalForDebris(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
