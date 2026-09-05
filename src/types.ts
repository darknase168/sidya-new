export interface BoardMember {
  id: string;
  name: string;
  title: string;
  category: 'komisaris' | 'direksi' | 'manajemen';
  photo: string;
  bio: string;
  linkedin?: string;
  email?: string;
  order: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  featured: boolean;
  image: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  readTime: string;
}

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface CompanyLegality {
  id: string;
  label: string;
  value: string;
  authority: string;
}

export interface DistributionHub {
  id: string;
  name: string;
  city: string;
  type: string;
  capacity: string;
}

export interface CompanyProfile {
  companyName: string;
  tagline: string;
  establishedYear: string;
  aboutStory: string;
  vision: string;
  missions: string[];
  values: CompanyValue[];
  legalities: CompanyLegality[];
  distributionHubs: DistributionHub[];
  stats: {
    pilgrimsServed: string;
    kbihPartners: string;
    itemsDelivered: string;
    distributionCenters: string;
  };
}

export interface AppFeature {
  title: string;
  description: string;
  icon: string;
}

export interface AppShowcaseData {
  mobile: {
    appName: string;
    subtitle: string;
    description: string;
    targetUser: string;
    features: AppFeature[];
    googlePlayLink: string;
    appStoreLink: string;
    version: string;
  };
  desktop: {
    appName: string;
    subtitle: string;
    description: string;
    targetUser: string;
    features: AppFeature[];
    downloadWinLink: string;
    downloadMacLink: string;
    version: string;
  };
}

export interface CatalogItem {
  id: string;
  name: string;
  category: 'koper' | 'ihram_mukena' | 'seragam' | 'aksesoris' | 'paket_kbih';
  description: string;
  image: string;
  customLogoAvailable: boolean;
  minOrder: string;
  specifications: string[];
  popularBadge?: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  operatingHours: string;
  mapEmbedUrl?: string;
}

export interface SidyaData {
  company: CompanyProfile;
  boardMembers: BoardMember[];
  articles: Article[];
  apps: AppShowcaseData;
  catalog: CatalogItem[];
  contact: ContactInfo;
}
