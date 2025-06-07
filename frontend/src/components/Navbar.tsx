import React from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaMoon, FaSun, FaGlobe } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { language, setLanguage } = useLanguage();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
  ];

  return (
    <Box
      as="nav"
      position="fixed"
      w="100%"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      zIndex={1000}
    >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        px={4}
        maxW="container.xl"
        mx="auto"
      >
        <HStack spacing={4}>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            variant="ghost"
          />
        </HStack>

        <HStack spacing={4}>
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<FaGlobe />}
              variant="ghost"
            >
              {languages.find(lang => lang.code === language)?.name}
            </MenuButton>
            <MenuList>
              {languages.map((lang) => (
                <MenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as 'en' | 'fr' | 'es')}
                >
                  {lang.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar; 