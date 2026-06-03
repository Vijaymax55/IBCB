import type { Partner } from "@/types";

// TODO: Replace logo placeholders with actual partner logo image files
export const partners: Partner[] = [
  {
    id: "pradan",
    name: "PRADAN",
    fullName: "Professional Assistance for Development Action",
    website: "https://www.pradan.net/",
    logo: "/images/logos/pradan.png",
    description:
      "PRADAN is one of India's leading civil society organisations, working for over four decades on rural livelihoods and community institution building. With a presence in 9 of India's poorest states, PRADAN brings deep field expertise in strengthening SHGs, VOs, and CLFs.",
    role: "Technical Support Agency / National Resource Organisation for CLF strengthening",
    collaborationAreas: [
      "Field immersion sites for MCLF learning visits",
      "SRP capacity building and certification support",
      "Documentation of best practices from Model CLFs",
      "Technical inputs on Governance and AAP frameworks",
      "Livelihood promotion and enterprise development planning",
    ],
  },
  {
    id: "trif",
    name: "TRIF",
    fullName: "Transforming Rural India Foundation",
    website: "https://www.trif.in/",
    logo: "/images/logos/trif.png",
    description:
      "Transforming Rural India Foundation works on rural transformation through livelihoods, skilling, and community mobilisation. As a Technical Resource Institution under DAY-NRLM, TRIF contributes to the MCLF ecosystem through specialised capacity building and institutional assessments.",
    role: "Technical Resource Institution for CLF capacity building and institutional assessment",
    collaborationAreas: [
      "Community institution assessments and grading support",
      "Livelihood integration with CLF structures",
      "Training module design and content development",
      "State-level SRP training and certification",
      "Institutional strengthening advisory for SRLMs",
    ],
  },
];
