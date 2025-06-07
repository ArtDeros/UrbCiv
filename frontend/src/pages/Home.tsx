import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Button,
  useColorModeValue,
  VStack,
  Icon,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Grid,
} from '@chakra-ui/react'
import { FaHome, FaGraduationCap, FaIdCard, FaBus, FaHandHoldingHeart, FaHeartbeat, FaBriefcase, FaBalanceScale, FaRobot, FaGlobe, FaClock, FaShieldAlt, FaBuilding, FaUser, FaLanguage } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const { language, translations } = useLanguage()
  const t = translations[language]
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedService, setSelectedService] = React.useState<any>(null)
  const { colorMode } = useColorMode()
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')

  const handleServiceClick = (service: any) => {
    setSelectedService(service)
    onOpen()
  }

  const features = [
    {
      icon: '🤖',
      title: t.features.intelligent.title,
      description: t.features.intelligent.description,
    },
    {
      icon: '🌐',
      title: t.features.multilingual.title,
      description: t.features.multilingual.description,
    },
    {
      icon: '⏰',
      title: t.features.availability.title,
      description: t.features.availability.description,
    },
    {
      icon: '🔒',
      title: t.features.security.title,
      description: t.features.security.description,
    },
  ]

  const categories = [
    { id: 'housing' as const, icon: '🏠' },
    { id: 'education' as const, icon: '📚' },
    { id: 'documentation' as const, icon: '📄' },
    { id: 'transportation' as const, icon: '🚌' },
    { id: 'socialBenefits' as const, icon: '💰' },
    { id: 'health' as const, icon: '🏥' },
    { id: 'work' as const, icon: '💼' },
    { id: 'justice' as const, icon: '⚖️' },
  ]

  return (
    <Box minH="100vh" bg={bgColor}>
      {/* Hero Section */}
      <Box
        bgImage={`url(/images/hero-${language}.jpg)`}
        bgSize="cover"
        bgPosition="center"
        py={32}
        position="relative"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.600"
        />
        <Container maxW="container.xl" position="relative">
          <VStack spacing={8} align="center" textAlign="center" color="white">
            <Heading
              size="2xl"
              whiteSpace="pre-line"
            >
              {t.welcome}
            </Heading>
            <Button
              size="lg"
              colorScheme="blue"
              onClick={() => navigate('/chat')}
            >
              Start Chat
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={20}>
        <VStack spacing={12}>
          <Heading textAlign="center">{t.whyChoose}</Heading>
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap={8}
          >
            {features.map((feature, index) => (
              <Box
                key={index}
                p={6}
                bg={cardBg}
                borderRadius="lg"
                boxShadow="md"
                textAlign="center"
              >
                <Text fontSize="4xl" mb={4}>
                  {feature.icon}
                </Text>
                <Heading size="md" mb={2}>
                  {feature.title}
                </Heading>
                <Text color="gray.600">{feature.description}</Text>
              </Box>
            ))}
          </Grid>
        </VStack>
      </Container>

      {/* Services Section */}
      <Box bg={cardBg} py={20}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Heading textAlign="center">{t.services}</Heading>
            <Grid
              templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
              gap={6}
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  h="120px"
                  fontSize="xl"
                  onClick={() => navigate(`/chat?category=${category.id}`)}
                >
                  <VStack>
                    <Text fontSize="3xl">{category.icon}</Text>
                    <Text>{t.categories[category.id]}</Text>
                  </VStack>
                </Button>
              ))}
            </Grid>
          </VStack>
        </Container>
      </Box>

      {/* Service Help Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedService?.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text mb={4}>
              {selectedService?.help[language as 'en' | 'fr' | 'es']}
            </Text>
            <Button
              colorScheme="blue"
              onClick={() => {
                onClose()
                navigate('/chat')
              }}
              width="100%"
            >
              {t.home.startChat}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Home 