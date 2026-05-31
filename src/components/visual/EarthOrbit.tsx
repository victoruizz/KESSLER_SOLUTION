import { motion } from "framer-motion";

interface EarthOrbitProps {
  size?: number;
  className?: string;
}

interface OrbitingDebris {
  radius: number;
  squash: number;
  duration: number;
  size: number;
  color: string;
  startAngle: number;
  reverse?: boolean;
}

const CENTER = 220;

const DEBRIS: OrbitingDebris[] = [
  { radius: 132, squash: 0.42, duration: 26, size: 3.2, color: "#FF6B1A", startAngle: 20 },
  { radius: 132, squash: 0.42, duration: 26, size: 2.2, color: "#FFB347", startAngle: 200 },
  { radius: 150, squash: 0.3, duration: 38, size: 2.6, color: "#FFFFFF", startAngle: 110, reverse: true },
  { radius: 150, squash: 0.3, duration: 38, size: 2, color: "#B0B0B0", startAngle: 300, reverse: true },
  { radius: 172, squash: 0.52, duration: 52, size: 3.6, color: "#FF6B1A", startAngle: 60 },
  { radius: 172, squash: 0.52, duration: 52, size: 2.2, color: "#FFFFFF", startAngle: 250 },
  { radius: 190, squash: 0.2, duration: 64, size: 2.4, color: "#FACC15", startAngle: 150, reverse: true },
];

export function EarthOrbit({ size = 440, className = "" }: EarthOrbitProps) {
  return (
    <motion.div
      className={`relative select-none ${className}`}
      style={{ width: "100%", maxWidth: size }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      aria-hidden
    >
      <svg viewBox="0 0 440 440" className="w-full h-auto" role="img" aria-label="Terra vista da orbita com detritos">
        <defs>
          <radialGradient id="earth-ocean" cx="38%" cy="34%" r="72%">
            <stop offset="0%" stopColor="#1B5E8A" />
            <stop offset="45%" stopColor="#0E3A5C" />
            <stop offset="100%" stopColor="#04141F" />
          </radialGradient>
          <radialGradient id="earth-night" cx="32%" cy="30%" r="75%">
            <stop offset="55%" stopColor="#000000" stopOpacity={0} />
            <stop offset="100%" stopColor="#000000" stopOpacity={0.85} />
          </radialGradient>
          <radialGradient id="atmos-glow" cx="50%" cy="50%" r="50%">
            <stop offset="62%" stopColor="#FF6B1A" stopOpacity={0} />
            <stop offset="82%" stopColor="#FF6B1A" stopOpacity={0.4} />
            <stop offset="92%" stopColor="#FFB347" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#FF6B1A" stopOpacity={0} />
          </radialGradient>
          <clipPath id="earth-clip">
            <circle cx={CENTER} cy={CENTER} r={96} />
          </clipPath>
        </defs>

        <circle cx={CENTER} cy={CENTER} r={150} fill="url(#atmos-glow)" />

        {DEBRIS.map((item, index) => (
          <ellipse
            key={`ring-${index}`}
            cx={CENTER}
            cy={CENTER}
            rx={item.radius}
            ry={item.radius * item.squash}
            fill="none"
            stroke="#1F1F1F"
            strokeWidth={1}
            strokeOpacity={0.35}
          />
        ))}

        <circle cx={CENTER} cy={CENTER} r={97} fill="#FF6B1A" opacity={0.12} />
        <circle cx={CENTER} cy={CENTER} r={96} fill="url(#earth-ocean)" />

        <g clipPath="url(#earth-clip)">
          <path d="M150 168 q26 -16 52 -6 q22 8 14 28 q-10 22 -40 18 q-34 -4 -26 -40z" fill="#13614A" opacity={0.55} />
          <path d="M214 150 q30 -6 44 14 q10 16 -8 26 q-26 12 -44 -6 q-14 -22 8 -34z" fill="#155C3F" opacity={0.5} />
          <path d="M168 244 q28 -10 50 6 q14 14 -6 28 q-30 16 -54 -4 q-12 -20 10 -30z" fill="#11543B" opacity={0.45} />
          <g>
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 220 220"
              to="360 220 220"
              dur="120s"
              repeatCount="indefinite"
            />
            <ellipse cx={CENTER - 36} cy={CENTER - 30} rx={70} ry={10} fill="#FFFFFF" opacity={0.05} />
            <ellipse cx={CENTER + 24} cy={CENTER + 26} rx={58} ry={8} fill="#FFFFFF" opacity={0.04} />
          </g>
          <ellipse cx={CENTER} cy={CENTER} rx={96} ry={96} fill="url(#earth-night)" />
        </g>

        <circle cx={CENTER} cy={CENTER} r={96} fill="none" stroke="#FF6B1A" strokeOpacity={0.55} strokeWidth={1.5} />

        {DEBRIS.map((item, index) => (
          <g
            key={`debris-${index}`}
            transform={`translate(${CENTER} ${CENTER}) scale(1 ${item.squash}) translate(${-CENTER} ${-CENTER})`}
          >
            <g>
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from={`${item.startAngle} ${CENTER} ${CENTER}`}
                to={`${item.startAngle + (item.reverse ? -360 : 360)} ${CENTER} ${CENTER}`}
                dur={`${item.duration}s`}
                repeatCount="indefinite"
              />
              <circle cx={CENTER + item.radius} cy={CENTER} r={item.size + 2.4} fill={item.color} opacity={0.18} />
              <circle cx={CENTER + item.radius} cy={CENTER} r={item.size} fill={item.color} />
            </g>
          </g>
        ))}
      </svg>
    </motion.div>
  );
}
