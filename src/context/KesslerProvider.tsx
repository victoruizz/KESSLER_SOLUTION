import { createContext, useContext, useMemo, type ReactNode } from "react";
import { debrisCatalog, getDebrisById } from "../data/debris";
import { removalMissions } from "../data/missions";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Adoption, Debris, RemovalMission } from "../types";

interface KesslerContextValue {
  debris: Debris[];
  missions: RemovalMission[];
  adoptions: Adoption[];
  monitoredIds: string[];
  adopt: (input: Adoption) => void;
  toggleMonitor: (debrisId: string) => void;
  isMonitored: (debrisId: string) => boolean;
  resetAll: () => void;
  getDebris: (id: string) => Debris | undefined;
  getFundedTotalForDebris: (id: string) => number;
  getGlobalFundedTotal: () => number;
  getUserContributedTotal: () => number;
  getUserSupportedDebris: () => Debris[];
  getUserMassRemovedKg: () => number;
}

const KesslerContext = createContext<KesslerContextValue | null>(null);

const ADOPTIONS_KEY = "kessler.adoptions.v1";
const MONITORED_KEY = "kessler.monitored.v1";

export function KesslerProvider({ children }: { children: ReactNode }) {
  const [adoptions, setAdoptions] = useLocalStorage<Adoption[]>(ADOPTIONS_KEY, []);
  const [monitoredIds, setMonitoredIds] = useLocalStorage<string[]>(MONITORED_KEY, []);

  const value = useMemo<KesslerContextValue>(() => {
    const adopt = (input: Adoption) => {
      setAdoptions([...adoptions, input]);
    };

    const toggleMonitor = (debrisId: string) => {
      if (monitoredIds.includes(debrisId)) {
        setMonitoredIds(monitoredIds.filter((id) => id !== debrisId));
      } else {
        setMonitoredIds([...monitoredIds, debrisId]);
      }
    };

    const isMonitored = (debrisId: string) => monitoredIds.includes(debrisId);

    const resetAll = () => {
      setAdoptions([]);
      setMonitoredIds([]);
    };

    const getDebris = (id: string) => getDebrisById(id);

    const getFundedTotalForDebris = (id: string) => {
      const base = getDebrisById(id)?.fundedBrl ?? 0;
      const extra = adoptions
        .filter((adoption) => adoption.debrisId === id)
        .reduce((acc, adoption) => acc + adoption.amountBrl, 0);
      return base + extra;
    };

    const getGlobalFundedTotal = () => {
      const base = debrisCatalog.reduce((acc, debris) => acc + debris.fundedBrl, 0);
      const extra = adoptions.reduce((acc, adoption) => acc + adoption.amountBrl, 0);
      return base + extra;
    };

    const getUserContributedTotal = () =>
      adoptions.reduce((acc, adoption) => acc + adoption.amountBrl, 0);

    const getUserSupportedDebris = (): Debris[] => {
      const ids = Array.from(new Set(adoptions.map((adoption) => adoption.debrisId)));
      return ids
        .map((id) => getDebrisById(id))
        .filter((debris): debris is Debris => debris !== undefined);
    };

    const getUserMassRemovedKg = () => {
      let total = 0;
      const contributionsByDebris = new Map<string, number>();
      for (const adoption of adoptions) {
        contributionsByDebris.set(
          adoption.debrisId,
          (contributionsByDebris.get(adoption.debrisId) ?? 0) + adoption.amountBrl
        );
      }
      contributionsByDebris.forEach((amount, id) => {
        const debris = getDebrisById(id);
        if (!debris) return;
        const ratio = Math.min(1, amount / debris.removalCostBrl);
        total += ratio * debris.massKg;
      });
      return total;
    };

    return {
      debris: debrisCatalog,
      missions: removalMissions,
      adoptions,
      monitoredIds,
      adopt,
      toggleMonitor,
      isMonitored,
      resetAll,
      getDebris,
      getFundedTotalForDebris,
      getGlobalFundedTotal,
      getUserContributedTotal,
      getUserSupportedDebris,
      getUserMassRemovedKg,
    };
  }, [adoptions, monitoredIds, setAdoptions, setMonitoredIds]);

  return <KesslerContext.Provider value={value}>{children}</KesslerContext.Provider>;
}

export function useKesslerContext(): KesslerContextValue {
  const value = useContext(KesslerContext);
  if (!value) {
    throw new Error("useKesslerContext deve ser usado dentro de KesslerProvider");
  }
  return value;
}
