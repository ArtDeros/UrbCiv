import React from 'react';
import { Button, HStack, Tooltip } from '@chakra-ui/react';
import { FaLanguage } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../config/language_config';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <HStack spacing={2}>
      {languages.map((lang) => (
        <Tooltip 
          key={lang.code} 
          label={lang.name} 
          placement="bottom"
        >
          <Button
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
            {lang.flag} {lang.code.toUpperCase()}
          </Button>
        </Tooltip>
      ))}
    </HStack>
  );
};

export default LanguageSelector; 