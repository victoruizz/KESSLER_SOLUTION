import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

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
const GLOBE_RADIUS = 118;

const RINGS: { radius: number; squash: number }[] = [
  { radius: 150, squash: 0.34 },
  { radius: 172, squash: 0.46 },
  { radius: 194, squash: 0.26 },
];

const MERIDIANS = [0.32, 0.62, 0.86, 1];
const PARALLELS = [0.28, 0.56, 0.82];

const DEBRIS: OrbitingDebris[] = [
  { radius: 150, squash: 0.34, duration: 24, size: 3.4, color: "#FF6B1A", startAngle: 18 },
  { radius: 150, squash: 0.34, duration: 24, size: 2.2, color: "#FFB347", startAngle: 205 },
  { radius: 172, squash: 0.46, duration: 40, size: 2.6, color: "#FFFFFF", startAngle: 96, reverse: true },
  { radius: 172, squash: 0.46, duration: 40, size: 2, color: "#B0B0B0", startAngle: 286, reverse: true },
  { radius: 194, squash: 0.26, duration: 58, size: 3.8, color: "#FF6B1A", startAngle: 54 },
  { radius: 194, squash: 0.26, duration: 58, size: 2.4, color: "#FACC15", startAngle: 234 },
  { radius: 172, squash: 0.46, duration: 48, size: 2.2, color: "#FF6B1A", startAngle: 150, reverse: true },
];

const TWINKLES = [
  { x: 64, y: 92, r: 1.4, delay: 0 },
  { x: 372, y: 120, r: 1.1, delay: 1.2 },
  { x: 340, y: 348, r: 1.6, delay: 0.6 },
  { x: 84, y: 332, r: 1.2, delay: 1.8 },
  { x: 402, y: 248, r: 1, delay: 0.9 },
];

