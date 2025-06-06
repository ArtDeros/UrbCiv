import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

type Language = 'en' | 'es' | 'fr';

interface LocationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  location: Location | null;
  updateLocation: (location: Location) => void;
}

const LocationContext = createContext<LocationContextType>({
  language: 'en',
  setLanguage: () => {},
  location: null,
  updateLocation: () => {},
});

export const useLocation = () => useContext(LocationContext);

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [location, setLocation] = useState<Location | null>(null);

  const updateLocation = (newLocation: Location) => {
    setLocation(newLocation);
  };

  return (
    <LocationContext.Provider value={{ language, setLanguage, location, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
}; 