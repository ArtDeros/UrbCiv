import { useState, useRef, useEffect } from 'react'
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
} from '@chakra-ui/react'
import { FaPaperPlane, FaHistory, FaShare, FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { HamburgerIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { useLocation } from '../contexts/LocationContext'
import ChatSuggestions from '../components/ChatSuggestions'

interface Suggestion {
  text: string;
  category?: string;
}

interface Message {
  text: string
  isUser: boolean
  id: string
  analysis?: {
    quality: number
    bias: number
    sentiment: {
      score: number
      emotion: string
      intensity: number
    }
  }
  suggestions?: Suggestion[]
  isFavorite?: boolean
  rating?: 'positive' | 'negative'
}

interface Conversation {
  id: string
  messages: Message[]
  userData: {
    name: string
    email: string
    location: string
  }
  lastInteraction: string
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const toast = useToast()
  const { language, countryCode } = useLocation()
  const isEnglish = language === 'en'
  const { isOpen, onOpen, onClose } = useDisclosure()

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
        const response = await axios.get(`${API_URL}/chat/conversations`)
        setConversations(response.data)
      } catch (error) {
        console.error('Error loading conversations:', error)
      }
    }
    loadConversations()
  }, [])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    const newMessage: Message = {
      text: userMessage,
      isUser: true,
      id: Date.now().toString(),
    }
    setMessages(prev => [...prev, newMessage])
    setIsLoading(true)

    try {
      const response = await axios.post(`${API_URL}/chat`, {
        message: userMessage,
        sessionId: currentConversation || 'new',
        countryCode,
        language,
      })

      if (!response.data) {
        throw new Error('Invalid server response')
      }

      const botResponse: Message = {
        text: response.data.text,
        isUser: false,
        id: Date.now().toString(),
        analysis: response.data.analysis,
        suggestions: response.data.suggestions,
      }

      setMessages(prev => [...prev, botResponse])

      // Actualizar o crear conversación
      if (response.data.sessionId) {
        setCurrentConversation(response.data.sessionId)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      toast({
        title: isEnglish ? 'Error' : 'Error',
        description: isEnglish 
          ? `Could not send message: ${errorMessage}`
          : `No se pudo enviar el mensaje: ${errorMessage}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })

      const errorResponse: Message = {
        text: isEnglish
          ? 'Sorry, there was an error processing your message. Please try again.'
          : 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        isUser: false,
        id: Date.now().toString(),
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInput(suggestion.text)
  }

  const handleRateResponse = async (messageId: string, rating: 'positive' | 'negative') => {
    if (!currentConversation) return

    try {
      await axios.post(`${API_URL}/chat/rate`, {
        sessionId: currentConversation,
        messageId,
        rating,
      })

      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, rating } : msg
      ))

      toast({
        title: isEnglish ? 'Rating saved' : 'Calificación guardada',
        status: 'success',
        duration: 2000,
      })
    } catch (error) {
      console.error('Error rating response:', error)
      toast({
        title: isEnglish ? 'Error' : 'Error',
        description: isEnglish 
          ? 'Could not save rating'
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
        title: isEnglish ? 'Shared response from UrbCiv' : 'Respuesta compartida de UrbCiv',
        text: message.text,
      })
    } catch (error) {
      console.error('Error sharing response:', error)
      toast({
        title: isEnglish ? 'Error' : 'Error',
        description: isEnglish 
          ? 'Could not share response'
          : 'No se pudo compartir la respuesta',
        status: 'error',
        duration: 2000,
      })
    }
  }

  const handleSaveResponse = async (messageId: string) => {
    if (!currentConversation) return

    try {
      const response = await axios.post(`${API_URL}/chat/favorite`, {
        sessionId: currentConversation,
        messageId,
      })

      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, isFavorite: response.data.isFavorite } : msg
      ))

      toast({
        title: isEnglish ? 'Response saved' : 'Respuesta guardada',
        status: 'success',
        duration: 2000,
      })
    } catch (error) {
      console.error('Error saving response:', error)
      toast({
        title: isEnglish ? 'Error' : 'Error',
        description: isEnglish 
          ? 'Could not save response'
          : 'No se pudo guardar la respuesta',
        status: 'error',
        duration: 2000,
      })
    }
  }

  const loadConversation = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId)
    if (conversation) {
      setMessages(conversation.messages)
      setCurrentConversation(conversationId)
      onClose()
    }
  }

  return (
    <Container maxW="container.md" h="100vh" centerContent py={8}>
      <Box
        w="100%"
        h="100%"
        maxW="600px"
        display="flex"
        flexDirection="column"
        bg={useColorModeValue('white', 'gray.800')}
        borderRadius="xl"
        boxShadow="xl"
        overflow="hidden"
      >
        {/* Header */}
        <Flex
          p={4}
          borderBottom="1px"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          justify="space-between"
          align="center"
        >
          <Text fontSize="xl" fontWeight="bold">
            UrbCiv Chat
          </Text>
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            variant="ghost"
          />
        </Flex>

        {/* Chat Messages */}
        <Box flex="1" overflowY="auto" p={4}>
          <VStack spacing={4} align="stretch">
            {messages.map((message) => (
              <Flex
                key={message.id}
                justify={message.isUser ? 'flex-end' : 'flex-start'}
                align="start"
                gap={2}
              >
                {!message.isUser && (
                  <Image
                    src="/Mi2So.webp"
                    alt="Mi2So Assistant"
                    boxSize="40px"
                    borderRadius="full"
                    objectFit="cover"
                  />
                )}
                <Box
                  maxW="70%"
                  bg={message.isUser ? 'blue.500' : 'gray.100'}
                  color={message.isUser ? 'white' : 'black'}
                  p={3}
                  borderRadius="lg"
                  boxShadow="sm"
                >
                  <Text>{message.text}</Text>
                  {!message.isUser && message.analysis && (
                    <ChatSuggestions
                      suggestions={message.suggestions || []}
                      onSuggestionClick={handleSuggestionClick}
                      onRateResponse={(rating) => handleRateResponse(message.id, rating)}
                      onShareResponse={() => handleShareResponse(message.id)}
                      onSaveResponse={() => handleSaveResponse(message.id)}
                      isSaved={message.isFavorite || false}
                      responseQuality={message.analysis.quality}
                      biasScore={message.analysis.bias}
                    />
                  )}
                </Box>
              </Flex>
            ))}
            {isLoading && (
              <Flex justify="flex-start" align="start" gap={2}>
                <Image
                  src="/Mi2So.webp"
                  alt="Mi2So Assistant"
                  boxSize="40px"
                  borderRadius="full"
                  objectFit="cover"
                />
                <Box
                  maxW="70%"
                  bg="gray.100"
                  p={3}
                  borderRadius="lg"
                  boxShadow="sm"
                >
                  <Spinner size="sm" mr={2} />
                  <Text as="span">{isEnglish ? 'Thinking...' : 'Pensando...'}</Text>
                </Box>
              </Flex>
            )}
            <div ref={messagesEndRef} />
          </VStack>
        </Box>

        {/* Input Area */}
        <Box p={4} borderTop="1px" borderColor={useColorModeValue('gray.200', 'gray.700')}>
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <Flex gap={2}>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isEnglish ? 'Type your message...' : 'Escribe tu mensaje...'}
                size="lg"
                borderRadius="full"
                bg={useColorModeValue('gray.50', 'gray.700')}
                _focus={{
                  borderColor: 'blue.500',
                  boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
                }}
              />
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                borderRadius="full"
                px={6}
                isLoading={isLoading}
              >
                <FaPaperPlane />
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>

      {/* Drawer para historial de conversaciones */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {isEnglish ? 'Conversation History' : 'Historial de Conversaciones'}
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {conversations.map((conversation) => (
                <Box
                  key={conversation.id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => loadConversation(conversation.id)}
                  _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                >
                  <Text fontWeight="bold">{conversation.userData.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {new Date(conversation.lastInteraction).toLocaleString()}
                  </Text>
                  <Text noOfLines={2} mt={2}>
                    {conversation.messages[conversation.messages.length - 1]?.text}
                  </Text>
                </Box>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  )
}

export default Chat 