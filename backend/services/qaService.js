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
async function processQuestion(userQuestion, sessionId) {
  const language = detectLanguage(userQuestion);
  
  // Verificar si es una conversación inicial
  const conversationRef = db.collection('conversations').doc(sessionId);
  const conversationDoc = await conversationRef.get();
  const conversationData = conversationDoc.exists ? conversationDoc.data() : { state: CONVERSATION_STATES.INITIAL };
  
  if (conversationData.state !== CONVERSATION_STATES.ACTIVE) {
    return handleInitialConversation(sessionId, userQuestion, language);
  }

  // Detectar intención del usuario
  const intent = detectIntent(userQuestion);
  if (intent) {
    const quickResponse = getQuickResponses(intent, language);
    if (quickResponse) {
      // Analizar la respuesta rápida
      const analysis = analyzeResponse(quickResponse, userQuestion);
      
      return {
        success: true,
        text: quickResponse,
        category: 'general',
        confidence: 1.0,
        suggestions: generateSuggestions(detectKeywords(userQuestion), language),
        analysis: {
          quality: analysis.quality.score,
          bias: analysis.bias.score,
          sentiment: analysis.sentiment
        }
      };
    }
  }

  const match = findBestMatch(userQuestion, language);
  
  if (match) {
    const response = formatResponse(match.response, match.category, match.language);
    
    // Analizar la respuesta
    const analysis = analyzeResponse(response.text, userQuestion);
    
    // Detectar palabras clave para sugerencias
    const keywords = detectKeywords(userQuestion);
    const suggestions = generateSuggestions(keywords, language);
    
    // Guardar la interacción con el análisis
    await saveConversation(sessionId, {
      lastQuestion: userQuestion,
      lastResponse: response,
      lastCategory: match.category,
      lastInteraction: new Date().toISOString(),
      analysis: {
        quality: analysis.quality.score,
        bias: analysis.bias.score,
        sentiment: analysis.sentiment,
        suggestions: analysis.suggestions
      }
    });

    return {
      success: true,
      ...response,
      confidence: match.similarity,
      suggestions,
      analysis: {
        quality: analysis.quality.score,
        bias: analysis.bias.score,
        sentiment: analysis.sentiment
      }
    };
  }
  
  const noMatchResponse = {
    en: "I'm sorry, I don't have specific information about that question. Could you rephrase it or ask about another topic?",
    es: "Lo siento, no tengo información específica sobre esa pregunta. ¿Podrías reformularla o preguntar sobre otro tema?"
  };
  
  // Analizar la respuesta de no coincidencia
  const analysis = analyzeResponse(noMatchResponse[language], userQuestion);
  
  // Generar sugerencias basadas en palabras clave detectadas
  const keywords = detectKeywords(userQuestion);
  const suggestions = generateSuggestions(keywords, language);
  
  return {
    success: false,
    text: noMatchResponse[language],
    category: null,
    confidence: 0,
    timestamp: new Date().toISOString(),
    links: [],
    language,
    suggestions: suggestions.length > 0 ? suggestions : generateSuggestions(['housing', 'education', 'transportation'], language),
    analysis: {
      quality: analysis.quality.score,
      bias: analysis.bias.score,
      sentiment: analysis.sentiment
    }
  };
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
  handleInitialConversation
}; 