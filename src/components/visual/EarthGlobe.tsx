import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface EarthGlobeProps {
  className?: string;
  resolution?: number;
  spinSeconds?: number;
}

const TEXTURE = "/earth-texture.jpg";
const LIGHT = normalize(-0.52, -0.46, 0.72);
const AMBIENT = 0.16;

function normalize(x: number, y: number, z: number) {
  const length = Math.sqrt(x * x + y * y + z * z);
  return { x: x / length, y: y / length, z: z / length };
}

export function EarthGlobe({ className = "", resolution = 680, spinSeconds = 70 }: EarthGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const size = resolution;
    canvas.width = size;
    canvas.height = size;
    const center = size / 2;
    const radius = size / 2 - 1;

    let pixelIndex: Int32Array = new Int32Array(0);
    let baseLon: Float32Array = new Float32Array(0);
    let texRow: Int32Array = new Int32Array(0);
    let shade: Float32Array = new Float32Array(0);
    let count = 0;

    const output = ctx.createImageData(size, size);
    const outData = output.data;

    let texData: Uint8ClampedArray | null = null;
    let texWidth = 0;
    let texHeight = 0;
    let raf = 0;
    let active = true;

    const buildGeometry = () => {
      const positions: number[] = [];
      const lons: number[] = [];
      const rows: number[] = [];
      const shades: number[] = [];
      for (let py = 0; py < size; py++) {
        const ny = (py - center) / radius;
        for (let px = 0; px < size; px++) {
          const nx = (px - center) / radius;
          const d2 = nx * nx + ny * ny;
          if (d2 > 1) continue;
          const nz = Math.sqrt(1 - d2);
          const idx = (py * size + px) * 4;

          const latitude = Math.asin(Math.max(-1, Math.min(1, -ny)));
          const longitude = Math.atan2(nx, nz);

          const v = 0.5 - latitude / Math.PI;
          const ty = Math.min(texHeight - 1, Math.max(0, (v * texHeight) | 0));

          let diffuse = nx * LIGHT.x + ny * LIGHT.y + nz * LIGHT.z;
          if (diffuse < 0) diffuse = 0;
          let lightValue = AMBIENT + diffuse * 1.12;
          const limb = 0.55 + 0.45 * nz;
          lightValue *= limb;
          if (lightValue > 1.18) lightValue = 1.18;

          let alpha = 255;
          if (d2 > 0.984) alpha = Math.round(255 * Math.max(0, (1 - d2) / 0.016));

          outData[idx + 3] = alpha;
          positions.push(idx);
          lons.push(longitude / (Math.PI * 2));
          rows.push(ty * texWidth);
          shades.push(lightValue);
        }
      }
      pixelIndex = Int32Array.from(positions);
      baseLon = Float32Array.from(lons);
      texRow = Int32Array.from(rows);
      shade = Float32Array.from(shades);
      count = pixelIndex.length;
    };

    const start = performance.now();

    const render = (now: number) => {
      if (!active) return;
      if (!texData) {
        raf = requestAnimationFrame(render);
        return;
      }
      const elapsed = (now - start) / 1000;
      const offset = reduceMotion ? 0.0 : (elapsed / spinSeconds) % 1;
      const data = texData;
      for (let i = 0; i < count; i++) {
        let u = baseLon[i] + offset;
        u -= Math.floor(u);
        const tx = (u * texWidth) | 0;
        const ti = (texRow[i] + tx) * 4;
        const out = pixelIndex[i];
        const s = shade[i];
        let r = data[ti] * s;
        let g = data[ti + 1] * s;
        let b = data[ti + 2] * s;
        if (r > 255) r = 255;
        if (g > 255) g = 255;
        if (b > 255) b = 255;
        outData[out] = r;
        outData[out + 1] = g;
        outData[out + 2] = b;
      }
      ctx.putImageData(output, 0, 0);
      if (!reduceMotion) raf = requestAnimationFrame(render);
    };

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      texWidth = image.naturalWidth;
      texHeight = image.naturalHeight;
      const off = document.createElement("canvas");
      off.width = texWidth;
      off.height = texHeight;
      const offCtx = off.getContext("2d");
      if (!offCtx) return;
      offCtx.drawImage(image, 0, 0);
      texData = offCtx.getImageData(0, 0, texWidth, texHeight).data;
      buildGeometry();
      raf = requestAnimationFrame(render);
    };
    image.src = TEXTURE;

    return () => {
      active = false;
      cancelAnimationFrame(raf);
    };
  }, [resolution, spinSeconds, reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className}`}
      style={{ borderRadius: "50%" }}
      aria-hidden
    />
  );
}
