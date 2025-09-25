export interface ImageGalleryItem {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface ProjectFrontmatter {
  title: string;
  description: string;
  tags: string[];
  featured: boolean;
  coverImage: string;
  images?: string[];
  gallery?: ImageGalleryItem[];
  demo?: string;
  github?: string;
  date: string;
}

export interface ProjectMeta extends ProjectFrontmatter {
  slug: string;
  readingTime: string;
}

export interface ToolConfig {
  title: string;
  description: string;
  category: string;
  featured: boolean;
  component: string;
  slug: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  summary: string;
  links: Array<{ label: string; url: string }>;
}

export interface WorkExperience {
  company: string;
  role: string;
  start: string;
  end: string;
  achievements: string[];
  tech: string[];
}

export interface Education {
  institution: string;
  degree: string;
  start: string;
  end: string;
  details?: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ResumeData {
  personal: PersonalInfo;
  experience: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
}
