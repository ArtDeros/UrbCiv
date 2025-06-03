import React from 'react';
import { Select } from '@chakra-ui/react';
import { useLocation } from '../contexts/LocationContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLocation();

  return (
    <Select
      value={language}
      onChange={(e) => setLanguage(e.target.value as 'en' | 'es' | 'fr')}
      size="sm"
      width="auto"
      marginLeft="2"
    >
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </Select>
  );
};

export default LanguageSelector; 