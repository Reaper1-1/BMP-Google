export enum Platform {
  IOS = 'iOS',
  ANDROID = 'Android'
}

export interface AppConfig {
  name: string;
  url: string;
  platform: Platform;
  primaryColor: string;
  tagline: string;
  description: string;
  showStatusBar: boolean;
  iconUrl?: string;
}

export interface AISuggestion {
  tagline: string;
  description: string;
  primaryColor: string;
}

export type ViewMode = 'config' | 'handoff';
