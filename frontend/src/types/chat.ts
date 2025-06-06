export type Language = 'en' | 'fr' | 'es';
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

export interface MessageDetails {
  location?: {
    name: string;
    address: string;
    phone: string;
    hours: string;
  };
  services?: string[];
  links?: { title: string; url: string; }[];
  nextSteps?: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  isUser: boolean;
  details?: MessageDetails;
  rating?: 'positive' | 'negative';
  isFavorite?: boolean;
}

export interface Conversation {
  id: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface SavedResponse {
  id: string;
  messageId: string;
  conversationId: string;
  createdAt: string;
} 