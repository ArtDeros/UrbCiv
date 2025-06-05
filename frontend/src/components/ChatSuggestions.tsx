import React from 'react';
import {
  Box,
  Button,
  HStack,
  VStack,
  Text,
  useColorModeValue,
  IconButton,
  Tooltip,
  Flex,
  Badge,
} from '@chakra-ui/react';
import { FaThumbsUp, FaThumbsDown, FaShare, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useLocation } from '../contexts/LocationContext.js';
import { Suggestion } from '../types/chat';

export interface Suggestion {
  type: 'category' | 'question';
  en: string;
  es: string;
  fr: string;
  category?: string;
}

export const suggestions: Record<string, Suggestion[]> = {
  vivienda: [
    {
      type: 'question',
      en: 'How do I apply for public housing?',
      es: '¿Cómo solicito vivienda pública?',
      fr: 'Comment faire une demande de logement social?',
      category: 'vivienda'
    },
    {
      type: 'question',
      en: 'What are the requirements for housing assistance?',
      es: '¿Cuáles son los requisitos para asistencia de vivienda?',
      fr: 'Quelles sont les conditions pour obtenir une aide au logement?',
      category: 'vivienda'
    },
    {
      type: 'question',
      en: 'Where can I find affordable housing?',
      es: '¿Dónde puedo encontrar vivienda asequible?',
      fr: 'Où puis-je trouver un logement abordable?',
      category: 'vivienda'
    }
  ],
  educacion: [
    {
      type: 'question',
      en: 'How do I enroll my child in school?',
      es: '¿Cómo inscribo a mi hijo en la escuela?',
      fr: 'Comment inscrire mon enfant à l\'école?',
      category: 'educacion'
    },
    {
      type: 'question',
      en: 'What documents do I need for school registration?',
      es: '¿Qué documentos necesito para la inscripción escolar?',
      fr: 'Quels documents sont nécessaires pour l\'inscription scolaire?',
      category: 'educacion'
    },
    {
      type: 'question',
      en: 'Are there any scholarships available?',
      es: '¿Hay becas disponibles?',
      fr: 'Y a-t-il des bourses disponibles?',
      category: 'educacion'
    }
  ],
  documentacion: [
    {
      type: 'question',
      en: 'How do I get a new ID card?',
      es: '¿Cómo obtengo una nueva cédula?',
      fr: 'Comment obtenir une nouvelle carte d\'identité?',
      category: 'documentacion'
    },
    {
      type: 'question',
      en: 'What documents do I need for a passport?',
      es: '¿Qué documentos necesito para un pasaporte?',
      fr: 'Quels documents sont nécessaires pour un passeport?',
      category: 'documentacion'
    },
    {
      type: 'question',
      en: 'How do I renew my driver\'s license?',
      es: '¿Cómo renuevo mi licencia de conducir?',
      fr: 'Comment renouveler mon permis de conduire?',
      category: 'documentacion'
    }
  ],
  transporte: [
    {
      type: 'question',
      en: 'How do I get a bus pass?',
      es: '¿Cómo obtengo un pase de bus?',
      fr: 'Comment obtenir un pass de bus?',
      category: 'transporte'
    },
    {
      type: 'question',
      en: 'What are the public transportation routes?',
      es: '¿Cuáles son las rutas de transporte público?',
      fr: 'Quelles sont les routes de transport public?',
      category: 'transporte'
    },
    {
      type: 'question',
      en: 'How do I report a problem with public transportation?',
      es: '¿Cómo reporto un problema con el transporte público?',
      fr: 'Comment signaler un problème avec les transports publics?',
      category: 'transporte'
    }
  ],
  beneficio: [
    {
      type: 'question',
      en: 'How do I apply for social benefits?',
      es: '¿Cómo solicito beneficios sociales?',
      fr: 'Comment demander des prestations sociales?',
      category: 'beneficio'
    },
    {
      type: 'question',
      en: 'What benefits am I eligible for?',
      es: '¿A qué beneficios soy elegible?',
      fr: 'À quelles prestations ai-je droit?',
      category: 'beneficio'
    },
    {
      type: 'question',
      en: 'How do I renew my benefits?',
      es: '¿Cómo renuevo mis beneficios?',
      fr: 'Comment renouveler mes prestations?',
      category: 'beneficio'
    }
  ],
  salud: [
    {
      type: 'question',
      en: 'How do I get health insurance?',
      es: '¿Cómo obtengo seguro de salud?',
      fr: 'Comment obtenir une assurance maladie?',
      category: 'salud'
    },
    {
      type: 'question',
      en: 'Where is the nearest hospital?',
      es: '¿Dónde está el hospital más cercano?',
      fr: 'Où se trouve l\'hôpital le plus proche?',
      category: 'salud'
    },
    {
      type: 'question',
      en: 'How do I make a medical appointment?',
      es: '¿Cómo hago una cita médica?',
      fr: 'Comment prendre rendez-vous chez le médecin?',
      category: 'salud'
    }
  ],
  trabajo: [
    {
      type: 'question',
      en: 'How do I find a job?',
      es: '¿Cómo encuentro trabajo?',
      fr: 'Comment trouver un emploi?',
      category: 'trabajo'
    },
    {
      type: 'question',
      en: 'What are the requirements for work permits?',
      es: '¿Cuáles son los requisitos para permisos de trabajo?',
      fr: 'Quelles sont les conditions pour les permis de travail?',
      category: 'trabajo'
    },
    {
      type: 'question',
      en: 'How do I file for unemployment benefits?',
      es: '¿Cómo solicito beneficios por desempleo?',
      fr: 'Comment demander des allocations de chômage?',
      category: 'trabajo'
    }
  ],
  justicia: [
    {
      type: 'question',
      en: 'How do I file a complaint?',
      es: '¿Cómo presento una queja?',
      fr: 'Comment déposer une plainte?',
      category: 'justicia'
    },
    {
      type: 'question',
      en: 'Where can I get legal advice?',
      es: '¿Dónde puedo obtener asesoría legal?',
      fr: 'Où puis-je obtenir des conseils juridiques?',
      category: 'justicia'
    },
    {
      type: 'question',
      en: 'How do I report a crime?',
      es: '¿Cómo denuncio un delito?',
      fr: 'Comment signaler un crime?',
      category: 'justicia'
    }
  ]
};

