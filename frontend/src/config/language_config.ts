export interface LanguageConfig {
  code: string;
  name: string;
  flag: string;
}

export const languages: LanguageConfig[] = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷'
  },
  {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸'
  }
];

const translations = {
  en: {
    home: {
      title: 'Welcome to UrbCiv',
      subtitle: 'Your Digital Government Assistant',
      startChat: 'Start Chat',
      features: {
        title: 'Features',
        multilingual: 'Multilingual Support',
        governmentServices: 'Government Services',
        realTimeUpdates: 'Real-time Updates',
        personalizedAssistance: 'Personalized Assistance'
      },
      services: {
        title: 'Available Services',
        housing: 'Housing',
        education: 'Education',
        documentation: 'Documentation',
        transportation: 'Transportation',
        socialBenefits: 'Social Benefits',
        health: 'Health',
        work: 'Work',
        justice: 'Justice'
      }
    },
    chat: {
      title: 'Chat',
      placeholder: 'Type your message...',
      send: 'Send',
      suggestions: 'Suggested Topics',
      clear: 'Clear Chat',
      save: 'Save Response'
    }
  },
  fr: {
    home: {
      title: 'Bienvenue sur UrbCiv',
      subtitle: 'Votre Assistant Gouvernemental Numérique',
      startChat: 'Démarrer le Chat',
      features: {
        title: 'Fonctionnalités',
        multilingual: 'Support Multilingue',
        governmentServices: 'Services Gouvernementaux',
        realTimeUpdates: 'Mises à jour en Temps Réel',
        personalizedAssistance: 'Assistance Personnalisée'
      },
      services: {
        title: 'Services Disponibles',
        housing: 'Logement',
        education: 'Éducation',
        documentation: 'Documentation',
        transportation: 'Transport',
        socialBenefits: 'Prestations Sociales',
        health: 'Santé',
        work: 'Emploi',
        justice: 'Justice'
      }
    },
    chat: {
      title: 'Chat',
      placeholder: 'Tapez votre message...',
      send: 'Envoyer',
      suggestions: 'Sujets Suggérés',
      clear: 'Effacer le Chat',
      save: 'Enregistrer la Réponse'
    }
  },
  es: {
    home: {
      title: 'Bienvenido a UrbCiv',
      subtitle: 'Tu Asistente Gubernamental Digital',
      startChat: 'Iniciar Chat',
      features: {
        title: 'Características',
        multilingual: 'Soporte Multilingüe',
        governmentServices: 'Servicios Gubernamentales',
        realTimeUpdates: 'Actualizaciones en Tiempo Real',
        personalizedAssistance: 'Asistencia Personalizada'
      },
      services: {
        title: 'Servicios Disponibles',
        housing: 'Vivienda',
        education: 'Educación',
        documentation: 'Documentación',
        transportation: 'Transporte',
        socialBenefits: 'Beneficios Sociales',
        health: 'Salud',
        work: 'Trabajo',
        justice: 'Justicia'
      }
    },
    chat: {
      title: 'Chat',
      placeholder: 'Escribe tu mensaje...',
      send: 'Enviar',
      suggestions: 'Temas Sugeridos',
      clear: 'Limpiar Chat',
      save: 'Guardar Respuesta'
    }
  }
};

export { translations }; 