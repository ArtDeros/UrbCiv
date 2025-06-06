import React from 'react';
import {
  Box,
  VStack,
  Text,
  List,
  ListItem,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaCheck, FaExternalLinkAlt } from 'react-icons/fa';

interface MessageDetailsProps {
  details: {
    location: {
      name: string;
      address: string;
      phone: string;
      hours: string;
    };
    services: string[];
    links: Array<{
      title: string;
      url: string;
    }>;
    nextSteps: string;
  };
  language: string;
}

const ExternalLinkIcon = () => (
  <Box as="span" mx="2px">
    <FaExternalLinkAlt size={16} />
  </Box>
);

export const MessageDetails: React.FC<MessageDetailsProps> = ({ details, language }) => {
  const translations = {
    locationInfo: {
      en: 'Location Information',
      es: 'Información de ubicación',
      fr: 'Informations de localisation'
    },
    availableServices: {
      en: 'Available Services',
      es: 'Servicios disponibles',
      fr: 'Services disponibles'
    },
    usefulLinks: {
      en: 'Useful Links',
      es: 'Enlaces útiles',
      fr: 'Liens utiles'
    },
    nextSteps: {
      en: 'Next Steps',
      es: 'Próximos pasos',
      fr: 'Prochaines étapes'
    }
  };

  return (
    <Box mt={4} p={4} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md">
      <VStack align="stretch" spacing={3}>
        {/* Location Information */}
        <Box>
          <Text fontWeight="bold" mb={2}>
            {translations.locationInfo[language as keyof typeof translations.locationInfo]}
          </Text>
          <Text>{details.location.name}</Text>
          <Text>{details.location.address}</Text>
          <Text>{details.location.phone}</Text>
          <Text>{details.location.hours}</Text>
        </Box>

        {/* Available Services */}
        <Box>
          <Text fontWeight="bold" mb={2}>
            {translations.availableServices[language as keyof typeof translations.availableServices]}
          </Text>
          <List spacing={1}>
            {details.services.map((service: string, index: number) => (
              <ListItem key={index}>
                <Box as="span" color="green.500" mr={2}>
                  <FaCheck />
                </Box>
                {service}
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Useful Links */}
        <Box>
          <Text fontWeight="bold" mb={2}>
            {translations.usefulLinks[language as keyof typeof translations.usefulLinks]}
          </Text>
          <List spacing={1}>
            {details.links.map((link: any, index: number) => (
              <ListItem key={index}>
                <Link href={link.url} color="blue.500" isExternal>
                  {link.title} <ExternalLinkIcon />
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Next Steps */}
        <Box>
          <Text fontWeight="bold" mb={2}>
            {translations.nextSteps[language as keyof typeof translations.nextSteps]}
          </Text>
          <Text>{details.nextSteps}</Text>
        </Box>
      </VStack>
    </Box>
  );
}; 