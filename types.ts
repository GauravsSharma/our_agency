export interface ProjectArchetype {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  typicalDuration: string;
}

export interface AddonOption {
  id: string;
  name: string;
  price: number;
  category: 'core' | 'scale' | 'intelligence';
}

export interface CaseStudy {
  id: string;
  number: string;
  badge: string;
  statusText?: string;
  isClient?: boolean;
  title: string;
  clientSubtitle?: string;
  description: string;
  metrics?: { label: string; value: string }[];
  tags: string[];
  actionLabel: string;
  imageUrl: string;
  fallbackGradient?: string;
  demoUrl?: string;
}

export interface Founder {
  name: string;
  role: string;
  location: string;
  bio: string;
  avatarUrl: string;
  competencies: string[];
  githubUrl: string;
  linkedinUrl: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  startingPrice: string;
  description: string;
  stackTags: string[];
  deliverables: string[];
}
