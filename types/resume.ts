export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Education {
  school: string;
  degree: string;
  year: string;
  description?: string;
}

export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  contact: ContactInfo;
  skills: string[];
  experience: Experience[];
  education: Education[];
}

export type TemplateId = 
  | 'minimalist' 
  | 'modern' 
  | 'creative' 
  | 'executive' 
  | 'tech' 
  | 'academic' 
  | 'compact' 
  | 'bold';

export interface TemplateProps {
  data: ResumeData;
}
