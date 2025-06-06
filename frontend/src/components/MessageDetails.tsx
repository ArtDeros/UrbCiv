import React from 'react';
import { Box, VStack, Text, Link, List, ListItem, ListIcon } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaLink, FaArrowRight } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

interface MessageDetailsProps {
  details: {
    location?: {
      name: string;
      address: string;
      phone: string;
      hours: string;
    };
    services?: string[];
    links?: { title: string; url: string; }[];
    nextSteps?: string;
  };
  language: 'en' | 'fr' | 'es';
}

export const MessageDetails: React.FC<MessageDetailsProps> = ({ details, language }) => {
  const translations = {
    en: {
      location: 'Location',
      services: 'Available Services',
      links: 'Useful Links',
      nextSteps: 'Next Steps'
    },
    fr: {
      location: 'Emplacement',
      services: 'Services Disponibles',
      links: 'Liens Utiles',
      nextSteps: 'Prochaines Étapes'
    },
    es: {
      location: 'Ubicación',
      services: 'Servicios Disponibles',
      links: 'Enlaces Útiles',
      nextSteps: 'Próximos Pasos'
    }
  };

  const t = translations[language];

  return (
    <Box mt={4} pt={4} borderTop="1px solid" borderColor="gray.200">
      <VStack align="stretch" spacing={4}>
        {details.location && (
          <Box>
            <Text fontWeight="bold" mb={2}>
              {t.location}
            </Text>
            <List spacing={2}>
              <ListItem>
                <ListIcon as={FaMapMarkerAlt} color="blue.500" />
                <Text fontWeight="semibold">{details.location.name}</Text>
                <Text fontSize="sm">{details.location.address}</Text>
                <Text fontSize="sm">Phone: {details.location.phone}</Text>
                <Text fontSize="sm">Hours: {details.location.hours}</Text>
              </ListItem>
            </List>
          </Box>
        )}

        {details.services && details.services.length > 0 && (
          <Box>
            <Text fontWeight="bold" mb={2}>
              {t.services}
            </Text>
            <List spacing={2}>
              {details.services.map((service, index) => (
                <ListItem key={index}>
                  <ListIcon as={FaArrowRight} color="blue.500" />
                  {service}
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {details.links && details.links.length > 0 && (
          <Box>
            <Text fontWeight="bold" mb={2}>
              {t.links}
            </Text>
            <List spacing={2}>
              {details.links.map((link, index) => (
                <ListItem key={index}>
                  <ListIcon as={FaLink} color="blue.500" />
                  <Link href={link.url} isExternal color="blue.500">
                    {link.title}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {details.nextSteps && (
          <Box>
            <Text fontWeight="bold" mb={2}>
              {t.nextSteps}
            </Text>
            <Text>{details.nextSteps}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}; 