export interface Suggestion {
  type: 'category' | 'question';
  en: string;
  es: string;
  fr: string;
  category?: string;
}

export interface Message {
  text: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  category?: string | null;
  suggestions?: Suggestion[];
  id?: string;
  isUser?: boolean;
  details?: any;
}

export interface Conversation {
  id: string;
  messages: Message[];
  userData: {
    name: string;
    email: string;
    location: string;
  };
  lastInteraction: string;
} 