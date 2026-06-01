import { NavLink, Link } from "react-router-dom";
import { Avatar } from "../ui/Avatar";
import { Logo } from "../ui/Logo";
import { useSession } from "../../auth/session";

const links = [
  { to: "/dashboard", label: "Painel" },
  { to: "/catalogo", label: "Catalogo" },
  { to: "/meu-impacto", label: "Meu Impacto" },
  { to: "/sobre", label: "Sobre" },
];

export function Navbar() {
  const { session } = useSession();

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-space-black/85 border-b border-space-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <Logo size={36} className="shrink-0 text-text-primary group-hover:text-mars-orange transition-colors" />
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
        <NavLink
          to="/perfil"
          className={({ isActive }) =>
            `flex items-center gap-3 pl-1 pr-1.5 py-1 border transition-colors ${
              isActive ? "border-mars-orange/50" : "border-transparent hover:border-space-border"
            }`
          }
        >
          {session && (
            <span className="hidden sm:flex flex-col items-end leading-tight">
              <span className="font-display text-[11px] tracking-[0.12em] text-text-primary max-w-[10rem] truncate">
                {session.name}
              </span>
              <span className="hud-label text-mars-orange -mt-0.5">
                {session.visitor ? "Visitante" : "Operador"}
              </span>
            </span>
          )}
          <Avatar name={session?.name ?? "Operador"} src={session?.avatar} size={36} />
        </NavLink>
      </div>
    </header>
  );
}
