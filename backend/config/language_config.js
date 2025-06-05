module.exports = {
  languages: {
    en: {
      name: 'English',
      code: 'en',
      flag: '🇺🇸'
    },
    es: {
      name: 'Español',
      code: 'es',
      flag: '🇪🇸'
    },
    fr: {
      name: 'Français',
      code: 'fr',
      flag: '🇫🇷'
    }
  },
  defaultLanguage: 'en',
  stopWords: {
    en: ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about', 'like', 'through', 'over', 'before', 'between', 'after', 'since', 'without', 'under', 'within', 'along', 'following', 'across', 'behind', 'beyond', 'plus', 'except', 'but', 'up', 'out', 'around', 'down', 'off', 'above', 'near'],
    es: ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'o', 'pero', 'en', 'sobre', 'a', 'para', 'con', 'por', 'acerca', 'como', 'a través', 'antes', 'entre', 'después', 'desde', 'sin', 'bajo', 'dentro', 'a lo largo', 'siguiendo', 'a través', 'detrás', 'más allá', 'más', 'excepto', 'pero', 'arriba', 'fuera', 'alrededor', 'abajo', 'cerca'],
    fr: ['le', 'la', 'les', 'un', 'une', 'des', 'et', 'ou', 'mais', 'dans', 'sur', 'à', 'pour', 'avec', 'par', 'à propos', 'comme', 'à travers', 'avant', 'entre', 'après', 'depuis', 'sans', 'sous', 'dans', 'le long', 'suivant', 'à travers', 'derrière', 'au-delà', 'plus', 'sauf', 'mais', 'haut', 'dehors', 'autour', 'bas', 'près']
  },
  synonyms: {
    en: {
      'help': ['assist', 'support', 'aid', 'guide'],
      'information': ['info', 'details', 'data', 'facts'],
      'service': ['assistance', 'help', 'support', 'aid'],
      'question': ['query', 'inquiry', 'doubt', 'concern'],
      'problem': ['issue', 'trouble', 'difficulty', 'concern'],
      'need': ['require', 'want', 'must', 'should'],
      'find': ['locate', 'discover', 'search', 'look for'],
      'get': ['obtain', 'receive', 'acquire', 'gain'],
      'apply': ['submit', 'request', 'petition', 'register'],
      'check': ['verify', 'confirm', 'validate', 'examine']
    },
    es: {
      'ayuda': ['asistencia', 'soporte', 'apoyo', 'auxilio'],
      'información': ['info', 'datos', 'detalles', 'hechos'],
      'servicio': ['asistencia', 'ayuda', 'soporte', 'apoyo'],
      'pregunta': ['consulta', 'duda', 'inquietud', 'preocupación'],
      'problema': ['asunto', 'dificultad', 'inconveniente', 'preocupación'],
      'necesitar': ['requerir', 'precisar', 'deber', 'tener que'],
      'encontrar': ['localizar', 'descubrir', 'buscar', 'hallar'],
      'obtener': ['conseguir', 'recibir', 'adquirir', 'ganar'],
      'solicitar': ['presentar', 'pedir', 'solicitar', 'registrar'],
      'verificar': ['comprobar', 'confirmar', 'validar', 'examinar']
    },
    fr: {
      'aide': ['assistance', 'soutien', 'support', 'secours'],
      'information': ['info', 'détails', 'données', 'faits'],
      'service': ['assistance', 'aide', 'soutien', 'support'],
      'question': ['demande', 'doute', 'préoccupation', 'inquiétude'],
      'problème': ['difficulté', 'souci', 'préoccupation', 'inquiétude'],
      'besoin': ['nécessité', 'exigence', 'devoir', 'falloir'],
      'trouver': ['localiser', 'découvrir', 'chercher', 'rechercher'],
      'obtenir': ['recevoir', 'acquérir', 'gagner', 'trouver'],
      'demander': ['soumettre', 'solliciter', 'enregistrer', 'inscrire'],
      'vérifier': ['confirmer', 'valider', 'examiner', 'contrôler']
    }
  },
  antonyms: {
    en: {
      'help': ['hinder', 'obstruct', 'prevent', 'stop'],
      'information': ['misinformation', 'disinformation', 'falsehood'],
      'service': ['disservice', 'harm', 'damage'],
      'question': ['answer', 'solution', 'resolution'],
      'problem': ['solution', 'answer', 'resolution'],
      'need': ['want', 'desire', 'wish'],
      'find': ['lose', 'miss', 'overlook'],
      'get': ['lose', 'give', 'relinquish'],
      'apply': ['withdraw', 'cancel', 'revoke'],
      'check': ['ignore', 'overlook', 'neglect']
    },
    es: {
      'ayuda': ['obstaculizar', 'impedir', 'prevenir', 'detener'],
      'información': ['desinformación', 'falsedad', 'engaño'],
      'servicio': ['deservicio', 'daño', 'perjuicio'],
      'pregunta': ['respuesta', 'solución', 'resolución'],
      'problema': ['solución', 'respuesta', 'resolución'],
      'necesitar': ['querer', 'desear', 'anhelar'],
      'encontrar': ['perder', 'extraviar', 'pasar por alto'],
      'obtener': ['perder', 'dar', 'ceder'],
      'solicitar': ['retirar', 'cancelar', 'revocar'],
      'verificar': ['ignorar', 'pasar por alto', 'descuidar']
    },
    fr: {
      'aide': ['entraver', 'empêcher', 'prévenir', 'arrêter'],
      'information': ['désinformation', 'fausseté', 'tromperie'],
      'service': ['disservice', 'dommage', 'préjudice'],
      'question': ['réponse', 'solution', 'résolution'],
      'problème': ['solution', 'réponse', 'résolution'],
      'besoin': ['vouloir', 'désirer', 'souhaiter'],
      'trouver': ['perdre', 'manquer', 'négliger'],
      'obtenir': ['perdre', 'donner', 'céder'],
      'demander': ['retirer', 'annuler', 'révoquer'],
      'vérifier': ['ignorer', 'négliger', 'délaisser']
    }
  }
}; 