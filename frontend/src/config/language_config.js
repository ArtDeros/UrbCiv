export const languages = {
  en: {
    name: 'English',
    flag: '🇺🇸',
    code: 'en'
  },
  es: {
    name: 'Español',
    flag: '🇪🇸',
    code: 'es'
  },
  fr: {
    name: 'Français',
    flag: '🇫🇷',
    code: 'fr'
  }
};

export const defaultLanguage = 'en';

export const getLanguageName = (code) => {
  return languages[code]?.name || languages[defaultLanguage].name;
};

export const getLanguageFlag = (code) => {
  return languages[code]?.flag || languages[defaultLanguage].flag;
}; 