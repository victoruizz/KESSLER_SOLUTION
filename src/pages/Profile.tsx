import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, Trash2, Check, LogOut, ArrowRight, Mail, Calendar, BadgeCheck } from "lucide-react";
import { PageShell } from "../components/layout/PageShell";
import { SectionTitle } from "../components/ui/SectionTitle";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { StatNumber } from "../components/ui/StatNumber";
import { Avatar } from "../components/ui/Avatar";
import { OrbitalRings } from "../components/visual/OrbitalRings";
import { useSession } from "../auth/session";
import { useKessler } from "../hooks/useKessler";
import { getSupporterStanding } from "../lib/impact";
import { cropImageToSquareDataUrl } from "../lib/image";
import { formatBrl, formatDate, formatNumber } from "../lib/format";

type FeedbackKind = "success" | "error";

export function Profile() {
  const navigate = useNavigate();
  const { session, updateProfile, logout } = useSession();
  const { getUserContributedTotal, getUserSupportedDebris } = useKessler();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(session?.name ?? "");
  const [feedback, setFeedback] = useState<{ kind: FeedbackKind; message: string } | null>(null);

  if (!session) return null;

  const contributed = getUserContributedTotal();
  const supportedCount = getUserSupportedDebris().length;
  const standing = getSupporterStanding(contributed);

  const trimmedName = name.trim();
  const nameChanged = trimmedName.length > 0 && trimmedName !== session.name;

  const handleNameSave = () => {
    if (trimmedName.length < 2) {
      setFeedback({ kind: "error", message: "Informe um nome com ao menos dois caracteres." });
      return;
    }
    updateProfile({ name: trimmedName });
    setFeedback({ kind: "success", message: "Nome atualizado." });
  };

  const handlePhotoButton = () => {
    setFeedback(null);
    fileInputRef.current?.click();
  };

  const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const dataUrl = await cropImageToSquareDataUrl(file, 256);
      updateProfile({ avatar: dataUrl });
      setFeedback({ kind: "success", message: "Foto atualizada." });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Nao foi possivel processar a imagem.";
      setFeedback({ kind: "error", message });
    }
  };

  const handleRemovePhoto = () => {
    updateProfile({ avatar: null });
    setFeedback({ kind: "success", message: "Foto removida." });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <PageShell>
      <div className="space-y-12">
        <SectionTitle
          eyebrow="Conta"
          title="Meu perfil"
          description="Gerencie sua identidade na plataforma. Seus dados ficam salvos apenas neste navegador."
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <Card elevated className="relative overflow-hidden">
            <div className="absolute -top-16 -right-16 opacity-30 pointer-events-none" aria-hidden>
              <OrbitalRings size={220} />
            </div>
            <div className="relative space-y-8">
              <div className="flex items-center gap-5">
                <Avatar name={session.name} src={session.avatar} size={112} glow />
                <div className="min-w-0">
                  <div className="hud-label text-mars-orange">{session.visitor ? "Visitante" : "Operador"}</div>
                  <div className="font-display text-2xl text-text-primary truncate mt-1">{session.name}</div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Button size="sm" variant="secondary" onClick={handlePhotoButton}>
                      <Camera size={14} /> {session.avatar ? "Trocar foto" : "Adicionar foto"}
                    </Button>
                    {session.avatar && (
                      <Button size="sm" variant="ghost" onClick={handleRemovePhoto}>
                        <Trash2 size={14} /> Remover
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
              <p className="text-text-tertiary text-xs leading-relaxed -mt-4">
                JPG ou PNG de ate 6 MB. A imagem e recortada em quadrado e armazenada apenas neste navegador.
              </p>

              <div className="space-y-2">
                <label className="hud-label block" htmlFor="profile-name">
                  Nome de exibicao
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="profile-name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      setFeedback(null);
                    }}
                    maxLength={40}
                    placeholder="Como devemos te chamar"
                    className="flex-1 bg-space-black border border-space-border px-3 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-mars-orange transition-colors"
                  />
                  <Button onClick={handleNameSave} disabled={!nameChanged}>
                    <Check size={16} /> Salvar
                  </Button>
                </div>
              </div>

              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-xs font-display tracking-hud uppercase ${
                    feedback.kind === "success" ? "text-risk-low" : "text-risk-critical"
                  }`}
                >
                  {feedback.message}
                </motion.div>
              )}

              <div className="grid sm:grid-cols-3 gap-px bg-space-border border border-space-border">
                <div className="bg-space-surface p-4">
                  <div className="hud-label flex items-center gap-2">
                    <Mail size={12} /> E-mail
                  </div>
                  <div className="text-text-primary text-sm mt-2 truncate">
                    {session.visitor ? "Sessao de visitante" : session.email}
                  </div>
                </div>
                <div className="bg-space-surface p-4">
                  <div className="hud-label flex items-center gap-2">
                    <BadgeCheck size={12} /> Tipo de conta
                  </div>
                  <div className="text-text-primary text-sm mt-2">
                    {session.visitor ? "Visitante" : "Operador"}
                  </div>
                </div>
                <div className="bg-space-surface p-4">
                  <div className="hud-label flex items-center gap-2">
                    <Calendar size={12} /> Membro desde
                  </div>
                  <div className="text-text-primary text-sm mt-2">{formatDate(session.since)}</div>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card>
              <div className="hud-label text-mars-orange">Resumo de impacto</div>
              <div className="grid grid-cols-2 gap-6 mt-5">
                <StatNumber label="Total contribuido" value={formatBrl(contributed)} />
                <StatNumber label="Detritos apoiados" value={formatNumber(supportedCount)} emphasized={false} />
              </div>
              <div className="mt-6 border-t border-space-border pt-5">
                <div className="hud-label">Nivel de apoiador</div>
                <div className="font-display text-xl text-text-primary mt-1">{standing.current.name}</div>
                <div className="h-2 bg-space-black border border-space-border mt-3">
                  <div className="h-full bg-mars-orange" style={{ width: `${standing.progressToNext * 100}%` }} />
                </div>
                <div className="text-text-tertiary text-xs mt-2">
                  {standing.next
                    ? `Faltam ${formatBrl(standing.amountToNext)} para ${standing.next.name}`
                    : "Nivel maximo alcancado"}
                </div>
              </div>
              <div className="mt-6">
                <Link to="/meu-impacto">
                  <Button variant="secondary" className="w-full">
                    Ver meu impacto <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </Card>

            <Card>
              <div className="hud-label text-mars-orange">Sessao</div>
              <p className="text-text-secondary text-sm mt-3 leading-relaxed">
                Encerre a sessao para voltar a tela de acesso. Suas adocoes e detritos monitorados permanecem
                salvos neste navegador.
              </p>
              <div className="mt-5">
                <Button variant="danger" onClick={handleLogout}>
                  <LogOut size={16} /> Sair da conta
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
