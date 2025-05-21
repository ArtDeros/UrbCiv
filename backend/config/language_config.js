const languageConfig = {
  synonyms: {
    // Vivienda
    'casa': ['vivienda', 'hogar', 'residencia', 'domicilio', 'alojamiento'],
    'subsidio': ['ayuda', 'asistencia', 'apoyo', 'beneficio'],
    'aplicar': ['solicitar', 'postular', 'registrar', 'inscribir'],
    'requisito': ['requerimiento', 'condición', 'exigencia', 'prerrequisito'],
    
    // Educación
    'escuela': ['colegio', 'institución', 'centro educativo', 'plantel'],
    'estudiar': ['aprender', 'formarse', 'educarse', 'capacitarse'],
    'curso': ['clase', 'materia', 'asignatura', 'programa'],
    
    // Transporte
    'transporte': ['transporte público', 'transit', 'transporte colectivo'],
    'tarjeta': ['pase', 'tarjeta de transporte', 'compass card'],
    'bus': ['autobús', 'ómnibus', 'colectivo', 'transporte público']
  },
  
  antonyms: {
    'subsidio': ['pago completo', 'precio total'],
    'público': ['privado'],
    'gratuito': ['de pago', 'pagado'],
    'aceptado': ['rechazado', 'denegado'],
    'elegible': ['no elegible', 'inadmisible']
  },
  
  // Palabras comunes que pueden ser ignoradas en la búsqueda
  stopWords: [
    'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
    'y', 'o', 'pero', 'porque', 'si', 'no', 'que', 'cual',
    'como', 'donde', 'cuando', 'quien', 'cuyo', 'cuyos',
    'the', 'a', 'an', 'and', 'or', 'but', 'if', 'because',
    'what', 'which', 'how', 'where', 'when', 'who', 'whose'
  ]
};

module.exports = languageConfig; 