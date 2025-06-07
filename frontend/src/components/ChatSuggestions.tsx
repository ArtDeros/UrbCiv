import React from 'react';
import {
  Box,
  SimpleGrid,
  Button,
  Text,
  useColorModeValue,
  useBreakpointValue,
  Container
} from '@chakra-ui/react';
import { useLanguage } from '../contexts/LanguageContext';

// Importar imágenes directamente
import monGov from '../assets/Mon gov.jpg';
import vanGov from '../assets/Van gov.jpg';
import torGov from '../assets/Tor gov.jpg';

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
  
  // Colores para modo claro/oscuro
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const categoryColor = useColorModeValue('blue.600', 'blue.300');
  const buttonHoverBg = useColorModeValue('blue.50', 'blue.900');
  const cardShadow = useColorModeValue('md', 'lg');

  // Seleccionar imagen de fondo según el idioma
  const getBackgroundImage = () => {
    switch (language) {
      case 'fr':
        return monGov;
      case 'en':
        return vanGov;
      case 'es':
        return torGov;
      default:
        return torGov;
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box
        position="relative"
        minH="100vh"
        w="100%"
        bg={useColorModeValue('gray.50', 'gray.900')}
        borderRadius="xl"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundImage={`url(${getBackgroundImage()})`}
          backgroundSize="cover"
          backgroundPosition="center"
          opacity={0.15}
          zIndex={0}
        />
        <Box position="relative" zIndex={1} p={6}>
          <Text
            fontSize={isMobile ? "lg" : "xl"}
            fontWeight="bold"
            mb={6}
            color={textColor}
            textAlign="center"
          >
            {language === 'en' ? 'Select a Category' : language === 'fr' ? 'Sélectionnez une Catégorie' : 'Selecciona una Categoría'}
          </Text>
          <SimpleGrid columns={isMobile ? 1 : 2} spacing={6}>
            {Object.entries(currentCategories).map(([categoryName, suggestions]) => (
              <Box
                key={categoryName}
                p={6}
                borderRadius="lg"
                bg={bgColor}
                boxShadow={cardShadow}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg'
                }}
                transition="all 0.2s"
              >
                <Text
                  fontSize={isMobile ? "md" : "lg"}
                  fontWeight="semibold"
                  mb={4}
                  color={categoryColor}
                >
                  {categoryName}
                </Text>
                <SimpleGrid columns={1} spacing={3}>
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
                        bg: buttonHoverBg,
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
      </Box>
    </Container>
  );
};

export default ChatSuggestions; 