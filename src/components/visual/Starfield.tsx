import { useEffect, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface StarLayerConfig {
  count: number;
  size: number;
  depth: number;
  opacity: number;
}

const LAYERS: StarLayerConfig[] = [
  { count: 90, size: 1, depth: 8, opacity: 0.5 },
  { count: 55, size: 1.5, depth: 16, opacity: 0.7 },
  { count: 28, size: 2, depth: 28, opacity: 0.9 },
];

function buildBoxShadow(count: number, seedStart: number): string {
  let seed = seedStart;
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    const x = (seed / 233280) * 2000 - 1000;
    seed = (seed * 9301 + 49297) % 233280;
    const y = (seed / 233280) * 2000 - 1000;
    shadows.push(`${x.toFixed(0)}px ${y.toFixed(0)}px rgba(255,255,255,0.85)`);
  }
  return shadows.join(", ");
}

function StarLayer({ config, index }: { config: StarLayerConfig; index: number }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 40, damping: 18 });
  const springY = useSpring(pointerY, { stiffness: 40, damping: 18 });
  const translateX = useTransform(springX, (value) => value * config.depth);
  const translateY = useTransform(springY, (value) => value * config.depth);

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      pointerX.set(nx);
      pointerY.set(ny);
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [pointerX, pointerY]);

  const shadow = useMemo(() => buildBoxShadow(config.count, 7 + index * 131), [config.count, index]);

  return (
    <motion.div
      aria-hidden
      style={{ x: translateX, y: translateY, opacity: config.opacity }}
      className="absolute left-1/2 top-1/2"
    >
      <div
        style={{
          width: config.size,
          height: config.size,
          borderRadius: "50%",
          background: "transparent",
          boxShadow: shadow,
        }}
      />
    </motion.div>
  );
}

export function Starfield() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-space-black">
      <div className="absolute inset-0 starfield-drift">
        {LAYERS.map((config, index) => (
          <StarLayer key={index} config={config} index={index} />
        ))}
      </div>
      <div className="absolute -bottom-1/3 left-1/2 -translate-x-1/2 w-[160vw] h-[80vh] atmosphere-curve" aria-hidden />
    </div>
  );
}
