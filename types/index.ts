export interface TeamMember {
  slug: string;
  name: string;
  thematic: string;
  shortRole: string;
  states: string[];
  avatarInitials: string;
  responsibilities: string[];
  keyDeliverables: string;
  quote?: string;
  note?: string;
  pendingProfile?: boolean;
}

export interface GovernmentLeader {
  id: string;
  name: string;
  designation: string;
  tier: number;
  keyMessage?: string;
}

export interface Course {
  id: number;
  title: string;
  category: string;
  categoryColour: string;
  avCount: number;
  language: string;
  month: string;
  year: number;
  description: string;
  link: string;
}

export interface Newsletter {
  id: number;
  edition: number;
  title: string;
  month: string;
  year: number;
  language: string;
  pdfLink: string;
  coverGradient: string;
  pages: string[];
}

export interface Workshop {
  id: number;
  title: string;
  date: string;
  type: string;
  location: string;
  status: "upcoming" | "completed" | "ongoing";
  description: string;
  responsibility: string;
}

export interface Partner {
  id: string;
  name: string;
  fullName: string;
  website: string;
  description: string;
  role: string;
  collaborationAreas: string[];
  logo: string;
}

export interface CLFGrowthData {
  year: number;
  modelCLF: number;
  swavalambiCLF: number;
  viksitCLF: number;
}
