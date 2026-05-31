import type { RiskLevel } from "../../types";
import { riskColor, riskLabel } from "../../lib/orbital";

interface RiskGaugeProps {
  score: number;
  level: RiskLevel;
  size?: number;
}

export function RiskGauge({ score, level, size = 220 }: RiskGaugeProps) {
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score));
  const filled = (clamped / 100) * circumference;
  const color = riskColor(level);
  const cx = size / 2;
  const cy = size / 2 + 10;

  return (
    <div className="flex flex-col items-center select-none" style={{ width: size }}>
      <svg width={size} height={size * 0.72} viewBox={`0 0 ${size} ${size * 0.72}`}>
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="#1F1F1F"
          strokeWidth={stroke}
          strokeLinecap="butt"
        />
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`}
        />
        <text
          x={cx}
          y={cy - 12}
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Orbitron"
          fontWeight={700}
          fontSize={40}
        >
          {Math.round(clamped)}
        </text>
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          fill={color}
          fontFamily="Orbitron"
          fontSize={11}
          letterSpacing={3}
        >
          {riskLabel(level).toUpperCase()}
        </text>
      </svg>
      <div className="hud-label mt-1">Score de Risco</div>
    </div>
  );
}
