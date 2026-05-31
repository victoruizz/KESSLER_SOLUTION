import type { RiskLevel } from "../../types";
import { Badge } from "../ui/Badge";
import { riskColor, riskLabel } from "../../lib/orbital";

interface RiskBadgeProps {
  level: RiskLevel;
}

export function RiskBadge({ level }: RiskBadgeProps) {
  const color = riskColor(level);
  return <Badge color={color}>Risco {riskLabel(level)}</Badge>;
}
