import React, { createContext, useContext, useState } from 'react';

type LocationContextType = {
  language: 'en' | 'es'
  countryCode: string
  setLanguage: (lang: 'en' | 'es') => void
}

const LocationContext = createContext<LocationContextType>({
  language: 'en',
  countryCode: 'CA',
  setLanguage: () => {}
});

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [countryCode] = useState('CA');

  return (
    <LocationContext.Provider value={{ language, countryCode, setLanguage }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext); 