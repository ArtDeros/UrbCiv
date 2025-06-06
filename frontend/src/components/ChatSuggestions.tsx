import React from 'react';
import {
  Box,
  SimpleGrid,
  Button,
  Text,
  useColorModeValue,
  useBreakpointValue
} from '@chakra-ui/react';
import { useLanguage } from '../contexts/LanguageContext';

interface ChatSuggestionsProps {
  onSuggestionClick: (category: string) => void;
  category: string | null;
}

type CategoryType = {
  [key: string]: string[];
};

type CategoriesType = {
  en: CategoryType;
  fr: CategoryType;
  es: CategoryType;
};

const categories: CategoriesType = {
  en: {
    'Government Services': [
      'Passport Application',
      'Driver\'s License',
      'Health Card',
      'Tax Information'
    ],
    'Transportation': [
      'Public Transit',
      'Road Conditions',
      'Parking Information',
      'Bike Routes'
    ],
    'Housing': [
      'Rent Assistance',
      'Home Buying',
      'Property Tax',
      'Housing Programs'
    ],
    'Education': [
      'School Registration',
      'Student Loans',
      'Scholarships',
      'Adult Education'
    ]
  },
  fr: {
    'Services Gouvernementaux': [
      'Demande de Passeport',
      'Permis de Conduire',
      'Carte Santé',
      'Informations Fiscales'
    ],
    'Transport': [
      'Transport en Commun',
      'Conditions Routières',
      'Information de Stationnement',
      'Pistes Cyclables'
    ],
    'Logement': [
      'Aide au Loyer',
      'Achat de Maison',
      'Taxe Foncière',
      'Programmes de Logement'
    ],
    'Éducation': [
      'Inscription Scolaire',
      'Prêts Étudiants',
      'Bourses',
      'Éducation des Adultes'
    ]
  },
  es: {
    'Servicios Gubernamentales': [
      'Solicitud de Pasaporte',
      'Licencia de Conducir',
      'Tarjeta de Salud',
      'Información Fiscal'
    ],
    'Transporte': [
      'Transporte Público',
      'Condiciones Viales',
      'Información de Estacionamiento',
      'Rutas en Bicicleta'
    ],
    'Vivienda': [
      'Asistencia de Renta',
      'Compra de Vivienda',
      'Impuesto Predial',
      'Programas de Vivienda'
    ],
    'Educación': [
      'Registro Escolar',
      'Préstamos Estudiantiles',
      'Becas',
      'Educación de Adultos'
    ]
  }
};

const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({ onSuggestionClick }) => {
  const { language } = useLanguage();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const currentCategories = categories[language as keyof typeof categories];

  return (
    <Box>
      <Text
        fontSize={isMobile ? "lg" : "xl"}
        fontWeight="bold"
        mb={4}
        color="gray.700"
      >
        {language === 'en' ? 'Select a Category' : language === 'fr' ? 'Sélectionnez une Catégorie' : 'Selecciona una Categoría'}
      </Text>
      <SimpleGrid columns={isMobile ? 1 : 2} spacing={4}>
        {Object.entries(currentCategories).map(([categoryName, suggestions]) => (
          <Box
            key={categoryName}
            p={4}
            borderRadius="lg"
            bg="white"
            boxShadow="md"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg'
            }}
            transition="all 0.2s"
          >
            <Text
              fontSize={isMobile ? "md" : "lg"}
              fontWeight="semibold"
              mb={3}
              color="blue.600"
            >
              {categoryName}
            </Text>
            <SimpleGrid columns={1} spacing={2}>
              {suggestions.map((suggestion: string) => (
                <Button
                  key={suggestion}
                  size={isMobile ? "sm" : "md"}
                  variant="outline"
                  colorScheme="blue"
                  onClick={() => onSuggestionClick(suggestion)}
                  width="100%"
                  justifyContent="flex-start"
                  _hover={{
                    bg: 'blue.50',
                    transform: 'translateX(4px)'
                  }}
                  transition="all 0.2s"
                >
                  {suggestion}
                </Button>
              ))}
            </SimpleGrid>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ChatSuggestions; 