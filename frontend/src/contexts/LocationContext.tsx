import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'es' | 'fr';

interface LocationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  countryCode: string;
  setCountryCode: (code: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [countryCode, setCountryCode] = useState('CA');

  return (
    <LocationContext.Provider value={{ language, setLanguage, countryCode, setCountryCode }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}; 