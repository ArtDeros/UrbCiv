export type Language = 'en' | 'es' | 'fr';
export type CategoryKey = 'vivienda' | 'salud' | 'educacion';

interface LocalizedText {
  en: string;
  es: string;
  fr: string;
}

export interface Category {
  name: LocalizedText;
  description: LocalizedText;
  suggestions: Array<{
    type: 'question';
    en: string;
    es: string;
    fr: string;
    category: CategoryKey;
  }>;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  isUser: boolean;
  details?: {
    location?: {
      latitude: number;
      longitude: number;
    };
    services?: string[];
    links?: string[];
    nextSteps?: string[];
  };
  rating?: 'positive' | 'negative';
  isFavorite?: boolean;
}

export interface SavedResponse {
  id: string;
  messageId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  messages: Message[];
  timestamp: string;
} 