import { Logo } from "../ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-space-border mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 grid gap-8 md:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Logo size={30} className="shrink-0 text-text-primary" />
            <div className="font-display font-bold text-base tracking-[0.32em] text-text-primary">KESSLER</div>
          </div>
          <p className="text-text-tertiary text-xs leading-relaxed max-w-xs">
            Antes que a cascata comece. Plataforma de visibilidade e remocao de detritos espaciais
            desenvolvida para a FIAP Global Solution 2026.1.
          </p>
        </div>
        <div className="space-y-2">
          <div className="hud-label">Equipe</div>
          <div className="text-text-secondary text-sm">Victor Ruiz Vieira — RM559209</div>
          <div className="text-text-secondary text-sm">Leonardo Mortari — RM558618</div>
          <div className="text-text-tertiary text-xs">Turma 3SIR</div>
        </div>
        <div className="space-y-2">
          <div className="hud-label">Contexto</div>
          <div className="text-text-secondary text-sm">Industria Espacial</div>
          <div className="text-text-tertiary text-xs">ODS 9 — Industria, Inovacao e Infraestrutura</div>
          <div className="text-text-tertiary text-xs">ODS 13 — Acao Climatica</div>
        </div>
      </div>
      <div className="border-t border-space-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 text-text-tertiary text-xs flex items-center justify-between">
          <span>Sistema operacional Kessler v1.0</span>
          <span className="hud-label">Antes que a cascata comece.</span>
        </div>
      </div>
    </footer>
  );
}
