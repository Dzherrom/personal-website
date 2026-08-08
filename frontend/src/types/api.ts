export interface SocialLink {
  label: string;
  url: string;
}

export interface SiteProfile {
  id: number;
  name: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  cv_file: string;
  whatsapp_number: string;
  social_links: SocialLink[];
  skills_note: string;
  contact_title: string;
  contact_message: string;
  intro_greeting: string;
  intro_name: string;
  typewriter_roles: string[];
}

export interface Client {
  id: number;
  name: string;
  description: string;
  highlights: string[];
  tech_stack: string[];
  logo_url: string;
  preview_image: string;
  website_url: string;
  order: number;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  highlights: string[];
  preview_image: string;
  demo_url: string;
  repo_url: string;
  tech_stack: string[];
  order: number;
  is_featured: boolean;
  created_at: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  icon_url: string;
  order: number;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
