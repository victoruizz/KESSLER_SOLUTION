import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { EarthGlobe } from "./EarthGlobe";

interface EarthOrbitProps {
  size?: number;
  className?: string;
}

interface OrbitingObject {
  radius: number;
  squash: number;
  duration: number;
  size: number;
  color: string;
  startAngle: number;
  reverse?: boolean;
  panel?: boolean;
}

const CENTER = 220;

const RINGS: { radius: number; squash: number }[] = [
  { radius: 168, squash: 0.36 },
  { radius: 198, squash: 0.3 },
];

const ORBITERS: OrbitingObject[] = [
  { radius: 168, squash: 0.36, duration: 34, size: 2.4, color: "#FFB347", startAngle: 22, panel: true },
  { radius: 168, squash: 0.36, duration: 34, size: 1.7, color: "#B0B0B0", startAngle: 212 },
  { radius: 198, squash: 0.3, duration: 58, size: 2.6, color: "#FF6B1A", startAngle: 78, reverse: true },
  { radius: 198, squash: 0.3, duration: 58, size: 1.8, color: "#FFFFFF", startAngle: 268, reverse: true, panel: true },
];

const TWINKLES = [
  { x: 54, y: 84, r: 1.4, delay: 0 },
  { x: 386, y: 110, r: 1.1, delay: 1.2 },
  { x: 356, y: 360, r: 1.6, delay: 0.6 },
  { x: 70, y: 346, r: 1.2, delay: 1.8 },
  { x: 408, y: 256, r: 1, delay: 0.9 },
];

const COLLISIONS = [
  { x: 57, y: 236, dur: 7.5, delay: 0.6 },
  { x: 49, y: 190, dur: 9.2, delay: 3.4 },
  { x: 53, y: 222, dur: 8.3, delay: 5.6 },
  { x: 70, y: 262, dur: 10.4, delay: 2.1 },
];

const SPOKES: [number, number][] = [
  [0, -4],
  [3.46, -2],
  [3.46, 2],
  [0, 4],
  [-3.46, 2],
  [-3.46, -2],
];

const FLASH_KEYTIMES = "0;0.84;0.9;0.96;1";

export function EarthOrbit({ size = 600, className = "" }: EarthOrbitProps) {
  const reduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const scrollScale = useTransform(scrollY, [0, 620], [1, 1.12]);
  const scrollLift = useTransform(scrollY, [0, 620], [0, 70]);
  const ringRotate = useTransform(scrollY, [0, 1300], [0, 30]);
  const glowOpacity = useTransform(scrollY, [0, 520], [0.55, 0.85]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 60, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 60, damping: 20 });
  const tiltX = useTransform(springY, [-0.5, 0.5], [9, -9]);
  const tiltY = useTransform(springX, [-0.5, 0.5], [-11, 11]);

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
  const tiltStyle = reduceMotion
    ? undefined
    : { rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" as const };
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
        <motion.div className="relative" style={{ ...tiltStyle, aspectRatio: "1 / 1" }}>
          <div
            className="absolute rounded-full"
            style={{
              left: "11%",
              top: "11%",
              width: "78%",
              height: "78%",
              background:
                "radial-gradient(circle at 50% 50%, rgba(127,196,240,0.06) 50%, rgba(255,107,26,0.09) 72%, rgba(255,107,26,0) 100%)",
              filter: "blur(16px)",
            }}
          />

          <div
            className="absolute rounded-full overflow-hidden"
            style={{
              left: "19%",
              top: "19%",
              width: "62%",
              height: "62%",
              boxShadow: "0 0 1px rgba(255,107,26,0.6)",
            }}
          >
            <EarthGlobe />
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ boxShadow: "inset 0 0 26px rgba(127,196,240,0.32)" }}
            />
          </div>

          <motion.div
            className="absolute rounded-full"
            style={{
              left: "18.4%",
              top: "18.4%",
              width: "63.2%",
              height: "63.2%",
              border: "1px solid rgba(255,179,71,0.18)",
              ...(reduceMotion ? {} : { opacity: glowOpacity }),
            }}
          />

          <motion.div className="absolute inset-0" style={orbitStyle}>
            <svg viewBox="0 0 440 440" className="w-full h-full block">
              {RINGS.map((ring, index) => (
                <ellipse
                  key={`ring-${index}`}
                  cx={CENTER}
                  cy={CENTER}
                  rx={ring.radius}
                  ry={ring.radius * ring.squash}
                  fill="none"
                  stroke="#FFB347"
                  strokeWidth={0.8}
                  strokeOpacity={0.1}
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

              {ORBITERS.map((item, index) => (
                <g
                  key={`orbiter-${index}`}
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
                    {item.panel ? (
                      <g>
                        <rect
                          x={CENTER + item.radius - 4.6}
                          y={CENTER - 1.1}
                          width={9.2}
                          height={2.2}
                          fill={item.color}
                          opacity={0.55}
                        />
                        <circle cx={CENTER + item.radius} cy={CENTER} r={item.size + 3} fill={item.color} opacity={0.18} />
                        <circle cx={CENTER + item.radius} cy={CENTER} r={item.size} fill={item.color} />
                      </g>
                    ) : (
                      <g>
                        <circle cx={CENTER + item.radius} cy={CENTER} r={item.size + 3} fill={item.color} opacity={0.18} />
                        <circle cx={CENTER + item.radius} cy={CENTER} r={item.size} fill={item.color} />
                      </g>
                    )}
                  </g>
                </g>
              ))}

              {COLLISIONS.map((collision, index) => (
                <g key={`collision-${index}`} transform={`translate(${collision.x} ${collision.y})`}>
                  <g transform="scale(0.2)">
                    <animateTransform
                      attributeName="transform"
                      attributeType="XML"
                      type="scale"
                      values="0.2;0.2;1;1.6;2.1"
                      keyTimes={FLASH_KEYTIMES}
                      dur={`${collision.dur}s`}
                      begin={`${collision.delay}s`}
                      repeatCount="indefinite"
                    />
                    <g opacity={0}>
                      <animate
                        attributeName="opacity"
                        values="0;0;1;0.35;0"
                        keyTimes={FLASH_KEYTIMES}
                        dur={`${collision.dur}s`}
                        begin={`${collision.delay}s`}
                        repeatCount="indefinite"
                      />
                      {SPOKES.map((spoke, spokeIndex) => (
                        <line
                          key={spokeIndex}
                          x1={0}
                          y1={0}
                          x2={spoke[0]}
                          y2={spoke[1]}
                          stroke="#FFB347"
                          strokeWidth={0.6}
                          strokeLinecap="round"
                        />
                      ))}
                      <circle r={2.2} fill="#FF6B1A" />
                      <circle r={1} fill="#FFFFFF" />
                    </g>
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
