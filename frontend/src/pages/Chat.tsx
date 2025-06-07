import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Container,
  Flex,
  Spinner,
  useToast,
  Image,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  List,
  ListItem,
  Link,
  Heading,
  HStack,
  Tooltip,
  Icon,
  useBreakpointValue,
  Alert,
  AlertIcon,
  useColorMode,
} from '@chakra-ui/react'
import { FaPaperPlane, FaHistory, FaShare, FaBookmark, FaRegBookmark, FaCheck, FaExternalLinkAlt, FaThumbsUp, FaThumbsDown, FaPaperclip, FaMapMarkerAlt, FaLanguage, FaSun, FaMoon } from 'react-icons/fa'
import { HamburgerIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { useLocation } from '../contexts/LocationContext'
import type { Message, SavedResponse, CategoryKey, Conversation } from '../types/chat'
import { ENDPOINTS } from '../config/api'
import ChatSuggestions from '../components/ChatSuggestions'
import { MessageDetails } from '../components/MessageDetails'
import { useLanguage } from '../contexts/LanguageContext'

const ExternalLinkIcon = () => (
  <Box as="span" mx="2px">
    <FaExternalLinkAlt size={16} />
  </Box>
)

const Chat = () => {
  const { language, setLanguage, location, updateLocation } = useLocation();
  const toast = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [savedResponses, setSavedResponses] = useState<SavedResponse[]>([]);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [showMap, setShowMap] = useState(false);
  const [mapUrl, setMapUrl] = useState('');
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    // Solicitar ubicación silenciosamente al iniciar
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateLocation({ latitude, longitude });
          setIsLocationEnabled(true);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocationEnabled(false);
        }
      );
    }
  }, []);

  useEffect(() => {
    // Mostrar mensaje de bienvenida al iniciar
    handleStartChat();
  }, [language]);

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateLocation({ latitude, longitude });
          setIsLocationEnabled(true);
          // Crear URL de Google Maps
          const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setMapUrl(mapsUrl);
          setShowMap(true);
          toast({
            title: language === 'en' ? 'Location enabled' : language === 'fr' ? 'Localisation activée' : 'Ubicación activada',
            status: 'success',
            duration: 3000,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: language === 'en' ? 'Location access denied' : language === 'fr' ? 'Accès à la localisation refusé' : 'Acceso a ubicación denegado',
            description: language === 'en' 
              ? 'Please enable location access for better assistance'
              : language === 'fr'
                ? 'Veuillez activer l\'accès à la localisation pour une meilleure assistance'
                : 'Por favor, habilite el acceso a la ubicación para una mejor asistencia',
            status: 'warning',
            duration: 5000,
          });
        }
      );
    }
  };

  const handleStartChat = () => {
    const welcomeMessage: Message = {
      text: language === 'en' 
        ? "Hello! I'm MAPLE, your assistant for meaningful help in Canada. Before we start, what's your name?"
        : language === 'fr'
          ? "Bonjour ! Je suis MAPLE, votre assistant pour l'aide significative au Canada. Avant de commencer, quel est votre nom ?"
          : "¡Hola! Soy MAPLE, tu asistente para ayuda significativa en Canadá. Antes de empezar, ¿cómo te llamas?",
      sender: 'assistant',
      timestamp: new Date().toISOString(),
      id: Date.now().toString(),
      isUser: false
    }
    setMessages([welcomeMessage]);
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Cargar conversaciones guardadas
    const loadConversations = async () => {
      try {
        const response = await axios.get(`${ENDPOINTS.CHAT}/conversations`)
        setConversations(response.data)
      } catch (error) {
        console.error('Error loading conversations:', error)
      }
    }
    loadConversations()
  }, [])

  const getCategoryResponse = (category: string, question: string, isEnglish: boolean) => {
    const responses: Record<string, Record<string, { en: string; es: string; fr: string }>> = {
      vivienda: {
        "What is the BC Benefits Connector?": {
          en: "It's a portal where you can check all the benefits available in the province, including those related to housing. 🔗 https://gov.bc.ca/BCBenefitsConnector",
          es: "Es un portal donde puedes verificar todos los beneficios disponibles en la provincia, incluyendo los relacionados con vivienda. 🔗 https://gov.bc.ca/BCBenefitsConnector",
          fr: "C'est un portail où vous pouvez vérifier tous les avantages disponibles dans la province, y compris ceux liés au logement. 🔗 https://gov.bc.ca/BCBenefitsConnector"
        },
        "Is there a limit to rent increases in BC?": {
          en: "Yes, there is an annual cap on rent increases, which you can check updated in the Benefits Connector. 🔗 https://gov.bc.ca/BCBenefitsConnector",
          es: "Sí, existe un tope anual al aumento de rentas, el cual puedes revisar actualizado en el Benefits Connector. 🔗 https://gov.bc.ca/BCBenefitsConnector",
          fr: "Oui, il y a une limite annuelle aux augmentations de loyer, que vous pouvez vérifier à jour dans le Benefits Connector. 🔗 https://gov.bc.ca/BCBenefitsConnector"
        },
        "What rights do I have as a tenant in BC?": {
          en: "You can check them in the 'Residential Tenancies' section of the Housing and Tenancy portal. 🔗 https://www2.gov.bc.ca/gov/content/housing-tenancy",
          es: "Puedes consultarlos en la sección 'Residential Tenancies' del portal de Housing and Tenancy del gobierno. 🔗 https://www2.gov.bc.ca/gov/content/housing-tenancy",
          fr: "Vous pouvez les consulter dans la section 'Residential Tenancies' du portail Housing and Tenancy. 🔗 https://www2.gov.bc.ca/gov/content/housing-tenancy"
        }
      }
    };

    return responses[category]?.[question]?.[isEnglish ? 'en' : 'fr'] || 
           responses[category]?.[question]?.['es'] || 
           (isEnglish ? "I don't have information about that specific question." : "No tengo información sobre esa pregunta específica.");
  };

  const handleSuggestionClick = (text: string) => {
    if (selectedCategory) {
      // Si ya hay una categoría seleccionada, enviamos la sugerencia
      const userMessage: Message = {
        id: Date.now().toString(),
        text: text,
        sender: 'user',
        timestamp: new Date().toISOString(),
        isUser: true
      };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      // Buscar la respuesta predeterminada para esta categoría y pregunta
      const response = getCategoryResponse(selectedCategory, text, language === 'en');
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'assistant',
        timestamp: new Date().toISOString(),
        isUser: false
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      setSelectedCategory(null);
    } else {
      // Si no hay categoría seleccionada, la seleccionamos
      setSelectedCategory(text as CategoryKey);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${ENDPOINTS.CHAT}`, {
        message: input,
        language,
        location: location ? { latitude: location.latitude, longitude: location.longitude } : null
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data.message,
        sender: 'assistant',
        timestamp: new Date().toISOString(),
        isUser: false,
        details: response.data.details
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'en' 
          ? "I'm sorry, I couldn't process your message. Please try again."
          : language === 'fr'
            ? "Je suis désolé, je n'ai pas pu traiter votre message. Veuillez réessayer."
            : "Lo siento, no pude procesar tu mensaje. Por favor, inténtalo de nuevo.",
        sender: 'assistant',
        timestamp: new Date().toISOString(),
        isUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRateResponse = async (messageId: string, rating: 'positive' | 'negative') => {
    if (!selectedConversation) return

    try {
      await axios.post(`${ENDPOINTS.CHAT}/rate`, {
        sessionId: selectedConversation,
        messageId,
        rating,
      })

      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, rating } : msg
      ))

      toast({
        title: language === 'en' ? 'Rating saved' : language === 'fr' ? 'Calificación guardada' : 'Calificación guardada',
        status: 'success',
        duration: 2000,
      })
    } catch (error) {
      console.error('Error rating response:', error)
      toast({
        title: language === 'en' ? 'Error' : language === 'fr' ? 'Error' : 'Error',
        description: language === 'en' 
          ? 'Could not save rating'
          : language === 'fr'
            ? 'Impossible de sauvegarder la note'
            : 'No se pudo guardar la calificación',
        status: 'error',
        duration: 2000,
      })
    }
  }

  const handleShareResponse = async (messageId: string) => {
    const message = messages.find(m => m.id === messageId)
    if (!message) return

    try {
      await navigator.share({
        title: language === 'en' ? 'Shared response from MAPLE' : language === 'fr' ? 'Réponse partagée de MAPLE' : 'Respuesta compartida de MAPLE',
        text: message.text,
      })
    } catch (error) {
      console.error('Error sharing response:', error)
      toast({
        title: language === 'en' ? 'Error' : language === 'fr' ? 'Erreur' : 'Error',
        description: language === 'en' 
          ? 'Could not share response'
          : language === 'fr'
            ? 'Impossible de partager la réponse'
            : 'No se pudo compartir la respuesta',
        status: 'error',
        duration: 2000,
      })
    }
  }

  const handleSaveResponse = async (messageId: string) => {
    if (!selectedConversation) return

    try {
      const response = await axios.post(`${ENDPOINTS.CHAT}/favorite`, {
        sessionId: selectedConversation,
        messageId,
      })

      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, isFavorite: response.data.isFavorite } : msg
      ))

      toast({
        title: language === 'en' ? 'Response saved' : language === 'fr' ? 'Réponse sauvegardée' : 'Respuesta guardada',
        status: 'success',
        duration: 2000,
      })
    } catch (error) {
      console.error('Error saving response:', error)
      toast({
        title: language === 'en' ? 'Error' : language === 'fr' ? 'Erreur' : 'Error',
        description: language === 'en' 
          ? 'Could not save response'
          : language === 'fr'
            ? 'Impossible de sauvegarder la réponse'
            : 'No se pudo guardar la respuesta',
        status: 'error',
        duration: 2000,
      })
    }
  }

  const loadConversation = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId)
    if (conversation) {
      setMessages(conversation.messages.map(msg => ({
        ...msg,
        sender: msg.isUser ? 'user' : 'assistant',
        timestamp: new Date().toISOString()
      })))
      setSelectedConversation(conversationId)
      onClose()
    }
  }

  return (
    <Container
      maxW="container.xl"
      h="100vh"
      p={4}
      position="relative"
      bgImage={language === 'en' 
        ? 'url(/Van gov.jpg)'
        : language === 'fr'
          ? 'url(/Mon gov.jpg)'
          : 'url(/Tor gov.jpg)'}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(2px)',
        zIndex: 0
      }}
    >
      <Box
        position="relative"
        zIndex={1}
        h="100%"
        display="flex"
        flexDirection="column"
      >
        <VStack spacing={4} align="stretch" flex={1}>
          <Flex justify="space-between" align="center" mb={4}>
            <Heading as="h1" size={isMobile ? "lg" : "xl"} color="white" textShadow="2px 2px 4px rgba(0,0,0,0.5)">
              {language === 'en' ? 'Government Services Assistant' : language === 'fr' ? 'Assistant aux Services Gouvernementaux' : 'Asistente de Servicios Gubernamentales'}
            </Heading>
            <HStack spacing={2}>
              <Button
                size="sm"
                variant={language === 'en' ? 'solid' : 'outline'}
                onClick={() => setLanguage('en')}
                leftIcon={<FaLanguage />}
                colorScheme="blue"
                bg={language === 'en' ? 'blue.500' : 'transparent'}
                color={language === 'en' ? 'white' : 'white'}
                _hover={{
                  bg: language === 'en' ? 'blue.600' : 'whiteAlpha.200'
                }}
              >
                EN
              </Button>
              <Button
                size="sm"
                variant={language === 'fr' ? 'solid' : 'outline'}
                onClick={() => setLanguage('fr')}
                leftIcon={<FaLanguage />}
                colorScheme="blue"
                bg={language === 'fr' ? 'blue.500' : 'transparent'}
                color={language === 'fr' ? 'white' : 'white'}
                _hover={{
                  bg: language === 'fr' ? 'blue.600' : 'whiteAlpha.200'
                }}
              >
                FR
              </Button>
              <Button
                size="sm"
                variant={language === 'es' ? 'solid' : 'outline'}
                onClick={() => setLanguage('es')}
                leftIcon={<FaLanguage />}
                colorScheme="blue"
                bg={language === 'es' ? 'blue.500' : 'transparent'}
                color={language === 'es' ? 'white' : 'white'}
                _hover={{
                  bg: language === 'es' ? 'blue.600' : 'whiteAlpha.200'
                }}
              >
                ES
              </Button>
              <IconButton
                aria-label="Menu"
                icon={<HamburgerIcon />}
                onClick={onOpen}
                display={{ base: 'flex', md: 'none' }}
                colorScheme="blue"
              />
            </HStack>
          </Flex>

          <ChatSuggestions onSuggestionClick={handleSuggestionClick} />

          {!isLocationEnabled && (
            <Alert status="info" borderRadius="md" variant="subtle">
              <AlertIcon />
              <Text>
                {language === 'en' 
                  ? 'Enable location access for personalized assistance'
                  : language === 'fr'
                    ? 'Activez l\'accès à la localisation pour une assistance personnalisée'
                    : 'Habilita el acceso a la ubicación para una asistencia personalizada'}
              </Text>
            </Alert>
          )}

          {showMap && mapUrl && (
            <Box
              p={4}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              mb={4}
            >
              <Text mb={2} fontWeight="bold">
                {language === 'en' ? 'Your Location' : language === 'fr' ? 'Votre Position' : 'Tu Ubicación'}
              </Text>
              <iframe
                src={mapUrl}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
          )}

          <Box
            flex="1"
            overflowY="auto"
            maxH="calc(100vh - 400px)"
            p={4}
            borderRadius="lg"
            bg={useColorModeValue('whiteAlpha.900', 'gray.800')}
            boxShadow="sm"
            mt={4}
          >
            {messages.map((message) => (
              <MessageDetails
                key={message.id}
                message={message}
                onRate={handleRateResponse}
                onShare={handleShareResponse}
                onSave={handleSaveResponse}
                language={language}
              />
            ))}
            {isLoading && (
              <Flex justify="center" my={4}>
                <Spinner />
              </Flex>
            )}
            <div ref={messagesEndRef} />
          </Box>

          <form onSubmit={handleSendMessage} style={{ marginTop: '1rem' }}>
            <Flex>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={language === 'en' ? "Type your message..." : language === 'fr' ? "Tapez votre message..." : "Escribe tu mensaje..."}
                mr={2}
                bg={useColorModeValue('white', 'gray.700')}
              />
              <Button type="submit" colorScheme="blue">
                <FaPaperPlane />
              </Button>
            </Flex>
          </form>
        </VStack>
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {language === 'en' ? 'Menu' : language === 'fr' ? 'Menu' : 'Menú'}
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text mb={2} fontWeight="bold">
                  {language === 'en' ? 'Language' : language === 'fr' ? 'Langue' : 'Idioma'}
                </Text>
                <VStack spacing={2} align="stretch">
                  <Button
                    variant={language === 'en' ? 'solid' : 'outline'}
                    onClick={() => {
                      setLanguage('en');
                      onClose();
                    }}
                    leftIcon={<FaLanguage />}
                    colorScheme="blue"
                  >
                    English
                  </Button>
                  <Button
                    variant={language === 'fr' ? 'solid' : 'outline'}
                    onClick={() => {
                      setLanguage('fr');
                      onClose();
                    }}
                    leftIcon={<FaLanguage />}
                    colorScheme="blue"
                  >
                    Français
                  </Button>
                  <Button
                    variant={language === 'es' ? 'solid' : 'outline'}
                    onClick={() => {
                      setLanguage('es');
                      onClose();
                    }}
                    leftIcon={<FaLanguage />}
                    colorScheme="blue"
                  >
                    Español
                  </Button>
                </VStack>
              </Box>
              <Box>
                <Text mb={2} fontWeight="bold">
                  {language === 'en' ? 'Theme' : language === 'fr' ? 'Thème' : 'Tema'}
                </Text>
                <Button
                  leftIcon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
                  variant="outline"
                  onClick={() => {
                    toggleColorMode();
                    onClose();
                  }}
                  colorScheme="blue"
                >
                  {language === 'en' 
                    ? colorMode === 'dark' ? 'Light Mode' : 'Dark Mode'
                    : language === 'fr'
                      ? colorMode === 'dark' ? 'Mode Clair' : 'Mode Sombre'
                      : colorMode === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
                </Button>
              </Box>
              <Button
                leftIcon={<FaMapMarkerAlt />}
                variant="outline"
                onClick={() => {
                  handleLocationRequest();
                  onClose();
                }}
                colorScheme="blue"
              >
                {language === 'en' ? 'Location' : language === 'fr' ? 'Localisation' : 'Ubicación'}
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  )
}

export default Chat 