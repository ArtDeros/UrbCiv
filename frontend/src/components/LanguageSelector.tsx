import React from 'react';
import { Button, HStack } from '@chakra-ui/react';
import { FaLanguage } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, LanguageConfig } from '../config/language_config';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <HStack spacing={2}>
      {languages.map((lang: LanguageConfig) => (
        <Button
          key={lang.code}
          size="sm"
          variant={language === lang.code ? 'solid' : 'outline'}
          onClick={() => setLanguage(lang.code as 'en' | 'fr' | 'es')}
          leftIcon={<FaLanguage />}
          colorScheme="blue"
          bg={language === lang.code ? 'blue.500' : 'transparent'}
          color={language === lang.code ? 'white' : 'white'}
          _hover={{
            bg: language === lang.code ? 'blue.600' : 'whiteAlpha.200'
          }}
        >
          {lang.code.toUpperCase()}
        </Button>
      ))}
    </HStack>
  );
};

export default LanguageSelector; 