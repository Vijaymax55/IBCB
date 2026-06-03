export interface Resource {
  id: string;
  title: string;
  category: string;
  description: string;
  fileName: string;
  fileType: "pdf" | "doc" | "ppt" | "xlsx";
  uploadDate: string;
  isOfficial: boolean;
  tags: string[];
}

export const resourceCategories = [
  "All",
  "Registration & Compliance",
  "Financial Management",
  "Governance",
  "Internal Audit",
  "Livelihoods",
  "CBO-HR",
  "SRP & Training",
  "KMC",
  "Technology & MIS",
];

export const resources: Resource[] = [
  {
    id: "1",
    title: "Advisory on Registration & Statutory Compliances for CLFs",
    category: "Registration & Compliance",
    description: "Official advisory covering registration process, statutory compliance requirements, and legal obligations for Cluster Level Federations.",
    fileName: "advisory-registration-compliance.pdf",
    fileType: "pdf",
    uploadDate: "2026-01-01",
    isOfficial: true,
    tags: ["registration", "compliance", "advisory", "CLF"],
  },
  {
    id: "2",
    title: "Financial Management Policy Framework for CLFs",
    category: "Financial Management",
    description: "Framework document for FM policy adoption, critical FM ratios, loan product development, and repayment tracking.",
    fileName: "fm-policy-framework.pdf",
    fileType: "pdf",
    uploadDate: "2026-01-01",
    isOfficial: true,
    tags: ["finance", "FM policy", "loan", "CLF"],
  },
  {
    id: "3",
    title: "Governance & Leadership Strengthening Advisory",
    category: "Governance",
    description: "Advisory on CLF governance norms, leadership rotation, by-laws, AGM conduct, and sub-committee strengthening.",
    fileName: "governance-advisory.pdf",
    fileType: "pdf",
    uploadDate: "2026-01-01",
    isOfficial: true,
    tags: ["governance", "leadership", "sub-committee"],
  },
  {
    id: "4",
    title: "Internal Audit Framework for CBOs",
    category: "Internal Audit",
    description: "Advisory on institutionalisation of internal audits in SHGs, VOs, and CLFs including dividend distribution.",
    fileName: "internal-audit-advisory.pdf",
    fileType: "pdf",
    uploadDate: "2026-01-01",
    isOfficial: true,
    tags: ["audit", "internal control", "CBO"],
  },
  {
    id: "5",
    title: "CLF-Led Livelihood Promotion Advisory",
    category: "Livelihoods",
    description: "Advisory on CLF-led livelihood promotion strategy, enterprise development planning, and livelihood sub-committee.",
    fileName: "livelihood-advisory.pdf",
    fileType: "pdf",
    uploadDate: "2026-01-01",
    isOfficial: true,
    tags: ["livelihoods", "enterprise", "planning"],
  },
  {
    id: "6",
    title: "CBO Human Resource Management Framework",
    category: "CBO-HR",
    description: "Framework for core staff deployment, CBO-HR policy, and governance-operations distinction in CLFs.",
    fileName: "cbo-hr-framework.pdf",
    fileType: "pdf",
    uploadDate: "2026-01-01",
    isOfficial: true,
    tags: ["HR", "staff", "CBO", "policy"],
  },
];
