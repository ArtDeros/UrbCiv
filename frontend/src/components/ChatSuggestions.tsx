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

interface Suggestion {
  text: string;
  category?: string;
}

interface ChatSuggestionsProps {
  suggestions: Suggestion[];
  onSuggestionClick: (suggestion: Suggestion) => void;
  onRateResponse: (rating: 'positive' | 'negative') => void;
  onShareResponse: () => void;
  onSaveResponse: () => void;
  isSaved: boolean;
  responseQuality?: number;
  biasScore?: number;
}

const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({
  suggestions,
  onSuggestionClick,
  onRateResponse,
  onShareResponse,
  onSaveResponse,
  isSaved,
  responseQuality,
  biasScore,
}) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <VStack spacing={4} align="stretch" w="100%">
      {/* Calidad de respuesta y sesgo */}
      {(responseQuality !== undefined || biasScore !== undefined) && (
        <Flex justify="space-between" align="center" px={2}>
          {responseQuality !== undefined && (
            <Tooltip label="Calidad de la respuesta">
              <Badge colorScheme={responseQuality > 0.7 ? 'green' : responseQuality > 0.4 ? 'yellow' : 'red'}>
                Calidad: {Math.round(responseQuality * 100)}%
              </Badge>
            </Tooltip>
          )}
          {biasScore !== undefined && (
            <Tooltip label="Nivel de sesgo detectado">
              <Badge colorScheme={biasScore < 0.2 ? 'green' : biasScore < 0.5 ? 'yellow' : 'red'}>
                Sesgo: {Math.round(biasScore * 100)}%
              </Badge>
            </Tooltip>
          )}
        </Flex>
      )}

      {/* Botones de acción */}
      <HStack spacing={2} justify="flex-end">
        <Tooltip label="Calificar positivamente">
          <IconButton
            aria-label="Calificar positivamente"
            icon={<FaThumbsUp />}
            size="sm"
            onClick={() => onRateResponse('positive')}
            colorScheme="green"
            variant="ghost"
          />
        </Tooltip>
        <Tooltip label="Calificar negativamente">
          <IconButton
            aria-label="Calificar negativamente"
            icon={<FaThumbsDown />}
            size="sm"
            onClick={() => onRateResponse('negative')}
            colorScheme="red"
            variant="ghost"
          />
        </Tooltip>
        <Tooltip label="Compartir respuesta">
          <IconButton
            aria-label="Compartir respuesta"
            icon={<FaShare />}
            size="sm"
            onClick={onShareResponse}
            colorScheme="blue"
            variant="ghost"
          />
        </Tooltip>
        <Tooltip label={isSaved ? "Quitar de favoritos" : "Guardar en favoritos"}>
          <IconButton
            aria-label="Guardar respuesta"
            icon={isSaved ? <FaBookmark /> : <FaRegBookmark />}
            size="sm"
            onClick={onSaveResponse}
            colorScheme="yellow"
            variant="ghost"
          />
        </Tooltip>
      </HStack>

      {/* Sugerencias rápidas */}
      {suggestions.length > 0 && (
        <Box
          p={2}
          bg={bgColor}
          borderRadius="md"
          border="1px"
          borderColor={borderColor}
        >
          <Text fontSize="sm" mb={2} fontWeight="medium">
            Sugerencias relacionadas:
          </Text>
          <HStack spacing={2} wrap="wrap">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                size="sm"
                variant="outline"
                onClick={() => onSuggestionClick(suggestion)}
                colorScheme="blue"
              >
                {suggestion.text}
              </Button>
            ))}
          </HStack>
        </Box>
      )}
    </VStack>
  );
};

export default ChatSuggestions; 