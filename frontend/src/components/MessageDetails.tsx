import React from 'react';
import { Box, VStack, Text, Link, List, ListItem, ListIcon, Flex, IconButton, useColorModeValue } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaLink, FaArrowRight, FaThumbsUp, FaThumbsDown, FaShare, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import type { Message } from '../types/chat';

interface MessageDetailsProps {
  message: Message;
  onRate: (messageId: string, rating: 'positive' | 'negative') => void;
  onShare: (messageId: string) => void;
  onSave: (messageId: string) => void;
  language: 'en' | 'fr' | 'es';
}

export const MessageDetails: React.FC<MessageDetailsProps> = ({ message, onRate, onShare, onSave, language }) => {
  const bgColor = useColorModeValue(message.isUser ? 'blue.500' : 'gray.100', message.isUser ? 'blue.600' : 'gray.700');
  const textColor = useColorModeValue(message.isUser ? 'white' : 'inherit', message.isUser ? 'white' : 'gray.200');

  return (
    <Box
      mb={4}
      display="flex"
      flexDirection="column"
      alignItems={message.isUser ? 'flex-end' : 'flex-start'}
    >
      <Box
        maxW="80%"
        bg={bgColor}
        color={textColor}
        p={4}
        borderRadius="lg"
        position="relative"
      >
        <Text>{message.text}</Text>
        
        {message.details && (
          <Box mt={4} pt={4} borderTop="1px solid" borderColor={useColorModeValue('gray.200', 'gray.600')}>
            <VStack align="stretch" spacing={4}>
              {message.details.location && (
                <Box>
                  <Text fontWeight="bold" mb={2}>
                    {language === 'en' ? 'Location' : language === 'fr' ? 'Emplacement' : 'Ubicación'}
                  </Text>
                  <List spacing={2}>
                    <ListItem>
                      <ListIcon as={FaMapMarkerAlt} color="blue.500" />
                      <Text fontWeight="semibold">{message.details.location.name}</Text>
                      <Text fontSize="sm">{message.details.location.address}</Text>
                      <Text fontSize="sm">Phone: {message.details.location.phone}</Text>
                      <Text fontSize="sm">Hours: {message.details.location.hours}</Text>
                    </ListItem>
                  </List>
                </Box>
              )}

              {message.details.services && message.details.services.length > 0 && (
                <Box>
                  <Text fontWeight="bold" mb={2}>
                    {language === 'en' ? 'Available Services' : language === 'fr' ? 'Services Disponibles' : 'Servicios Disponibles'}
                  </Text>
                  <List spacing={2}>
                    {message.details.services.map((service, index) => (
                      <ListItem key={index}>
                        <ListIcon as={FaArrowRight} color="blue.500" />
                        {service}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {message.details.links && message.details.links.length > 0 && (
                <Box>
                  <Text fontWeight="bold" mb={2}>
                    {language === 'en' ? 'Useful Links' : language === 'fr' ? 'Liens Utiles' : 'Enlaces Útiles'}
                  </Text>
                  <List spacing={2}>
                    {message.details.links.map((link, index) => (
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

              {message.details.nextSteps && (
                <Box>
                  <Text fontWeight="bold" mb={2}>
                    {language === 'en' ? 'Next Steps' : language === 'fr' ? 'Prochaines Étapes' : 'Próximos Pasos'}
                  </Text>
                  <Text>{message.details.nextSteps}</Text>
                </Box>
              )}
            </VStack>
          </Box>
        )}

        <Flex mt={2} justify="flex-end" gap={2}>
          <IconButton
            aria-label="Rate positive"
            icon={<FaThumbsUp />}
            size="sm"
            variant="ghost"
            onClick={() => onRate(message.id, 'positive')}
            color={message.rating === 'positive' ? 'green.500' : undefined}
          />
          <IconButton
            aria-label="Rate negative"
            icon={<FaThumbsDown />}
            size="sm"
            variant="ghost"
            onClick={() => onRate(message.id, 'negative')}
            color={message.rating === 'negative' ? 'red.500' : undefined}
          />
          <IconButton
            aria-label="Share"
            icon={<FaShare />}
            size="sm"
            variant="ghost"
            onClick={() => onShare(message.id)}
          />
          <IconButton
            aria-label="Save"
            icon={message.isFavorite ? <FaBookmark /> : <FaRegBookmark />}
            size="sm"
            variant="ghost"
            onClick={() => onSave(message.id)}
            color={message.isFavorite ? 'yellow.500' : undefined}
          />
        </Flex>
      </Box>
    </Box>
  );
}; 