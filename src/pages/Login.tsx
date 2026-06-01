import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Logo } from "../components/ui/Logo";
import { OrbitalRings } from "../components/visual/OrbitalRings";
import { useSession } from "../auth/session";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Login() {
  const navigate = useNavigate();
  const { login, continueAsVisitor } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Informe um e-mail valido.");
      return;
    }
    if (password.trim().length < 4) {
      setError("A senha precisa ter ao menos quatro caracteres.");
      return;
    }
    setError(null);
    login(email.trim());
    navigate("/dashboard");
  };

  const handleVisitor = () => {
    continueAsVisitor();
    navigate("/dashboard");
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 py-16">
      <div className="absolute -top-24 -right-24 opacity-40 pointer-events-none">
        <OrbitalRings size={420} />
      </div>
      <div className="absolute -bottom-32 -left-24 opacity-25 pointer-events-none">
        <OrbitalRings size={360} />
      </div>

      <motion.div
        className="relative w-full max-w-md surface-panel-elevated p-8 md:p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 grid-overlay opacity-20" aria-hidden></div>

        <div className="relative">
          <div className="flex items-center gap-3">
            <Logo size={42} className="shrink-0 text-text-primary" />
            <div className="leading-tight">
              <div className="font-display font-bold text-lg tracking-[0.32em] text-text-primary">KESSLER</div>
              <div className="hud-label text-mars-orange -mt-0.5">Acesso a plataforma</div>
            </div>
          </div>

          <h1 className="font-display text-2xl text-text-primary mt-8 leading-tight uppercase tracking-wide">
            Entrar na estacao
          </h1>
          <p className="text-text-secondary text-sm mt-2">
            Identifique-se para acompanhar seu impacto na remocao orbital. Antes que a cascata comece.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <div className="space-y-2">
              <label className="hud-label block" htmlFor="login-email">
                E-mail
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="operador@kessler.space"
                autoComplete="email"
                className="w-full bg-space-black border border-space-border px-3 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-mars-orange transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="hud-label block" htmlFor="login-password">
                Senha
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Minimo de quatro caracteres"
                autoComplete="current-password"
                className="w-full bg-space-black border border-space-border px-3 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-mars-orange transition-colors"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-risk-critical text-xs font-display tracking-hud uppercase"
              >
                {error}
              </motion.div>
            )}

            <Button type="submit" size="lg" className="w-full">
              <Rocket size={16} /> Entrar
            </Button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <span className="h-px flex-1 bg-space-border" />
            <span className="hud-label">ou</span>
            <span className="h-px flex-1 bg-space-border" />
          </div>

          <Button variant="secondary" size="lg" className="w-full" onClick={handleVisitor}>
            Continuar como visitante <ArrowRight size={16} />
          </Button>

          <p className="text-text-tertiary text-xs mt-6 leading-relaxed">
            Login simulado e armazenado apenas neste navegador para fins de demonstracao da Global Solution.
          </p>
        </div>
      </motion.div>
    </main>
  );
}
