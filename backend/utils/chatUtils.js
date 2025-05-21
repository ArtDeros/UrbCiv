const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

// Función para detectar la intención del usuario
function detectIntent(text) {
  const intents = {
    greeting: ['hola', 'buenos días', 'buenas tardes', 'hello', 'hi', 'good morning'],
    farewell: ['adiós', 'hasta luego', 'chao', 'bye', 'goodbye', 'see you'],
    thanks: ['gracias', 'muchas gracias', 'thank you', 'thanks'],
    help: ['ayuda', 'socorro', 'help', 'support'],
    repeat: ['repite', 'otra vez', 'again', 'repeat']
  };

  const words = text.toLowerCase().split(' ');
  
  for (const [intent, patterns] of Object.entries(intents)) {
    if (patterns.some(pattern => text.toLowerCase().includes(pattern))) {
      return intent;
    }
  }
  
  return null;
}

// Función para generar respuestas rápidas
function getQuickResponses(intent, language) {
  const responses = {
    greeting: {
      es: [
        "¡Hola! ¿En qué puedo ayudarte hoy?",
        "¡Bienvenido! ¿Qué información necesitas?",
        "¡Hola! Estoy aquí para ayudarte"
      ],
      en: [
        "Hello! How can I help you today?",
        "Welcome! What information do you need?",
        "Hi! I'm here to help"
      ]
    },
    farewell: {
      es: [
        "¡Hasta luego! Que tengas un buen día",
        "¡Adiós! Vuelve cuando necesites ayuda",
        "¡Chao! Fue un placer ayudarte"
      ],
      en: [
        "Goodbye! Have a nice day",
        "Bye! Come back when you need help",
        "See you! It was a pleasure helping you"
      ]
    },
    thanks: {
      es: [
        "¡De nada! ¿Hay algo más en lo que pueda ayudarte?",
        "¡Es un placer! ¿Necesitas más información?",
        "¡Para eso estamos! ¿Algo más?"
      ],
      en: [
        "You're welcome! Is there anything else I can help you with?",
        "My pleasure! Do you need more information?",
        "That's what we're here for! Anything else?"
      ]
    },
    help: {
      es: [
        "Puedo ayudarte con información sobre vivienda, educación y transporte. ¿Qué te gustaría saber?",
        "Estoy aquí para responder tus preguntas sobre servicios en BC. ¿Qué necesitas?",
        "Puedo proporcionarte información sobre varios temas. ¿Cuál te interesa?"
      ],
      en: [
        "I can help you with information about housing, education, and transportation. What would you like to know?",
        "I'm here to answer your questions about services in BC. What do you need?",
        "I can provide information about various topics. Which one interests you?"
      ]
    },
    repeat: {
      es: [
        "Por supuesto, aquí está la información nuevamente:",
        "Claro, te lo repito:",
        "Aquí está la información otra vez:"
      ],
      en: [
        "Of course, here's the information again:",
        "Sure, I'll repeat it:",
        "Here's the information once more:"
      ]
    }
  };

  if (responses[intent] && responses[intent][language]) {
    const possibleResponses = responses[intent][language];
    return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
  }

  return null;
}

// Función para detectar palabras clave en el texto
function detectKeywords(text) {
  const keywords = {
    housing: ['vivienda', 'casa', 'apartamento', 'alquiler', 'housing', 'home', 'apartment', 'rent'],
    education: ['escuela', 'colegio', 'universidad', 'estudios', 'education', 'school', 'university', 'study'],
    transportation: ['transporte', 'bus', 'metro', 'tren', 'transportation', 'transit', 'subway', 'train'],
    health: ['salud', 'médico', 'hospital', 'clínica', 'health', 'doctor', 'hospital', 'clinic'],
    work: ['trabajo', 'empleo', 'trabajar', 'work', 'job', 'employment', 'working']
  };

  const words = text.toLowerCase().split(' ');
  const detectedKeywords = [];

  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(keyword => text.toLowerCase().includes(keyword))) {
      detectedKeywords.push(category);
    }
  }

  return detectedKeywords;
}

// Función para generar sugerencias basadas en palabras clave
function generateSuggestions(keywords, language) {
  const suggestions = {
    housing: {
      es: [
        "¿Qué es la vivienda subsidiada?",
        "¿Cómo puedo aplicar para vivienda?",
        "¿Cuáles son los requisitos de elegibilidad?"
      ],
      en: [
        "What is subsidized housing?",
        "How can I apply for housing?",
        "What are the eligibility requirements?"
      ]
    },
    education: {
      es: [
        "¿Cómo inscribo a mi hijo en la escuela?",
        "¿Qué documentos necesito para la inscripción?",
        "¿Hay programas de becas disponibles?"
      ],
      en: [
        "How do I enroll my child in school?",
        "What documents do I need for enrollment?",
        "Are there any scholarship programs available?"
      ]
    },
    transportation: {
      es: [
        "¿Cómo obtengo una tarjeta de transporte?",
        "¿Cuáles son las rutas disponibles?",
        "¿Hay descuentos para estudiantes?"
      ],
      en: [
        "How do I get a transit card?",
        "What routes are available?",
        "Are there student discounts?"
      ]
    }
  };

  const result = [];
  keywords.forEach(keyword => {
    if (suggestions[keyword] && suggestions[keyword][language]) {
      result.push(...suggestions[keyword][language]);
    }
  });

  return result.slice(0, 3); // Retornar máximo 3 sugerencias
}

// Función para detectar el sentimiento del mensaje
function detectSentiment(text) {
  const positiveWords = ['gracias', 'excelente', 'bueno', 'genial', 'perfecto', 'thanks', 'excellent', 'good', 'great', 'perfect'];
  const negativeWords = ['malo', 'terrible', 'horrible', 'pésimo', 'bad', 'terrible', 'horrible', 'awful'];
  
  const words = text.toLowerCase().split(' ');
  let score = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) score++;
    if (negativeWords.includes(word)) score--;
  });
  
  return {
    score,
    sentiment: score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral'
  };
}

module.exports = {
  detectIntent,
  getQuickResponses,
  detectKeywords,
  generateSuggestions,
  detectSentiment
}; 