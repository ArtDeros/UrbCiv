import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LocationProvider } from './contexts/LocationContext'
import { ColorModeProvider } from './contexts/ColorModeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Chat from './pages/Chat'
import theme from './theme'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider>
        <LocationProvider>
          <LanguageProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </Router>
          </LanguageProvider>
        </LocationProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default App 