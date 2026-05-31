import type { OrbitBand, RiskLevel } from "../../types";

export type RiskFilter = "TODOS" | RiskLevel;
export type BandFilter = "TODAS" | OrbitBand;
export type SortKey = "RISCO" | "ALTITUDE" | "MASSA";

interface DebrisFiltersProps {
  query: string;
  onQueryChange: (value: string) => void;
  risk: RiskFilter;
  onRiskChange: (value: RiskFilter) => void;
  band: BandFilter;
  onBandChange: (value: BandFilter) => void;
  sort: SortKey;
  onSortChange: (value: SortKey) => void;
  count: number;
}

const riskOptions: { value: RiskFilter; label: string }[] = [
  { value: "TODOS", label: "Todos" },
  { value: "BAIXO", label: "Baixo" },
  { value: "MEDIO", label: "Medio" },
  { value: "ALTO", label: "Alto" },
  { value: "CRITICO", label: "Critico" },
];

const bandOptions: { value: BandFilter; label: string }[] = [
  { value: "TODAS", label: "Todas" },
  { value: "LEO", label: "LEO" },
  { value: "MEO", label: "MEO" },
  { value: "GEO", label: "GEO" },
];

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "RISCO", label: "Risco" },
  { value: "ALTITUDE", label: "Altitude" },
  { value: "MASSA", label: "Massa" },
];

export function DebrisFilters({
  query,
  onQueryChange,
  risk,
  onRiskChange,
  band,
  onBandChange,
  sort,
  onSortChange,
  count,
}: DebrisFiltersProps) {
  return (
    <div className="surface-panel p-5 grid gap-5">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-2">
          <label className="hud-label block mb-2">Busca</label>
          <input
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Nome ou pais de origem"
            className="w-full bg-space-black border border-space-border px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-mars-orange"
          />
        </div>
        <div>
          <label className="hud-label block mb-2">Ordenar por</label>
          <div className="flex flex-wrap gap-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onSortChange(option.value)}
                className={`text-[11px] font-display uppercase tracking-hud px-3 py-2 border ${
                  sort === option.value
                    ? "bg-mars-orange/15 border-mars-orange text-mars-orange"
                    : "border-space-border text-text-secondary hover:text-text-primary"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="hud-label block mb-2">Resultados</label>
          <div className="font-display text-mars-orange text-2xl">{count}</div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="hud-label mb-2">Nivel de risco</div>
          <div className="flex flex-wrap gap-1">
            {riskOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onRiskChange(option.value)}
                className={`text-[11px] font-display uppercase tracking-hud px-3 py-2 border ${
                  risk === option.value
                    ? "bg-mars-orange/15 border-mars-orange text-mars-orange"
                    : "border-space-border text-text-secondary hover:text-text-primary"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="hud-label mb-2">Faixa orbital</div>
          <div className="flex flex-wrap gap-1">
            {bandOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onBandChange(option.value)}
                className={`text-[11px] font-display uppercase tracking-hud px-3 py-2 border ${
                  band === option.value
                    ? "bg-mars-orange/15 border-mars-orange text-mars-orange"
                    : "border-space-border text-text-secondary hover:text-text-primary"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
