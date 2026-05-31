import type { Adoption, Debris } from "../types";

export interface SupporterLevel {
  key: string;
  name: string;
  min: number;
}

export const SUPPORTER_LEVELS: SupporterLevel[] = [
  { key: "OBSERVADOR", name: "Observador", min: 0 },
  { key: "GUARDIAO", name: "Guardiao Orbital", min: 100 },
  { key: "SENTINELA", name: "Sentinela", min: 300 },
];

export interface SupporterStanding {
  current: SupporterLevel;
  next: SupporterLevel | null;
  amountToNext: number;
  progressToNext: number;
}

export function getSupporterStanding(totalBrl: number): SupporterStanding {
  let current = SUPPORTER_LEVELS[0];
  for (const level of SUPPORTER_LEVELS) {
    if (totalBrl >= level.min) current = level;
  }
  const currentIndex = SUPPORTER_LEVELS.findIndex((level) => level.key === current.key);
  const next = SUPPORTER_LEVELS[currentIndex + 1] ?? null;
  if (!next) {
    return { current, next: null, amountToNext: 0, progressToNext: 1 };
  }
  const span = next.min - current.min;
  const advanced = Math.min(span, Math.max(0, totalBrl - current.min));
  return {
    current,
    next,
    amountToNext: Math.max(0, next.min - totalBrl),
    progressToNext: span === 0 ? 1 : advanced / span,
  };
}

const BAND_SATELLITE_WEIGHT: Record<Debris["orbitBand"], number> = {
  LEO: 24,
  MEO: 9,
  GEO: 16,
};

export function satellitesAtRisk(debris: Debris): number {
  return Math.max(1, Math.round((debris.riskScore / 100) * BAND_SATELLITE_WEIGHT[debris.orbitBand]));
}

export interface ContributionImpact {
  fraction: number;
  massRemovedKg: number;
  massRemovedGrams: number;
  goalPercent: number;
  satellitesSecured: number;
}

export function computeContributionImpact(debris: Debris, amountBrl: number): ContributionImpact {
  const safeAmount = Math.max(0, amountBrl);
  const fraction = debris.removalCostBrl > 0 ? Math.min(1, safeAmount / debris.removalCostBrl) : 0;
  const massRemovedKg = fraction * debris.massKg;
  return {
    fraction,
    massRemovedKg,
    massRemovedGrams: massRemovedKg * 1000,
    goalPercent: fraction * 100,
    satellitesSecured: Math.round(fraction * satellitesAtRisk(debris)),
  };
}

export interface CommunityProgress {
  raisedBrl: number;
  costBrl: number;
  percent: number;
  remainingBrl: number;
}

export function computeCommunityProgress(debris: Debris, adoptedBrl: number): CommunityProgress {
  const raisedBrl = debris.fundedBrl + Math.max(0, adoptedBrl);
  const percent = debris.removalCostBrl > 0 ? Math.min(1, raisedBrl / debris.removalCostBrl) : 0;
  return {
    raisedBrl,
    costBrl: debris.removalCostBrl,
    percent,
    remainingBrl: Math.max(0, debris.removalCostBrl - raisedBrl),
  };
}

export interface GlobalImpact {
  totalRaisedBrl: number;
  massRemovedKg: number;
  satellitesSecured: number;
  debrisSupported: number;
}

export function computeGlobalImpact(debris: Debris[], adoptions: Adoption[]): GlobalImpact {
  const adoptedByDebris = new Map<string, number>();
  for (const adoption of adoptions) {
    adoptedByDebris.set(
      adoption.debrisId,
      (adoptedByDebris.get(adoption.debrisId) ?? 0) + adoption.amountBrl,
    );
  }

  let massRemovedKg = 0;
  let satellitesSecured = 0;
  for (const item of debris) {
    const raised = item.fundedBrl + (adoptedByDebris.get(item.id) ?? 0);
    const fraction = item.removalCostBrl > 0 ? Math.min(1, raised / item.removalCostBrl) : 0;
    massRemovedKg += fraction * item.massKg;
    satellitesSecured += Math.round(fraction * satellitesAtRisk(item));
  }

  const totalRaisedBrl = debris.reduce((acc, item) => acc + item.fundedBrl, 0)
    + adoptions.reduce((acc, adoption) => acc + adoption.amountBrl, 0);

  return {
    totalRaisedBrl,
    massRemovedKg,
    satellitesSecured,
    debrisSupported: adoptedByDebris.size,
  };
}
