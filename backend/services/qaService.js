const natural = require('natural');
const qaConfig = require('../config/qa_config');
const languageConfig = require('../config/language_config');
const { 
  detectIntent, 
  getQuickResponses, 
  detectKeywords, 
  generateSuggestions,
  detectSentiment 
} = require('../utils/chatUtils');
const { analyzeResponse } = require('./analysisService');
const { db } = require('../config/firebase');

// Inicializar el tokenizador y el stemmer
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

// Estados de la conversación
const CONVERSATION_STATES = {
  INITIAL: 'initial',
  ASKING_NAME: 'asking_name',
  ASKING_EMAIL: 'asking_email',
  ASKING_LOCATION: 'asking_location',
  ACTIVE: 'active'
};

// Base de datos de recursos por categoría
const categoryResources = {
  vivienda: {
    en: {
      links: [
        { title: 'Housing Department', url: 'https://example.com/housing' },
        { title: 'Rental Assistance', url: 'https://example.com/rental' }
      ],
      commonQuestions: [
        'How do I apply for public housing?',
        'What are the requirements for housing assistance?',
        'Where can I find affordable housing?'
      ],
      locations: [
        {
          name: 'Main Housing Office',
          address: '123 Main St, City',
          phone: '555-0123',
          hours: 'Mon-Fri 9AM-5PM',
          services: ['Housing applications', 'Rental assistance', 'Housing counseling']
        }
      ]
    },
    es: {
      links: [
        { title: 'Departamento de Vivienda', url: 'https://example.com/vivienda' },
        { title: 'Asistencia de Alquiler', url: 'https://example.com/alquiler' }
      ],
      commonQuestions: [
        '¿Cómo solicito vivienda pública?',
        '¿Cuáles son los requisitos para asistencia de vivienda?',
        '¿Dónde puedo encontrar vivienda asequible?'
      ],
      locations: [
        {
          name: 'Oficina Principal de Vivienda',
          address: '123 Calle Principal, Ciudad',
          phone: '555-0123',
          hours: 'Lun-Vie 9AM-5PM',
          services: ['Solicitudes de vivienda', 'Asistencia de alquiler', 'Asesoría de vivienda']
        }
      ]
    },
    fr: {
      links: [
        { title: 'Département du Logement', url: 'https://example.com/logement' },
        { title: 'Aide au Logement', url: 'https://example.com/aide-logement' }
      ],
      commonQuestions: [
        'Comment faire une demande de logement social?',
        'Quelles sont les conditions pour obtenir une aide au logement?',
        'Où puis-je trouver un logement abordable?'
      ],
      locations: [
        {
          name: 'Bureau Principal du Logement',
          address: '123 Rue Principale, Ville',
          phone: '555-0123',
          hours: 'Lun-Ven 9H-17H',
          services: ['Demandes de logement', 'Aide au loyer', 'Conseil en logement']
        }
      ]
    }
  },
  // ... (otras categorías similares)
};

// Función para detectar el idioma
function detectLanguage(text) {
  const spanishWords = ['qué', 'cómo', 'dónde', 'cuándo', 'por qué', 'para qué', 'quién', 'cuál', 'los', 'las', 'el', 'la'];
  const englishWords = ['what', 'how', 'where', 'when', 'why', 'who', 'which', 'the', 'a', 'an'];
  
  const words = text.toLowerCase().split(' ');
  const spanishCount = words.filter(word => spanishWords.includes(word)).length;
  const englishCount = words.filter(word => englishWords.includes(word)).length;
  
  return spanishCount > englishCount ? 'es' : 'en';
}

