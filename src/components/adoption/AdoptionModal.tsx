import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Debris } from "../../types";
import { Button } from "../ui/Button";
import { formatBrl } from "../../lib/format";
import { useKessler } from "../../hooks/useKessler";
import { AdoptionCertificate } from "./AdoptionCertificate";

interface AdoptionModalProps {
  debris: Debris;
  open: boolean;
  onClose: () => void;
}

const PRESETS = [25, 50, 100];

export function AdoptionModal({ debris, open, onClose }: AdoptionModalProps) {
  const { adopt } = useKessler();
  const [supporterName, setSupporterName] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [step, setStep] = useState<"FORM" | "CERTIFICATE">("FORM");
  const [confirmed, setConfirmed] = useState<{ amount: number; date: string; serial: string } | null>(null);

  useEffect(() => {
    if (!open) {
      setSupporterName("");
      setSelectedAmount(50);
      setCustomAmount("");
      setStep("FORM");
      setConfirmed(null);
    }
  }, [open]);

  if (!open) return null;

  const parsedCustom = Number(customAmount.replace(/[^0-9]/g, ""));
  const finalAmount = selectedAmount ?? (parsedCustom > 0 ? parsedCustom : 0);
  const canSubmit = supporterName.trim().length >= 2 && finalAmount > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const date = new Date().toISOString();
    const serial = `KSL-${debris.id}-${Date.now().toString().slice(-6)}`;
    adopt({
      debrisId: debris.id,
      amountBrl: finalAmount,
      date,
      supporterName: supporterName.trim(),
    });
    setConfirmed({ amount: finalAmount, date, serial });
    setStep("CERTIFICATE");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto surface-panel-elevated p-6 md:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        {step === "FORM" && (
          <div className="space-y-6">
            <div>
              <div className="hud-label text-mars-orange">Adotar detrito</div>
              <h3 className="font-display text-2xl text-text-primary mt-2">{debris.name}</h3>
              <p className="text-text-secondary text-sm mt-2">
                Sua contribuicao simbolica entra na meta de remocao deste detrito. Os valores ficam
                registrados apenas neste navegador como demonstracao da Global Solution.
              </p>
            </div>

            <div className="space-y-2">
              <label className="hud-label">Seu nome</label>
              <input
                type="text"
                value={supporterName}
                onChange={(event) => setSupporterName(event.target.value)}
                placeholder="Como deve aparecer no certificado"
                className="w-full bg-space-black border border-space-border px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-mars-orange"
              />
            </div>

            <div className="space-y-2">
              <div className="hud-label">Valor sugerido</div>
              <div className="grid grid-cols-3 gap-2">
                {PRESETS.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className={`py-3 font-display border ${
                      selectedAmount === amount
                        ? "bg-mars-orange/15 border-mars-orange text-mars-orange"
                        : "border-space-border text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {formatBrl(amount)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="hud-label">Ou valor livre (R$)</label>
              <input
                type="text"
                value={customAmount}
                onChange={(event) => {
                  setCustomAmount(event.target.value);
                  setSelectedAmount(null);
                }}
                placeholder="Ex: 250"
                className="w-full bg-space-black border border-space-border px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-mars-orange"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-space-border">
              <div>
                <div className="hud-label">Total</div>
                <div className="font-display text-mars-orange text-2xl mt-1">{formatBrl(finalAmount)}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={onClose}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmit} disabled={!canSubmit}>
                  Confirmar apoio
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === "CERTIFICATE" && confirmed && (
          <div className="space-y-6">
            <AdoptionCertificate
              debris={debris}
              amountBrl={confirmed.amount}
              supporterName={supporterName.trim()}
              date={confirmed.date}
              serial={confirmed.serial}
            />
            <div className="flex items-center justify-end gap-2">
              <Button variant="secondary" onClick={onClose}>
                Fechar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
