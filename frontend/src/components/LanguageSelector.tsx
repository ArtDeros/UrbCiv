import React from 'react';
import { Box, Select, useColorModeValue } from '@chakra-ui/react';
import { useLocation, Language } from '../contexts/LocationContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLocation();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value as Language;
    setLanguage(newLanguage);
    // Forzar recarga de la página para asegurar que todos los componentes se actualicen
    window.location.reload();
  };

  return (
    <Box
      position="fixed"
      top={4}
      right={4}
      zIndex={1000}
      bg={bgColor}
      p={2}
      borderRadius="md"
      boxShadow="sm"
      border="1px solid"
      borderColor={borderColor}
    >
      <Select
        value={language}
        onChange={handleLanguageChange}
        size="sm"
        variant="filled"
        bg={useColorModeValue('gray.50', 'gray.700')}
        _hover={{
          bg: useColorModeValue('gray.100', 'gray.600')
        }}
      >
        <option value="en">English 🇺🇸</option>
        <option value="es">Español 🇪🇸</option>
        <option value="fr">Français 🇫🇷</option>
      </Select>
    </Box>
  );
};

export default LanguageSelector; 