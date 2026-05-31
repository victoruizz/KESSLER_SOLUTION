import { NavLink, Link } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Painel" },
  { to: "/catalogo", label: "Catalogo" },
  { to: "/meu-impacto", label: "Meu Impacto" },
  { to: "/sobre", label: "Sobre" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-space-black/85 border-b border-space-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="block w-6 h-6 border border-mars-orange relative">
            <span className="absolute inset-1 bg-mars-orange/70 group-hover:bg-mars-orange transition-colors"></span>
          </span>
          <div className="leading-tight">
            <div className="font-display font-bold text-base tracking-[0.32em] text-text-primary">KESSLER</div>
            <div className="hud-label text-mars-orange -mt-0.5">Projeto</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-display tracking-hud uppercase text-[11px] px-3 py-2 border border-transparent transition-colors ${
                  isActive
                    ? "text-mars-orange border-mars-orange/40"
                    : "text-text-secondary hover:text-text-primary"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <span className="hud-label">FIAP GS 2026.1</span>
          <span className="w-2 h-2 bg-mars-orange animate-pulse-orange"></span>
        </div>
      </div>
    </header>
  );
}
