import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'es';

interface Feature {
  title: string;
  description: string;
}

interface Features {
  intelligent: Feature;
  multilingual: Feature;
  availability: Feature;
  security: Feature;
}

interface Categories {
  housing: string;
  education: string;
  documentation: string;
  transportation: string;
  socialBenefits: string;
  health: string;
  work: string;
  justice: string;
}

interface Translations {
  welcome: string;
  whyChoose: string;
  services: string;
  features: Features;
  categories: Categories;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: {
    [key in Language]: Translations;
  };
}

const translations: { [key in Language]: Translations } = {
  en: {
    welcome: "Welcome to MAPLE\nYour intelligent government services assistant",
    whyChoose: "Why Choose MAPLE",
    services: "Available Services",
    features: {
      intelligent: {
        title: "Intelligent Assistant",
        description: "Powered by advanced AI to provide accurate and helpful responses"
      },
      multilingual: {
        title: "Multilingual Support",
        description: "Communicate in English, French and Spanish seamlessly"
      },
      availability: {
        title: "24/7 Availability",
        description: "Get assistance anytime, anywhere"
      },
      security: {
        title: "Secure & Private",
        description: "Your information is protected with enterprise-grade security"
      }
    },
    categories: {
      housing: "HOUSING",
      education: "EDUCATION",
      documentation: "DOCUMENTATION",
      transportation: "TRANSPORTATION",
      socialBenefits: "SOCIAL BENEFITS",
      health: "HEALTH",
      work: "WORK",
      justice: "JUSTICE"
    }
  },
  fr: {
    welcome: "Bienvenue chez MAPLE\nVotre assistant intelligent aux services gouvernementaux",
    whyChoose: "Pourquoi choisir MAPLE",
    services: "Services disponibles",
    features: {
      intelligent: {
        title: "Assistant Intelligent",
        description: "Propulsé par l'IA avancée pour fournir des réponses précises et utiles"
      },
      multilingual: {
        title: "Support Multilingue",
        description: "Communiquez en anglais, français et espagnol sans effort"
      },
      availability: {
        title: "Disponibilité 24/7",
        description: "Obtenez de l'aide à tout moment, n'importe où"
      },
      security: {
        title: "Sécurisé et Privé",
        description: "Vos informations sont protégées par une sécurité de niveau entreprise"
      }
    },
    categories: {
      housing: "LOGEMENT",
      education: "ÉDUCATION",
      documentation: "DOCUMENTATION",
      transportation: "TRANSPORT",
      socialBenefits: "PRESTATIONS SOCIALES",
      health: "SANTÉ",
      work: "TRAVAIL",
      justice: "JUSTICE"
    }
  },
  es: {
    welcome: "Bienvenido a MAPLE\nTu asistente inteligente de servicios gubernamentales",
    whyChoose: "Por qué elegir MAPLE",
    services: "Servicios disponibles",
    features: {
      intelligent: {
        title: "Asistente Inteligente",
        description: "Impulsado por IA avanzada para proporcionar respuestas precisas y útiles"
      },
      multilingual: {
        title: "Soporte Multilingüe",
        description: "Comunícate en inglés, francés y español sin problemas"
      },
      availability: {
        title: "Disponibilidad 24/7",
        description: "Obtén ayuda en cualquier momento y lugar"
      },
      security: {
        title: "Seguro y Privado",
        description: "Tu información está protegida con seguridad de nivel empresarial"
      }
    },
    categories: {
      housing: "VIVIENDA",
      education: "EDUCACIÓN",
      documentation: "DOCUMENTACIÓN",
      transportation: "TRANSPORTE",
      socialBenefits: "BENEFICIOS SOCIALES",
      health: "SALUD",
      work: "TRABAJO",
      justice: "JUSTICIA"
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 