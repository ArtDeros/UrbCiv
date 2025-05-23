export interface Suggestion {
  text?: string;
  en: string;
  es: string;
  category?: string;
  type?: 'category' | 'question';
}

export interface Message {
  text: string;
  isUser: boolean;
  id: string;
  analysis?: {
    quality: number;
    bias: number;
    sentiment: {
      score: number;
      emotion: string;
      intensity: number;
    };
  };
  suggestions?: Suggestion[];
  isFavorite?: boolean;
  rating?: 'positive' | 'negative';
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