// Función para normalizar texto
function normalizeText(text) {
  return text.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Función para expandir texto con sinónimos
function expandWithSynonyms(text) {
  const words = text.split(' ');
  const expandedWords = words.map(word => {
    // Buscar sinónimos para la palabra
    for (const [key, synonyms] of Object.entries(languageConfig.synonyms)) {
      if (key === word || synonyms.includes(word)) {
        return [word, ...synonyms];
      }
    }
    return [word];
  });
  
  // Generar todas las combinaciones posibles
  return expandedWords.reduce((acc, words) => {
    if (acc.length === 0) return words.map(w => [w]);
    return acc.flatMap(prefix => words.map(word => [...prefix, word]));
  }, []).map(combination => combination.join(' '));
}

// Función para verificar antónimos
function checkAntonyms(text) {
  const words = text.split(' ');
  for (const [key, antonyms] of Object.entries(languageConfig.antonyms)) {
    if (words.includes(key)) {
      return antonyms.some(antonym => words.includes(antonym));
    }
  }
  return false;
}

// Función para calcular la similitud entre dos textos
function calculateSimilarity(text1, text2) {
  // Expandir ambos textos con sinónimos
  const expandedTexts1 = expandWithSynonyms(normalizeText(text1));
  const expandedTexts2 = expandWithSynonyms(normalizeText(text2));
  
  // Verificar antónimos
  if (checkAntonyms(text1) || checkAntonyms(text2)) {
    return 0;
  }
  
  let maxSimilarity = 0;
  
  // Calcular la similitud máxima entre todas las combinaciones
  for (const expText1 of expandedTexts1) {
    for (const expText2 of expandedTexts2) {
      const tokens1 = tokenizer.tokenize(expText1);
      const tokens2 = tokenizer.tokenize(expText2);
      
      // Filtrar stop words
      const filteredTokens1 = tokens1.filter(token => !languageConfig.stopWords.includes(token));
      const filteredTokens2 = tokens2.filter(token => !languageConfig.stopWords.includes(token));
      
      const stems1 = filteredTokens1.map(token => stemmer.stem(token));
      const stems2 = filteredTokens2.map(token => stemmer.stem(token));
      
      const intersection = stems1.filter(stem => stems2.includes(stem));
      const union = [...new Set([...stems1, ...stems2])];
      
      const similarity = union.length > 0 ? intersection.length / union.length : 0;
      maxSimilarity = Math.max(maxSimilarity, similarity);
    }
  }
  
  return maxSimilarity;
}

// Función para validar email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Función para guardar la conversación en Firebase
async function saveConversation(sessionId, data) {
  try {
    await db.collection('conversations').doc(sessionId).set(data, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving conversation:', error);
    return false;
  }
}

// Función para obtener sugerencias basadas en el contexto
function getContextSuggestions(category, language) {
  const suggestions = [];
  const categoryData = qaConfig.categories[category];
  
  if (categoryData) {
    // Obtener las primeras 3 preguntas de la categoría
    categoryData.questions.slice(0, 3).forEach(question => {
      suggestions.push({
        text: question.patterns[language][0],
        category: category
      });
    });
  }
  
  return suggestions;
}

// Función para generar una respuesta detallada
function generateDetailedResponse(category, question, language) {
  const resources = categoryResources[category]?.[language];
  if (!resources) return null;

  // Buscar la ubicación más relevante
  const location = resources.locations[0]; // Por ahora usamos la primera ubicación

  // Construir la respuesta detallada
  const response = {
    text: `${question}\n\n`,
    details: {
      location: {
        name: location.name,
        address: location.address,
        phone: location.phone,
        hours: location.hours
      },
      services: location.services,
      links: resources.links,
      nextSteps: language === 'en' 
        ? 'To proceed, please visit our office with the required documents.'
        : language === 'es'
        ? 'Para proceder, por favor visite nuestra oficina con los documentos requeridos.'
        : 'Pour continuer, veuillez visiter notre bureau avec les documents requis.'
    }
  };

  return response;
}

// Función para manejar el flujo de conversación inicial
async function handleInitialConversation(sessionId, message, language) {
  const conversationRef = db.collection('conversations').doc(sessionId);
  const conversationDoc = await conversationRef.get();
  const conversationData = conversationDoc.exists ? conversationDoc.data() : { state: CONVERSATION_STATES.INITIAL };
  
  let response = {
    text: '',
    state: conversationData.state,
    suggestions: [],
    userData: conversationData.userData || {}
  };

  // Detectar intención del usuario
  const intent = detectIntent(message);
  if (intent) {
    const quickResponse = getQuickResponses(intent, language);
    if (quickResponse) {
      response.text = quickResponse;
      response.state = conversationData.state;
      return response;
    }
  }

  switch (conversationData.state) {
    case CONVERSATION_STATES.INITIAL:
      response.text = language === 'es' 
        ? "Bienvenido a UrbCiv, cuéntame cómo te llamas"
        : "Welcome to UrbCiv, what's your name?";
      response.state = CONVERSATION_STATES.ASKING_NAME;
      break;

    case CONVERSATION_STATES.ASKING_NAME:
      response.userData.name = message;
      response.text = language === 'es'
        ? `Hola ${message}, ¿cuál es tu correo electrónico?`
        : `Hello ${message}, what's your email address?`;
      response.state = CONVERSATION_STATES.ASKING_EMAIL;
      break;

    case CONVERSATION_STATES.ASKING_EMAIL:
      if (!isValidEmail(message)) {
        response.text = language === 'es'
          ? "Por favor, proporciona un correo electrónico válido"
          : "Please provide a valid email address";
        response.state = CONVERSATION_STATES.ASKING_EMAIL;
      } else {
        response.userData.email = message;
        response.text = language === 'es'
          ? "¿En qué ciudad o ubicación te encuentras?"
          : "What city or location are you in?";
        response.state = CONVERSATION_STATES.ASKING_LOCATION;
      }
      break;

    case CONVERSATION_STATES.ASKING_LOCATION:
      response.userData.location = message;
      response.text = language === 'es'
        ? `¡Perfecto! Estoy listo para ayudarte con información sobre ${message}. ¿En qué puedo ayudarte hoy?`
        : `Great! I'm ready to help you with information about ${message}. How can I help you today?`;
      response.state = CONVERSATION_STATES.ACTIVE;
      
      // Generar sugerencias iniciales basadas en palabras clave comunes
      const initialKeywords = ['housing', 'education', 'transportation'];
      response.suggestions = generateSuggestions(initialKeywords, language);
      break;
  }

  // Guardar el estado actual de la conversación
  await saveConversation(sessionId, {
    state: response.state,
    userData: response.userData,
    lastInteraction: new Date().toISOString()
  });

  return response;
}

// Función para encontrar la mejor coincidencia
function findBestMatch(userQuestion, language) {
  let bestMatch = null;
  let highestSimilarity = 0;
  let matchedCategory = null;

  for (const [categoryKey, category] of Object.entries(qaConfig.categories)) {
    for (const question of category.questions) {
      for (const pattern of question.patterns[language]) {
        const similarity = calculateSimilarity(userQuestion, pattern);
        
        if (similarity > highestSimilarity) {
          highestSimilarity = similarity;
          bestMatch = {
            response: question.response[language],
            category: categoryKey,
            language
          };
        }
      }
    }
  }

  return highestSimilarity > 0.5 ? {
    ...bestMatch,
    similarity: highestSimilarity
  } : null;
}

// Función para formatear la respuesta
function formatResponse(response, category, language) {
  const categoryName = qaConfig.categories[category]?.name[language] || 'Information';
  const categoryDescription = qaConfig.categories[category]?.description[language] || '';
  
  const formattedText = [
    response.main,
    '',
    ...response.details,
    '',
    response.additionalInfo,
    '',
    language === 'en' ? 'Useful links:' : 'Enlaces útiles:',
    ...response.links.map(link => `- ${link.text}: ${link.url}`)
  ].join('\n');
  
  return {
    text: formattedText,
    category: categoryName,
    categoryDescription,
    timestamp: new Date().toISOString(),
    links: response.links.map(link => link.url),
    structuredResponse: response,
    language
  };
}

// Función para extraer enlaces de la respuesta
function extractLinks(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
}

// Función principal para procesar preguntas
async function processQuestion(message, sessionId, countryCode, language) {
  try {
    // Detectar la intención y palabras clave
    const intent = detectIntent(message);
    const keywords = detectKeywords(message);
    
    // Obtener respuestas rápidas si existen
    const quickResponse = getQuickResponses(message, language);
    if (quickResponse) {
      return {
        text: quickResponse,
        sessionId,
        suggestions: generateSuggestions(intent, language)
      };
    }

    // Si no hay respuesta rápida, buscar en las categorías
    for (const [category, resources] of Object.entries(categoryResources)) {
      const langResources = resources[language];
      if (langResources) {
        // Buscar coincidencias en las preguntas comunes
        const matchingQuestion = langResources.commonQuestions.find(q => 
          q.toLowerCase().includes(message.toLowerCase())
        );

        if (matchingQuestion) {
          const detailedResponse = generateDetailedResponse(category, matchingQuestion, language);
          if (detailedResponse) {
            return {
              text: detailedResponse.text,
              details: detailedResponse.details,
              sessionId,
              suggestions: langResources.commonQuestions.map(q => ({
                text: q,
                category
              }))
            };
          }
        }
      }
    }

    // Si no se encuentra una respuesta específica
    return {
      text: language === 'en'
        ? "I'm sorry, I couldn't find specific information about that. Could you please rephrase your question or select a category from the sidebar?"
        : language === 'es'
        ? "Lo siento, no pude encontrar información específica sobre eso. ¿Podrías reformular tu pregunta o seleccionar una categoría del panel lateral?"
        : "Je suis désolé, je n'ai pas pu trouver d'informations spécifiques à ce sujet. Pourriez-vous reformuler votre question ou sélectionner une catégorie dans la barre latérale?",
      sessionId,
      suggestions: generateSuggestions(intent, language)
    };
  } catch (error) {
    console.error('Error processing question:', error);
    throw error;
  }
}

// Función para guardar la calificación de una respuesta
async function saveResponseRating(sessionId, responseId, rating) {
  try {
    const conversationRef = db.collection('conversations').doc(sessionId);
    const conversationDoc = await conversationRef.get();
    
    if (!conversationDoc.exists) {
      throw new Error('Conversation not found');
    }
    
    const conversationData = conversationDoc.data();
    const responses = conversationData.responses || [];
    
    const responseIndex = responses.findIndex(r => r.id === responseId);
    if (responseIndex === -1) {
      throw new Error('Response not found');
    }
    
    responses[responseIndex].rating = rating;
    responses[responseIndex].ratedAt = new Date().toISOString();
    
    await conversationRef.update({ responses });
    
    return true;
  } catch (error) {
    console.error('Error saving response rating:', error);
    return false;
  }
}

// Función para guardar una respuesta como favorita
async function saveFavoriteResponse(sessionId, responseId) {
  try {
    const conversationRef = db.collection('conversations').doc(sessionId);
    const conversationDoc = await conversationRef.get();
    
    if (!conversationDoc.exists) {
      throw new Error('Conversation not found');
    }
    
    const conversationData = conversationDoc.data();
    const responses = conversationData.responses || [];
    
    const responseIndex = responses.findIndex(r => r.id === responseId);
    if (responseIndex === -1) {
      throw new Error('Response not found');
    }
    
    responses[responseIndex].isFavorite = !responses[responseIndex].isFavorite;
    responses[responseIndex].favoritedAt = new Date().toISOString();
    
    await conversationRef.update({ responses });
    
    return responses[responseIndex].isFavorite;
  } catch (error) {
    console.error('Error saving favorite response:', error);
    return false;
  }
}

module.exports = {
  processQuestion,
  CONVERSATION_STATES,
  saveResponseRating,
  saveFavoriteResponse,
  getContextSuggestions,
  handleInitialConversation,
  categoryResources
}; 