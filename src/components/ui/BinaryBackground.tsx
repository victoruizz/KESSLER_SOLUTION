import { useMemo } from "react";

interface BinaryBackgroundProps {
  density?: number;
  opacity?: number;
  className?: string;
}

export function BinaryBackground({ density = 36, opacity = 0.05, className = "" }: BinaryBackgroundProps) {
  const rows = useMemo(() => {
    const result: string[] = [];
    let seed = 7;
    for (let i = 0; i < density; i++) {
      let line = "";
      for (let j = 0; j < 120; j++) {
        seed = (seed * 9301 + 49297) % 233280;
        line += seed % 2 === 0 ? "0" : "1";
      }
      result.push(line);
    }
    return result;
  }, [density]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      style={{ opacity }}
      aria-hidden
    >
      <div className="absolute inset-0 font-mono text-[10px] leading-[14px] text-mars-orange whitespace-pre">
        {rows.map((row, idx) => (
          <div key={idx}>{row}</div>
        ))}
      </div>
    </div>
  );
}
