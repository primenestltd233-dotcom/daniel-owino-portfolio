export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Proficient';

export type EmploymentType = 'Employment' | 'Internship' | 'Freelance' | 'Volunteer' | 'Contract' | 'Personal Business';

export interface HeroSection {
  id?: string;
  fullName: string;
  title: string;
  shortIntro: string;
  tagline: string;
  profileImageUrl: string;
  backgroundImageUrl?: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  contactButtonText?: string;
  contactButtonLink?: string;
}

export interface AboutSection {
  id?: string;
  biography: string;
  personalIntro: string;
  mission: string;
  vision: string;
  careerInterests: string[];
  specializations: string[];
  values: string[];
  shortTermGoals: string[];
  longTermGoals: string[];
  profileImageUrl: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  currentStatus: boolean;
  description: string;
  institutionLogo?: string;
  certificateUrl?: string;
  relevantSubjects: string[];
  achievements: string[];
  order: number;
  published: boolean;
}

export interface SkillItem {
  id: string;
  name: string;
  category: string; // e.g. Programming, Web Development, Databases, Networking, Software & Tools, Hardware, Mobile, UI/UX, Cloud, Leadership, Communication, Problem Solving
  description?: string;
  level: SkillLevel;
  yearsOfExperience?: number;
  iconName?: string;
  order: number;
  published: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  category: string;
  technologies: string[];
  thumbnailUrl: string;
  galleryImages: string[];
  problemStatement?: string;
  solution?: string;
  keyFeatures: string[];
  myRole?: string;
  challenges?: string;
  results?: string;
  githubUrl?: string;
  liveUrl?: string;
  videoUrl?: string;
  startDate?: string;
  completionDate?: string;
  featured: boolean;
  published: boolean;
  order: number;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  position: string;
  employmentType: EmploymentType;
  startDate: string;
  endDate: string;
  currentPosition: boolean;
  location: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  skillsUsed: string[];
  organizationLogo?: string;
  order: number;
  published: boolean;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuingOrganization: string;
  description: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  certificateFileUrl: string;
  verificationUrl?: string;
  category: string;
  featured: boolean;
  published: boolean;
  order: number;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  date: string;
  organization: string;
  imageUrl?: string;
  documentUrl?: string;
  category: string;
  featured: boolean;
  published: boolean;
  order: number;
}

export interface LeadershipItem {
  id: string;
  organization: string;
  position: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  startDate: string;
  endDate: string;
  imageUrl?: string;
  documentUrl?: string;
  order: number;
  published: boolean;
}

export interface CVItem {
  id?: string;
  title: string;
  pdfUrl: string;
  fileName: string;
  updatedAt: string;
  version: string;
  summary: string;
  previousVersions?: {
    version: string;
    pdfUrl: string;
    updatedAt: string;
  }[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  featuredImageUrl: string;
  excerpt: string;
  content: string; // Markdown formatted
  category: string;
  tags: string[];
  author: string;
  publicationDate: string;
  readingTimeMinutes: number;
  published: boolean; // draft if false
  featured: boolean;
  views?: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
  archived: boolean;
}

export interface SocialLink {
  id: string;
  platform: string; // LinkedIn, GitHub, X/Twitter, Facebook, Instagram, YouTube, Personal, Email
  url: string;
  iconName?: string;
  published: boolean;
  order: number;
}

export interface SiteSettings {
  id?: string;
  siteTitle: string;
  logoText: string;
  faviconUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  footerText: string;
  copyrightText: string;
  defaultProfileImage: string;
  seoDescription: string;
  socialSharingImageUrl?: string;
  emailContact: string;
  phoneContact: string;
  locationContact: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'pdf' | 'document' | 'other';
  sizeBytes?: number;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  iconName: string;
  label: string;
  order: number;
  imageUrl?: string;
}

export interface StatItem {
  id: string;
  number: string;
  label: string;
  order: number;
}

export interface PricingTier {
  id: string;
  category: 'Graphic Design' | 'Web Development';
  name: string;
  price: string;
  popular?: boolean;
  features: string[];
  buttonText: string;
  buttonLink: string;
  order: number;
}

export interface ServiceTestimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarUrl?: string;
  order: number;
}

export interface FreelanceServicesSection {
  id?: string;
  sectionTitle: string;
  subtitle: string;
  introHeadline: string;
  introBody: string;
  services: ServiceItem[];
  stats: StatItem[];
  pricing: PricingTier[];
  testimonials: ServiceTestimonial[];
  contactHeading: string;
  contactSubtext: string;
  phone: string;
  email: string;
  location: string;
  whatsappLink?: string;
}
