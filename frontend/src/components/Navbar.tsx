import React from 'react';
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  IconButton,
  HStack
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../config/language_config';
import LanguageSelector from './LanguageSelector';

const Navbar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations];

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      px={4}
      position="sticky"
      top={0}
      zIndex={1000}
      boxShadow="sm"
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <Box
            as={RouterLink}
            to="/"
            fontWeight="bold"
            fontSize="xl"
            color={useColorModeValue('blue.600', 'blue.400')}
            _hover={{ textDecoration: 'none' }}
          >
            MAPLE
          </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Button
              as={RouterLink}
              to="/chat"
              variant="ghost"
              colorScheme="blue"
            >
              {t.chat.title}
            </Button>
          </HStack>
        </HStack>

        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={4} alignItems="center">
            <LanguageSelector />
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
            />
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar; 