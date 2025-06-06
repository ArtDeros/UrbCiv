export interface LanguageConfig {
  code: string;
  name: string;
  flag: string;
}

export const languages: LanguageConfig[] = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷'
  },
  {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸'
  }
]; 