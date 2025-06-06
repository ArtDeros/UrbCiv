import React from 'react';
import {
  Box,
  SimpleGrid,
  Button,
  Text,
  VStack,
  useColorModeValue,
  Icon,
  Flex,
  Badge,
  Tooltip,
  useBreakpointValue
} from '@chakra-ui/react';
import { FaHome, FaHeartbeat, FaGraduationCap } from 'react-icons/fa';
import { categories } from '../config/qa_config';
import { CategoryKey } from '../types/chat';

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string, category?: CategoryKey) => void;
  category?: CategoryKey;
}

const categoryIcons = {
  vivienda: FaHome,
  salud: FaHeartbeat,
  educacion: FaGraduationCap,
};

const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({ onSuggestionClick, category }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('blue.50', 'blue.900');

  if (category) {
    const categoryData = categories[category];
    return (
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4} color="blue.600">
          {categoryData.name}
        </Text>
        <SimpleGrid columns={isMobile ? 1 : 2} spacing={4}>
          {categoryData.suggestions.map((suggestion, index) => (
            <Button
              key={index}
              onClick={() => onSuggestionClick(suggestion.text)}
              variant="outline"
              size="lg"
              height="auto"
              p={4}
              whiteSpace="normal"
              textAlign="left"
              justifyContent="flex-start"
              bg={bgColor}
              borderColor={borderColor}
              _hover={{
                bg: hoverBg,
                transform: 'translateY(-2px)',
                shadow: 'md'
              }}
              transition="all 0.2s"
            >
              <VStack align="start" spacing={2}>
                <Text fontWeight="medium">{suggestion.text}</Text>
                <Badge colorScheme="blue" fontSize="xs">
                  {suggestion.category}
                </Badge>
              </VStack>
            </Button>
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={6} color="blue.600">
        Select a category to get started
      </Text>
      <SimpleGrid columns={isMobile ? 1 : 3} spacing={6}>
        {Object.entries(categories).map(([key, data]) => (
          <Button
            key={key}
            onClick={() => onSuggestionClick(key as CategoryKey)}
            variant="outline"
            size="lg"
            height="auto"
            p={6}
            bg={bgColor}
            borderColor={borderColor}
            _hover={{
              bg: hoverBg,
              transform: 'translateY(-2px)',
              shadow: 'lg'
            }}
            transition="all 0.2s"
          >
            <VStack spacing={4} align="center" w="100%">
              <Icon
                as={categoryIcons[key as CategoryKey]}
                boxSize={8}
                color="blue.500"
              />
              <Box textAlign="center">
                <Text fontWeight="bold" fontSize="lg" mb={2}>
                  {data.name}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {data.description}
                </Text>
              </Box>
              <Badge colorScheme="blue" fontSize="xs">
                {data.suggestions.length} questions
              </Badge>
            </VStack>
          </Button>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ChatSuggestions; 