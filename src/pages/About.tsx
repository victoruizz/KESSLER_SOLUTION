import { PageShell } from "../components/layout/PageShell";
import { SectionTitle } from "../components/ui/SectionTitle";
import { Card } from "../components/ui/Card";
import { OrbitalRings } from "../components/visual/OrbitalRings";

const team = [
  { name: "Victor Ruiz Vieira", rm: "RM559209" },
  { name: "Leonardo Mortari", rm: "RM558618" },
];

const sdgs = [
  {
    code: "ODS 9",
    title: "Industria, Inovacao e Infraestrutura",
    description:
      "Promover infraestrutura espacial sustentavel e inovacao tecnologica na remocao ativa de detritos.",
  },
  {
    code: "ODS 13",
    title: "Acao Climatica",
    description:
      "Proteger o sistema climatico ao garantir a continuidade dos satelites de monitoramento ambiental.",
  },
];

export function About() {
  return (
    <PageShell>
      <div className="space-y-12">
        <div className="relative overflow-hidden surface-panel p-8 md:p-12">
          <div className="absolute -right-16 -top-12 opacity-50">
            <OrbitalRings size={320} />
          </div>
          <div className="relative max-w-3xl space-y-5">
            <div className="hud-label text-mars-orange">Sobre o projeto</div>
            <h1 className="font-display text-3xl md:text-4xl uppercase tracking-wide">Kessler</h1>
            <p className="text-text-secondary leading-relaxed">
              Kessler e a aplicacao oficial apresentada na Global Solution 2026.1 da FIAP, com o tema
              Industria Espacial. O projeto da visibilidade publica ao lixo espacial, conta a
              historia de cada detrito, calcula seu risco e permite que pessoas e organizacoes apoiem
              simbolicamente a remocao desses fragmentos, num modelo inspirado em creditos de carbono.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <SectionTitle
              eyebrow="Inspiracao"
              title="A sindrome de Kessler"
              description="Em 1978, o engenheiro Donald J. Kessler descreveu um cenario em que a densidade de objetos na orbita baixa da Terra ficaria alta o suficiente para gerar uma cascata de colisoes. Cada colisao produziria mais fragmentos, ate inviabilizar atividades espaciais por geracoes."
            />
            <p className="text-text-secondary text-sm leading-relaxed mt-5">
              Hoje vivemos os primeiros sinais desse cenario. Testes antissatelite, satelites
              abandonados, estagios de foguetes e tanques de combustivel que continuam pressurizados
              alimentam o problema. O Kessler nasce para tornar essa ameaca tangivel para o publico
              geral.
            </p>
          </Card>

          <Card>
            <SectionTitle
              eyebrow="Proposito"
              title="Por que isso importa"
              description="Quase tudo o que conecta o nosso cotidiano depende de orbitas saudaveis: previsao do tempo, agricultura, navegacao, internet, monitoramento de queimadas e da Amazonia, transmissoes financeiras."
            />
            <p className="text-text-secondary text-sm leading-relaxed mt-5">
              Proteger as orbitas e proteger infraestrutura critica da humanidade. O Kessler propoe
              uma camada civil de pressao publica e financiamento simbolico, conectando cidadaos a
              missoes de remocao reais ou em estudo.
            </p>
          </Card>
        </div>

        <div className="space-y-5">
          <SectionTitle
            eyebrow="Objetivos de desenvolvimento sustentavel"
            title="ODS conectados"
            description="A solucao Kessler dialoga diretamente com duas frentes da Agenda 2030."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {sdgs.map((sdg) => (
              <Card key={sdg.code} elevated>
                <div className="hud-label text-mars-orange">{sdg.code}</div>
                <div className="font-display text-xl mt-2">{sdg.title}</div>
                <p className="text-text-secondary text-sm leading-relaxed mt-3">{sdg.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <SectionTitle eyebrow="Equipe" title="Quem construiu o Kessler" />
          <div className="grid gap-4 md:grid-cols-2">
            {team.map((member) => (
              <Card key={member.rm}>
                <div className="hud-label text-mars-orange">{member.rm}</div>
                <div className="font-display text-2xl mt-2">{member.name}</div>
                <div className="text-text-tertiary text-xs mt-2">Turma 3SIR</div>
              </Card>
            ))}
          </div>
        </div>

        <div className="surface-panel-elevated p-8 text-center">
          <div className="hud-label text-mars-orange">FIAP Global Solution 2026.1</div>
          <div className="font-display tracking-[0.42em] uppercase text-mars-amber mt-4">
            Antes que a cascata comece.
          </div>
        </div>
      </div>
    </PageShell>
  );
}
