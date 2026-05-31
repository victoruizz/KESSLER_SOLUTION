import type { RemovalMission } from "../types";

export const removalMissions: RemovalMission[] = [
  {
    id: "MIS-001",
    name: "ClearSpace-1",
    company: "ClearSpace",
    targetDebrisId: "DTR-002",
    launchYear: 2026,
    status: "EM_FINANCIAMENTO",
  },
  {
    id: "MIS-002",
    name: "ELSA-d Extended",
    company: "Astroscale",
    targetDebrisId: "DTR-005",
    launchYear: 2027,
    status: "PLANEJADA",
  },
  {
    id: "MIS-003",
    name: "ION Cleanup Mission",
    company: "D-Orbit",
    targetDebrisId: "DTR-008",
    launchYear: 2025,
    status: "EXECUTADA",
  },
  {
    id: "MIS-004",
    name: "Orbita Brasil Sentinela",
    company: "Orbita Brasil",
    targetDebrisId: "DTR-009",
    launchYear: 2028,
    status: "EM_FINANCIAMENTO",
  },
  {
    id: "MIS-005",
    name: "AEB Cleanup Atlantico",
    company: "AEB Cleanup",
    targetDebrisId: "DTR-010",
    launchYear: 2029,
    status: "PLANEJADA",
  },
  {
    id: "MIS-006",
    name: "ClearSpace Heritage",
    company: "ClearSpace",
    targetDebrisId: "DTR-013",
    launchYear: 2030,
    status: "PLANEJADA",
  },
];
