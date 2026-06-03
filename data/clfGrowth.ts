import type { CLFGrowthData } from "@/types";

export const clfGrowthData: CLFGrowthData[] = [
  { year: 2026, modelCLF: 10169, swavalambiCLF: 0, viksitCLF: 0 },
  { year: 2031, modelCLF: 20000, swavalambiCLF: 500, viksitCLF: 5 },
  { year: 2036, modelCLF: 34000, swavalambiCLF: 5000, viksitCLF: 15 },
  { year: 2041, modelCLF: 34000, swavalambiCLF: 20000, viksitCLF: 115 },
  { year: 2047, modelCLF: 34000, swavalambiCLF: 34000, viksitCLF: 340 },
];

export const clfTiers = [
  {
    id: "clf",
    name: "CLF",
    label: "Cluster Level Federation",
    description: "Base community institution representing 2,000–3,000 households across 10–15 Village Organisations.",
    target: "34,000 total",
    color: "#8A8070",
    criteria: [
      "Registered under Societies/Trusts Act",
      "Functional General Body and Executive Committee",
      "Regular monthly meetings with quorum",
      "Basic accounts and bookkeeping maintained",
    ],
  },
  {
    id: "model-clf",
    name: "Adarsh CLF",
    label: "Adarsh Cluster Level Federation",
    description: "A CLF that meets minimum standards across governance, finance, livelihoods, and institutional functioning.",
    target: "10,169 (2026) → 34,000 (2036)",
    color: "#0D1B2A",
    criteria: [
      "All sub-committees functional with meeting records",
      "Annual Action Plan and Budget prepared and approved",
      "Statutory compliance current (registration, ITR, audit)",
      "At least 1 core staff member deployed and functional",
      "LMS-certified SRP conducting monthly training",
      "CLF Web 2.0 data updated with <2% error rate",
    ],
  },
  {
    id: "swavalambi-clf",
    name: "Swavalambi CLF",
    label: "Self-Reliant CLF",
    description: "A Model CLF that operates on its own cost — staff salaries, operations, and services funded through own revenue streams.",
    target: "500 (2031) → 34,000 (2047)",
    color: "#2D6A4F",
    criteria: [
      "Meets all Model CLF criteria",
      "Revenue covers 100% operational costs for 12 consecutive months",
      "3+ independent revenue streams active",
      "Community-paid audit model operational",
      "5+ profitable CLF enterprises running",
      "All members have at least 1 livelihood activity",
    ],
  },
  {
    id: "viksit-clf",
    name: "Viksit CLF",
    label: "Developed CLF",
    description: "The apex tier — a fully self-governing, financially sustainable CLF that contributes to broader community development without any government support.",
    target: "5 (2031) → 340 (2047)",
    color: "#D4770A",
    criteria: [
      "Meets all Swavalambi CLF criteria",
      "No dependency on government funding for 3+ years",
      "Runs 10+ community enterprises with positive EBITDA",
      "Self-managed CMTC training 100+ persons/year",
      "Provides financial services (loan/insurance) to all members",
      "Women from CLF elected to local governance bodies",
      "CLF acts as resource institution for neighboring CLFs",
    ],
  },
];
