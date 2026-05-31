import { debrisCatalog } from "./debris";
import type { OrbitBand, RiskLevel } from "../types";

export const globalStats = {
  trackedObjects: 36500,
  smallFragments: 1000000,
  averageSpeedKmh: 28000,
};

export function totalCatalogedMassKg(): number {
  return debrisCatalog.reduce((acc, debris) => acc + debris.massKg, 0);
}

export function uniqueCountriesCount(): number {
  const set = new Set(debrisCatalog.map((debris) => debris.countryOfOrigin));
  return set.size;
}

export function distributionByBand(): Record<OrbitBand, number> {
  const acc: Record<OrbitBand, number> = { LEO: 0, MEO: 0, GEO: 0 };
  for (const debris of debrisCatalog) {
    acc[debris.orbitBand] += 1;
  }
  return acc;
}

export function distributionByRisk(): Record<RiskLevel, number> {
  const acc: Record<RiskLevel, number> = {
    BAIXO: 0,
    MEDIO: 0,
    ALTO: 0,
    CRITICO: 0,
  };
  for (const debris of debrisCatalog) {
    acc[debris.riskLevel] += 1;
  }
  return acc;
}

export function totalRemovalCostBrl(): number {
  return debrisCatalog.reduce((acc, debris) => acc + debris.removalCostBrl, 0);
}

export function totalCatalogFundedBrl(): number {
  return debrisCatalog.reduce((acc, debris) => acc + debris.fundedBrl, 0);
}

export function criticalCount(): number {
  return debrisCatalog.filter((debris) => debris.riskLevel === "CRITICO").length;
}
