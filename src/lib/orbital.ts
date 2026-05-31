import type { OrbitBand, RiskLevel } from "../types";

export function altitudeToBand(altitudeKm: number): OrbitBand {
  if (altitudeKm < 2000) return "LEO";
  if (altitudeKm < 35000) return "MEO";
  return "GEO";
}

export function bandLabel(band: OrbitBand): string {
  if (band === "LEO") return "Orbita Baixa";
  if (band === "MEO") return "Orbita Media";
  return "Orbita Geoestacionaria";
}

export function bandFullLabel(band: OrbitBand): string {
  if (band === "LEO") return "LEO — Orbita Terrestre Baixa";
  if (band === "MEO") return "MEO — Orbita Terrestre Media";
  return "GEO — Orbita Geoestacionaria";
}

export function riskColor(level: RiskLevel): string {
  if (level === "BAIXO") return "#4ADE80";
  if (level === "MEDIO") return "#FACC15";
  if (level === "ALTO") return "#FB923C";
  return "#EF4444";
}

export function riskLabel(level: RiskLevel): string {
  if (level === "BAIXO") return "Baixo";
  if (level === "MEDIO") return "Medio";
  if (level === "ALTO") return "Alto";
  return "Critico";
}

export function bandRadius(band: OrbitBand): number {
  if (band === "LEO") return 140;
  if (band === "MEO") return 200;
  return 260;
}

export function debrisAngle(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % 360;
}
