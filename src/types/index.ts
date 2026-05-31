export type RiskLevel = "BAIXO" | "MEDIO" | "ALTO" | "CRITICO";
export type OrbitBand = "LEO" | "MEO" | "GEO";

export interface Debris {
  id: string;
  name: string;
  countryOfOrigin: string;
  launchYear: number;
  altitudeKm: number;
  massKg: number;
  inclinationDeg: number;
  type: string;
  riskLevel: RiskLevel;
  riskScore: number;
  orbitBand: OrbitBand;
  originMission: string;
  removalCostBrl: number;
  fundedBrl: number;
  story: string;
}

export interface RemovalMission {
  id: string;
  name: string;
  company: string;
  targetDebrisId: string;
  launchYear: number;
  status: "PLANEJADA" | "EM_FINANCIAMENTO" | "EXECUTADA";
}

export interface Adoption {
  debrisId: string;
  amountBrl: number;
  date: string;
  supporterName: string;
}
