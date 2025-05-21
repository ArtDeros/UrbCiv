import React, { createContext, useContext } from 'react';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';

interface ColorModeContextType {
  colorMode: string;
  toggleColorMode: () => void;
  bgColor: string;
  textColor: string;
  cardBg: string;
}

const ColorModeContext = createContext<ColorModeContextType>({
  colorMode: 'light',
  toggleColorMode: () => {},
  bgColor: 'gray.50',
  textColor: 'gray.800',
  cardBg: 'white',
});

export const useColorModeContext = () => useContext(ColorModeContext);

export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <ColorModeContext.Provider
      value={{
        colorMode,
        toggleColorMode,
        bgColor,
        textColor,
        cardBg,
      }}
    >
      {children}
    </ColorModeContext.Provider>
  );
}; 