const categories: Suggestion[] = [
  {
    type: 'category',
    en: 'Housing',
    es: 'Vivienda',
    fr: 'Logement',
    category: 'vivienda'
  },
  {
    type: 'category',
    en: 'Education',
    es: 'Educación',
    fr: 'Éducation',
    category: 'educacion'
  },
  {
    type: 'category',
    en: 'Documentation',
    es: 'Documentación',
    fr: 'Documentation',
    category: 'documentacion'
  },
  {
    type: 'category',
    en: 'Transportation',
    es: 'Transporte',
    fr: 'Transport',
    category: 'transporte'
  },
  {
    type: 'category',
    en: 'Benefits',
    es: 'Beneficios',
    fr: 'Prestations',
    category: 'beneficio'
  },
  {
    type: 'category',
    en: 'Health',
    es: 'Salud',
    fr: 'Santé',
    category: 'salud'
  },
  {
    type: 'category',
    en: 'Employment',
    es: 'Trabajo',
    fr: 'Emploi',
    category: 'trabajo'
  },
  {
    type: 'category',
    en: 'Justice',
    es: 'Justicia',
    fr: 'Justice',
    category: 'justicia'
  }
];

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: Suggestion) => void;
  category?: string | null;
}

const ChatSuggestions = ({ onSuggestionClick, category }: ChatSuggestionsProps) => {
  const { language } = useLocation();
  const isEnglish = language === 'en';
  const isFrench = language === 'fr';
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

  const handleCategoryClick = (category: string) => {
    const welcomeMessage = {
      en: `Before we start, what's your name?`,
      es: `Antes de empezar, dime cómo te llamas`,
      fr: `Avant de commencer, quel est votre nom ?`,
      category: category,
      type: 'category' as const
    };
    onSuggestionClick(welcomeMessage);
    setCurrentQuestionIndex(0);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    onSuggestionClick(suggestion);
    // Avanzar al siguiente índice, volviendo al inicio si llegamos al final
    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      const totalQuestions = suggestions[category as keyof typeof suggestions]?.length || 0;
      return nextIndex >= totalQuestions ? 0 : nextIndex;
    });
  };

  return (
    <Box
      p={4}
      bg={bgColor}
      borderRadius="md"
      borderWidth="1px"
      borderColor={borderColor}
      mb={4}
    >
      <Text fontSize="lg" fontWeight="bold" mb={3} color={useColorModeValue('black', 'white')}>
        {isEnglish ? 'Select a Category' : 
         isFrench ? 'Sélectionnez une Catégorie' : 
         'Selecciona una Categoría'}
      </Text>
      <VStack spacing={2} align="stretch">
        {categories.map((cat) => (
          <Button
            key={cat.category}
            variant={category === cat.category ? 'solid' : 'outline'}
            size="sm"
            onClick={() => handleCategoryClick(cat.category as string)}
            justifyContent="flex-start"
            textAlign="left"
            whiteSpace="normal"
            height="auto"
            py={2}
            colorScheme={category === cat.category ? "blue" : "gray"}
            _hover={{
              bg: useColorModeValue('gray.100', 'gray.700')
            }}
          >
            {isEnglish ? cat.en : isFrench ? cat.fr : cat.es}
          </Button>
        ))}
      </VStack>

      {category && suggestions[category as keyof typeof suggestions] && (
        <Box mt={4}>
          <Text fontSize="lg" fontWeight="bold" mb={3} color={useColorModeValue('black', 'white')}>
            {isEnglish ? 'Suggested Question' : 
             isFrench ? 'Question Suggérée' : 
             'Pregunta Sugerida'}
          </Text>
          <VStack spacing={2} align="stretch">
            {suggestions[category as keyof typeof suggestions][currentQuestionIndex] && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(suggestions[category as keyof typeof suggestions][currentQuestionIndex])}
                justifyContent="flex-start"
                textAlign="left"
                whiteSpace="normal"
                height="auto"
                py={2}
                colorScheme="blue"
                _hover={{
                  bg: useColorModeValue('gray.100', 'gray.700')
                }}
              >
                {isEnglish 
                  ? suggestions[category as keyof typeof suggestions][currentQuestionIndex].en 
                  : isFrench
                    ? suggestions[category as keyof typeof suggestions][currentQuestionIndex].fr
                    : suggestions[category as keyof typeof suggestions][currentQuestionIndex].es}
              </Button>
            )}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default ChatSuggestions; 