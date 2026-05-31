export function formatBrl(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function formatNumber(value: number): string {
  return value.toLocaleString("pt-BR");
}

export function formatKm(value: number): string {
  return `${formatNumber(value)} km`;
}

export function formatKg(value: number): string {
  if (value >= 1000) {
    const tons = value / 1000;
    return `${tons.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} t`;
  }
  return `${formatNumber(value)} kg`;
}

export function formatDeg(value: number): string {
  return `${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}°`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
