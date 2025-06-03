import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'es' | 'fr';

type LocationContextType = {
  language: Language
  countryCode: string
  setLanguage: (lang: Language) => void
}

const LocationContext = createContext<LocationContextType>({
  language: 'en',
  countryCode: 'CA',
  setLanguage: () => {}
});

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [countryCode] = useState('CA');

  return (
    <LocationContext.Provider value={{ language, countryCode, setLanguage }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext); 