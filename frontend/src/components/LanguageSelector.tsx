import React from 'react';
import { Box, Select, useColorModeValue } from '@chakra-ui/react';
import { useLocation, Language } from '../contexts/LocationContext';
import { languages } from '../config/language_config';

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
        {Object.entries(languages).map(([code, { name, flag }]) => (
          <option key={code} value={code}>
            {name} {flag}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default LanguageSelector; 