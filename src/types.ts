export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  fullContent: string; // Markdown/HTML-formatted article content
  image: string;
  date: string;
  readingTime: string;
  author: Author;
  featured?: boolean;
}

export interface Service {
  id: string;
  name: string;
  iconName: string;
  shortDesc: string;
  longDesc: string;
  secStandard: string;
  highlights: string[];
}

export interface Subscription {
  email: string;
  subType: "newsletter" | "community";
  date: string;
}

export interface TechnicalInquiry {
  name: string;
  email: string;
  serviceId: string;
  urgency: "alta" | "media" | "baja";
  details: string;
  powerDemand?: string; // kW demand
  phaseType?: "monofasico" | "trifasico";
}
