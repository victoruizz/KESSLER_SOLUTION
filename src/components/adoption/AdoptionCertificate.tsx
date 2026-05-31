import type { Debris } from "../../types";
import { formatBrl, formatDate } from "../../lib/format";
import { OrbitalRings } from "../visual/OrbitalRings";

interface AdoptionCertificateProps {
  debris: Debris;
  amountBrl: number;
  supporterName: string;
  date: string;
  serial: string;
}

export function AdoptionCertificate({
  debris,
  amountBrl,
  supporterName,
  date,
  serial,
}: AdoptionCertificateProps) {
  return (
    <div className="relative overflow-hidden surface-panel p-8 md:p-10 border border-mars-orange/40">
      <div className="absolute -top-16 -right-16 opacity-50">
        <OrbitalRings size={280} />
      </div>
      <div className="absolute inset-0 grid-overlay opacity-30" aria-hidden></div>

      <div className="relative space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="hud-label text-mars-orange">Certificado oficial</div>
            <div className="font-display text-2xl tracking-[0.32em] text-text-primary mt-1">KESSLER</div>
          </div>
          <div className="text-right">
            <div className="hud-label">Serial</div>
            <div className="font-display text-mars-orange text-sm mt-1">{serial}</div>
          </div>
        </div>

        <div className="border-t border-space-border pt-6">
          <div className="hud-label">Apoiador da remocao orbital</div>
          <div className="font-display text-3xl md:text-4xl text-text-primary mt-3 leading-tight">
            {supporterName}
          </div>
          <p className="text-text-secondary text-sm mt-4 leading-relaxed max-w-xl">
            Reconhecemos sua contribuicao simbolica para a remocao do detrito catalogado abaixo,
            ajudando a evitar a sindrome de Kessler e preservar as orbitas de uso comum.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 border border-space-border p-5">
          <div>
            <div className="hud-label">Detrito apoiado</div>
            <div className="text-mars-orange font-display text-lg mt-1">{debris.id}</div>
            <div className="text-text-primary text-sm mt-1">{debris.name}</div>
            <div className="text-text-tertiary text-xs mt-1">{debris.countryOfOrigin} — {debris.launchYear}</div>
          </div>
          <div>
            <div className="hud-label">Contribuicao</div>
            <div className="text-text-primary font-display text-2xl mt-1">{formatBrl(amountBrl)}</div>
            <div className="text-text-tertiary text-xs mt-1">Emitido em {formatDate(date)}</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-space-border">
          <div className="hud-label">Antes que a cascata comece.</div>
          <div className="hud-label text-mars-orange">FIAP GS 2026.1</div>
        </div>
      </div>
    </div>
  );
}
