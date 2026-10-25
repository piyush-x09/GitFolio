export interface UserProfile {
  username: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  location: string;
  college?: string;
  degree?: string;
  graduationYear?: string;
  company?: string;
  website?: string;
  twitter?: string;
  linkedin?: string;
  email?: string;
  githubUrl: string;
  followers: number;
  following: number;
  publicRepos: number;
  totalStars: number;
  availableForWork: boolean;
}

export interface Repository {
  id: string;
  name: string;
  displayName?: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  topics: string[];
  repoUrl: string;
  liveUrl?: string;
  updatedDate: string;
  isPinned: boolean;
  highlights?: string[];
}

export interface TechStackItem {
  name: string;
  category: 'Languages' | 'Frontend' | 'Backend & Cloud' | 'Tools & Databases';
  level: 'Advanced' | 'Intermediate' | 'Familiar';
  icon?: string;
  badgeColor?: string;
}

export interface PremiumTemplate {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  previewUrl: string;
  badge: string;
  badgeColor: string;
  features: string[];
  popular?: boolean;
}

export type ViewMode = 'split' | 'readme' | 'portfolio';
export type DevicePreviewMode = 'desktop' | 'tablet' | 'mobile';
export type AccentTheme = 'cyan' | 'emerald' | 'purple' | 'amber';