export function EarthOrbit({ size = 600, className = "" }: EarthOrbitProps) {
  const reduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const scrollScale = useTransform(scrollY, [0, 620], [1, 1.14]);
  const scrollLift = useTransform(scrollY, [0, 620], [0, 74]);
  const ringRotate = useTransform(scrollY, [0, 1300], [0, 34]);
  const glowOpacity = useTransform(scrollY, [0, 520], [0.45, 0.92]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 60, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 60, damping: 20 });
  const tiltX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const tiltY = useTransform(springX, [-0.5, 0.5], [-12, 12]);

  useEffect(() => {
    if (reduceMotion) return;
    const handleMove = (event: PointerEvent) => {
      pointerX.set(event.clientX / window.innerWidth - 0.5);
      pointerY.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [pointerX, pointerY, reduceMotion]);

  const outerStyle = reduceMotion
    ? { width: "100%", maxWidth: size }
    : { width: "100%", maxWidth: size, scale: scrollScale, y: scrollLift };
  const tiltStyle = reduceMotion ? undefined : { rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" as const };
  const orbitStyle = reduceMotion ? undefined : { rotate: ringRotate };

  return (
    <motion.div
      className={`relative select-none ${className}`}
      style={outerStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      aria-hidden
    >
      <div style={{ perspective: 1300 }}>
        <motion.div className="relative" style={tiltStyle}>
          <svg
            viewBox="0 0 440 440"
            className="w-full h-auto block"
            role="img"
            aria-label="Terra vista da orbita com detritos ao redor"
          >
            <defs>
              <radialGradient id="earth-ocean" cx="36%" cy="30%" r="78%">
                <stop offset="0%" stopColor="#2A7BB0" />
                <stop offset="42%" stopColor="#10456B" />
                <stop offset="100%" stopColor="#03101A" />
              </radialGradient>
              <radialGradient id="earth-spec" cx="32%" cy="26%" r="46%">
                <stop offset="0%" stopColor="#BFE6FF" stopOpacity={0.55} />
                <stop offset="40%" stopColor="#7FC4F0" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#7FC4F0" stopOpacity={0} />
              </radialGradient>
              <radialGradient id="earth-night" cx="30%" cy="28%" r="78%">
                <stop offset="52%" stopColor="#000000" stopOpacity={0} />
                <stop offset="100%" stopColor="#000000" stopOpacity={0.9} />
              </radialGradient>
              <radialGradient id="atmos-glow" cx="50%" cy="50%" r="50%">
                <stop offset="44%" stopColor="#FF6B1A" stopOpacity={0} />
                <stop offset="74%" stopColor="#FF6B1A" stopOpacity={0.34} />
                <stop offset="88%" stopColor="#FFB347" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#FF6B1A" stopOpacity={0} />
              </radialGradient>
              <clipPath id="earth-clip">
                <circle cx={CENTER} cy={CENTER} r={GLOBE_RADIUS} />
              </clipPath>
            </defs>

            <motion.circle
              cx={CENTER}
              cy={CENTER}
              r={GLOBE_RADIUS + 64}
              fill="url(#atmos-glow)"
              style={reduceMotion ? undefined : { opacity: glowOpacity }}
            />

            <circle cx={CENTER} cy={CENTER} r={GLOBE_RADIUS + 3} fill="#FF6B1A" opacity={0.12} />
            <circle cx={CENTER} cy={CENTER} r={GLOBE_RADIUS} fill="url(#earth-ocean)" />

            <g clipPath="url(#earth-clip)">
              <path d="M148 176 q30 -20 60 -8 q26 10 16 32 q-12 26 -46 20 q-40 -6 -30 -44z" fill="#15705A" opacity={0.6} />
              <path d="M218 150 q34 -8 50 16 q12 18 -10 30 q-30 14 -50 -8 q-16 -24 10 -38z" fill="#176A4A" opacity={0.55} />
              <path d="M168 256 q32 -12 56 8 q16 16 -8 32 q-34 18 -60 -6 q-14 -22 12 -34z" fill="#135E40" opacity={0.5} />
              <path d="M250 250 q24 -6 34 12 q8 16 -12 24 q-24 8 -34 -10 q-6 -18 12 -26z" fill="#15614A" opacity={0.45} />

              {MERIDIANS.map((k) => (
                <ellipse
                  key={`mer-${k}`}
                  cx={CENTER}
                  cy={CENTER}
                  rx={GLOBE_RADIUS * k}
                  ry={GLOBE_RADIUS}
                  fill="none"
                  stroke={k === 1 ? "#FF6B1A" : "#9FD4F5"}
                  strokeOpacity={k === 1 ? 0.18 : 0.1}
                  strokeWidth={0.8}
                />
              ))}
              {PARALLELS.map((k) => (
                <ellipse
                  key={`par-${k}`}
                  cx={CENTER}
                  cy={CENTER}
                  rx={GLOBE_RADIUS}
                  ry={GLOBE_RADIUS * k}
                  fill="none"
                  stroke="#9FD4F5"
                  strokeOpacity={0.08}
                  strokeWidth={0.8}
                />
              ))}
              <line x1={CENTER - GLOBE_RADIUS} y1={CENTER} x2={CENTER + GLOBE_RADIUS} y2={CENTER} stroke="#FF6B1A" strokeOpacity={0.16} strokeWidth={0.8} />

              <g>
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 220 220"
                  to="360 220 220"
                  dur="110s"
                  repeatCount="indefinite"
                />
                <ellipse cx={CENTER - 40} cy={CENTER - 34} rx={76} ry={11} fill="#FFFFFF" opacity={0.06} />
                <ellipse cx={CENTER + 28} cy={CENTER + 30} rx={62} ry={9} fill="#FFFFFF" opacity={0.05} />
              </g>

              <ellipse cx={CENTER} cy={CENTER} rx={GLOBE_RADIUS} ry={GLOBE_RADIUS} fill="url(#earth-spec)" />
              <ellipse cx={CENTER} cy={CENTER} rx={GLOBE_RADIUS} ry={GLOBE_RADIUS} fill="url(#earth-night)" />
            </g>

            <circle cx={CENTER} cy={CENTER} r={GLOBE_RADIUS} fill="none" stroke="#FF6B1A" strokeOpacity={0.6} strokeWidth={1.5} />
            <circle cx={CENTER} cy={CENTER} r={GLOBE_RADIUS + 1.5} fill="none" stroke="#FFB347" strokeOpacity={0.18} strokeWidth={1} />
          </svg>

          <motion.div className="absolute inset-0" style={orbitStyle}>
            <svg viewBox="0 0 440 440" className="w-full h-full block">
              <circle
                cx={CENTER}
                cy={CENTER}
                r={206}
                fill="none"
                stroke="#FF6B1A"
                strokeOpacity={0.16}
                strokeWidth={0.8}
                strokeDasharray="2 8"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 220 220"
                  to="360 220 220"
                  dur="90s"
                  repeatCount="indefinite"
                />
              </circle>

              {RINGS.map((ring, index) => (
                <ellipse
                  key={`ring-${index}`}
                  cx={CENTER}
                  cy={CENTER}
                  rx={ring.radius}
                  ry={ring.radius * ring.squash}
                  fill="none"
                  stroke="#1F1F1F"
                  strokeWidth={1}
                  strokeOpacity={0.45}
                />
              ))}

              {TWINKLES.map((twinkle, index) => (
                <circle key={`twinkle-${index}`} cx={twinkle.x} cy={twinkle.y} r={twinkle.r} fill="#FFFFFF">
                  <animate
                    attributeName="opacity"
                    values="0.15;0.85;0.15"
                    dur="3.6s"
                    begin={`${twinkle.delay}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}

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
                    <circle cx={CENTER + item.radius} cy={CENTER} r={item.size + 3} fill={item.color} opacity={0.18} />
                    <circle cx={CENTER + item.radius} cy={CENTER} r={item.size} fill={item.color} />
                  </g>
                </g>
              ))}
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
