export interface CaseStudy {
  id: number | string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  impact: string;
  tools: string;
  complexity?: string;
  prompts?: string[]; // Added prompts field
}

export enum ChatRole {
  USER = 'user',
  MODEL = 'model',
}

export interface ChatMessage {
  role: ChatRole;
  text: string;
  timestamp: number;
}