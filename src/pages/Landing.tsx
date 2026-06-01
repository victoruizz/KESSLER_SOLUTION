import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Compass, Hand } from "lucide-react";
import { Button } from "../components/ui/Button";
import { BinaryBackground } from "../components/ui/BinaryBackground";
import { StatNumber } from "../components/ui/StatNumber";
import { EarthOrbit } from "../components/visual/EarthOrbit";
import { globalStats, totalCatalogedMassKg, uniqueCountriesCount } from "../data/stats";
import { formatKg, formatNumber } from "../lib/format";

const pillars = [
  {
    icon: Eye,
    title: "Visualizar",
    description:
      "Trazemos para a luz os detritos que orbitam silenciosamente sobre nossas cabecas, mostrando trajetorias, origem e risco real.",
  },
  {
    icon: Compass,
    title: "Entender",
    description:
      "Contamos a historia de cada fragmento e traduzimos dados orbitais em uma narrativa publica, acessivel e cientifica.",
  },
  {
    icon: Hand,
    title: "Agir",
    description:
      "Permitimos que pessoas e organizacoes apoiem simbolicamente missoes de remocao, no mesmo espirito dos creditos de carbono.",
  },
];

export function Landing() {
  return (
    <div className="relative overflow-hidden">
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 grid-overlay opacity-30" aria-hidden></div>
        <BinaryBackground density={26} opacity={0.04} />

        <div
          className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 translate-x-[26%] sm:translate-x-[20%] lg:translate-x-[14%] w-[150vw] sm:w-[820px] lg:w-[1120px] xl:w-[1320px] max-w-none"
          aria-hidden
        >
          <EarthOrbit size={1320} />
        </div>

        <div
          className="absolute inset-0 bg-gradient-to-r from-space-black via-space-black/70 to-transparent"
          aria-hidden
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8 max-w-xl"
          >
            <div className="hud-label text-mars-orange">Projeto</div>
            <h1
              className="font-display font-bold tracking-[0.18em] text-text-primary uppercase leading-[0.95] glow-text"
              style={{ fontSize: "clamp(54px, 9vw, 128px)" }}
            >
              Kessler
            </h1>
            <div className="font-display text-mars-amber tracking-[0.42em] uppercase text-xs md:text-sm">
              Antes que a cascata comece.
            </div>
            <p className="text-text-secondary text-base md:text-lg max-w-lg leading-relaxed">
              Uma plataforma publica para visualizar, compreender e apoiar a remocao dos detritos
              espaciais em orbita da Terra. Inspirada nos creditos de carbono, ela transforma uma
              ameaca silenciosa em uma agenda visivel.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/dashboard">
                <Button size="lg">
                  Explorar plataforma <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/catalogo">
                <Button size="lg" variant="secondary">
                  Ver catalogo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-space-border bg-space-surface/40">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid gap-8 md:grid-cols-4">
          <StatNumber
            label="Objetos rastreados"
            value={formatNumber(globalStats.trackedObjects)}
            description="Maiores que 10 cm catalogados em orbita."
          />
          <StatNumber
            label="Fragmentos menores"
            value={`${formatNumber(globalStats.smallFragments / 1000000)} mi`}
            description="Entre 1 cm e 10 cm — invisiveis e letais."
          />
          <StatNumber
            label="Velocidade media"
            value={`${formatNumber(globalStats.averageSpeedKmh / 1000)} mil km/h`}
            description="A energia de uma bala em cada estilhaco."
          />
          <StatNumber
            label="Massa catalogada"
            value={formatKg(totalCatalogedMassKg())}
            description={`${uniqueCountriesCount()} paises de origem representados.`}
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 grid gap-14 lg:grid-cols-2 lg:items-center">
        <div className="space-y-5">
          <div className="hud-label text-mars-orange">O problema</div>
          <h2 className="font-display text-3xl md:text-4xl tracking-wide uppercase">
            O ceu esta cheio do que ja nao usamos.
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Desde 1957 acumulamos satelites mortos, estagios de foguetes e fragmentos de explosoes e
            colisoes. Em 1978, Donald Kessler descreveu o risco de uma reacao em cadeia: detritos
            colidindo entre si geram mais detritos, ate que orbitas inteiras se tornem inutilizaveis.
          </p>
          <p className="text-text-secondary leading-relaxed">
            A sindrome de Kessler nao e ficcao cientifica. Cada teste antissatelite, cada estagio
            abandonado e cada satelite sem plano de descomissionamento aumenta a probabilidade da
            cascata. O Kessler nasceu para tornar esse risco visivel e endereçavel.
          </p>
        </div>
        <div className="space-y-5">
          <div className="hud-label text-mars-orange">A solucao</div>
          <h2 className="font-display text-3xl md:text-4xl tracking-wide uppercase">Tres pilares.</h2>
          <div className="space-y-3">
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="surface-panel p-5 flex gap-4 hover:border-mars-orange/50"
              >
                <div className="w-10 h-10 border border-mars-orange/60 flex items-center justify-center text-mars-orange">
                  <pillar.icon size={18} />
                </div>
                <div>
                  <div className="font-display tracking-hud uppercase text-sm text-text-primary">
                    {pillar.title}
                  </div>
                  <p className="text-text-secondary text-sm mt-1 leading-relaxed">{pillar.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
