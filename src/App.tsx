import { useKessler } from "./hooks/useKessler";
import { totalCatalogedMassKg } from "./data/stats";
import { formatKg } from "./lib/format";

export default function App() {
  const { debris } = useKessler();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-6 max-w-xl">
        <div className="hud-label text-mars-orange">Projeto</div>
        <h1 className="font-display font-bold tracking-[0.32em] text-4xl md:text-6xl mt-4">
          KESSLER
        </h1>
        <div className="font-display text-mars-amber tracking-[0.42em] uppercase text-xs mt-5">
          Antes que a cascata comece.
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 text-left">
          <div className="surface-panel p-4">
            <div className="hud-label">Detritos catalogados</div>
            <div className="font-display text-mars-orange text-3xl mt-2">{debris.length}</div>
          </div>
          <div className="surface-panel p-4">
            <div className="hud-label">Massa em orbita</div>
            <div className="font-display text-mars-orange text-3xl mt-2">{formatKg(totalCatalogedMassKg())}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
