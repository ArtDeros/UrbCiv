const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

// Palabras y frases que pueden indicar sesgo
const biasIndicators = {
  gender: ['él', 'ella', 'hombre', 'mujer', 'masculino', 'femenino', 'he', 'she', 'male', 'female'],
  age: ['joven', 'viejo', 'anciano', 'adolescente', 'young', 'old', 'elderly', 'teenager'],
  socioeconomic: ['rico', 'pobre', 'clase alta', 'clase baja', 'rich', 'poor', 'upper class', 'lower class'],
  cultural: ['extranjero', 'local', 'nativo', 'inmigrante', 'foreigner', 'local', 'native', 'immigrant']
};

// Palabras y frases que indican calidad
const qualityIndicators = {
  positive: ['exactamente', 'precisamente', 'claramente', 'específicamente', 'exactly', 'precisely', 'clearly', 'specifically'],
  negative: ['quizás', 'tal vez', 'posiblemente', 'maybe', 'perhaps', 'possibly'],
  neutral: ['generalmente', 'típicamente', 'usualmente', 'generally', 'typically', 'usually']
};

// Función para detectar sesgos en el texto
function detectBias(text) {
  const words = tokenizer.tokenize(text.toLowerCase());
  const stems = words.map(word => stemmer.stem(word));
  
  let biasScore = 0;
  let biasCategories = new Set();
  
  // Analizar cada categoría de sesgo
  for (const [category, indicators] of Object.entries(biasIndicators)) {
    const categoryScore = indicators.reduce((score, indicator) => {
      const indicatorStem = stemmer.stem(indicator);
      return score + stems.filter(stem => stem === indicatorStem).length;
    }, 0);
    
    if (categoryScore > 0) {
      biasScore += categoryScore;
      biasCategories.add(category);
    }
  }
  
  // Normalizar el puntaje de sesgo (0-1)
  const normalizedScore = Math.min(biasScore / 10, 1);
  
  return {
    score: normalizedScore,
    categories: Array.from(biasCategories),
    hasBias: normalizedScore > 0.2
  };
}

// Función para evaluar la calidad de la respuesta
function evaluateResponseQuality(text, context) {
  const words = tokenizer.tokenize(text.toLowerCase());
  const stems = words.map(word => stemmer.stem(word));
  
  let qualityScore = 0;
  let indicators = {
    positive: 0,
    negative: 0,
    neutral: 0
  };
  
  // Analizar indicadores de calidad
  for (const [type, words] of Object.entries(qualityIndicators)) {
    const typeScore = words.reduce((score, word) => {
      const wordStem = stemmer.stem(word);
      return score + stems.filter(stem => stem === wordStem).length;
    }, 0);
    
    indicators[type] = typeScore;
  }
  
  // Calcular puntaje base
  qualityScore = (indicators.positive * 1 + indicators.neutral * 0.5 - indicators.negative * 0.5) / 10;
  
  // Ajustar basado en la longitud de la respuesta
  const lengthScore = Math.min(words.length / 100, 1) * 0.3;
  
  // Ajustar basado en la relevancia del contexto
  const contextRelevance = calculateContextRelevance(text, context);
  
  // Calcular puntaje final
  const finalScore = (qualityScore * 0.4 + lengthScore * 0.3 + contextRelevance * 0.3);
  
  return {
    score: Math.min(Math.max(finalScore, 0), 1),
    indicators,
    lengthScore,
    contextRelevance
  };
}

// Función para calcular la relevancia del contexto
function calculateContextRelevance(text, context) {
  if (!context) return 0.5;
  
  const textWords = new Set(tokenizer.tokenize(text.toLowerCase()));
  const contextWords = new Set(tokenizer.tokenize(context.toLowerCase()));
  
  const intersection = new Set([...textWords].filter(x => contextWords.has(x)));
  const union = new Set([...textWords, ...contextWords]);
  
  return intersection.size / union.size;
}

// Función para analizar el sentimiento y la emoción
function analyzeSentimentAndEmotion(text) {
  const sentiment = natural.SentimentAnalyzer('es', natural.PorterStemmer, 'afinn');
  const words = tokenizer.tokenize(text);
  const score = sentiment.getSentiment(words);
  
  // Categorizar la emoción basada en el puntaje
  let emotion = 'neutral';
  if (score > 0.3) emotion = 'positive';
  else if (score < -0.3) emotion = 'negative';
  
  return {
    score,
    emotion,
    intensity: Math.abs(score)
  };
}

// Función para generar recomendaciones de mejora
function generateImprovementSuggestions(analysis) {
  const suggestions = [];
  
  if (analysis.bias.score > 0.2) {
    suggestions.push({
      type: 'bias',
      message: 'La respuesta muestra posibles sesgos. Considera usar un lenguaje más inclusivo y neutral.',
      categories: analysis.bias.categories
    });
  }
  
  if (analysis.quality.score < 0.6) {
    suggestions.push({
      type: 'quality',
      message: 'La respuesta podría mejorarse en claridad y precisión.',
      indicators: analysis.quality.indicators
    });
  }
  
  if (analysis.sentiment.intensity > 0.7) {
    suggestions.push({
      type: 'tone',
      message: 'El tono de la respuesta es muy emocional. Considera usar un lenguaje más neutral.',
      emotion: analysis.sentiment.emotion
    });
  }
  
  return suggestions;
}

// Función principal de análisis
function analyzeResponse(text, context) {
  const biasAnalysis = detectBias(text);
  const qualityAnalysis = evaluateResponseQuality(text, context);
  const sentimentAnalysis = analyzeSentimentAndEmotion(text);
  
  const analysis = {
    bias: biasAnalysis,
    quality: qualityAnalysis,
    sentiment: sentimentAnalysis,
    timestamp: new Date().toISOString()
  };
  
  analysis.suggestions = generateImprovementSuggestions(analysis);
  
  return analysis;
}

module.exports = {
  analyzeResponse,
  detectBias,
  evaluateResponseQuality,
  analyzeSentimentAndEmotion
}; 