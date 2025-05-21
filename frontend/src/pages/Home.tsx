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
  Flex,
} from '@chakra-ui/react'
import { FaHome, FaGraduationCap, FaIdCard, FaBus, FaHandHoldingHeart, FaHeartbeat, FaBriefcase, FaBalanceScale, FaRobot, FaGlobe, FaClock, FaShieldAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useLocation } from '../contexts/LocationContext'

const features = [
  {
    icon: FaRobot,
    title: { en: 'Intelligent Assistant', es: 'Asistente Inteligente' },
    description: {
      en: 'Powered by advanced AI to provide accurate and helpful responses',
      es: 'Impulsado por IA avanzada para brindar respuestas precisas y útiles'
    }
  },
  {
    icon: FaGlobe,
    title: { en: 'Multilingual Support', es: 'Soporte Multilingüe' },
    description: {
      en: 'Communicate in English and Spanish seamlessly',
      es: 'Comunicación fluida en inglés y español'
    }
  },
  {
    icon: FaClock,
    title: { en: '24/7 Availability', es: 'Disponibilidad 24/7' },
    description: {
      en: 'Get assistance anytime, anywhere',
      es: 'Obtén asistencia en cualquier momento y lugar'
    }
  },
  {
    icon: FaShieldAlt,
    title: { en: 'Secure & Private', es: 'Seguro y Privado' },
    description: {
      en: 'Your information is protected with enterprise-grade security',
      es: 'Tu información está protegida con seguridad de nivel empresarial'
    }
  }
]

const services = [
  { id: 'vivienda', icon: FaHome, title: { en: 'Housing', es: 'Vivienda' } },
  { id: 'educacion', icon: FaGraduationCap, title: { en: 'Education', es: 'Educación' } },
  { id: 'documentacion', icon: FaIdCard, title: { en: 'Documentation', es: 'Documentación' } },
  { id: 'transporte', icon: FaBus, title: { en: 'Transportation', es: 'Transporte' } },
  { id: 'beneficio', icon: FaHandHoldingHeart, title: { en: 'Social Benefits', es: 'Beneficio Social' } },
  { id: 'salud', icon: FaHeartbeat, title: { en: 'Health', es: 'Salud' } },
  { id: 'trabajo', icon: FaBriefcase, title: { en: 'Work', es: 'Trabajo' } },
  { id: 'justicia', icon: FaBalanceScale, title: { en: 'Justice', es: 'Justicia' } },
]

const Home = () => {
  const navigate = useNavigate()
  const { language } = useLocation()
  const isEnglish = language === 'en'

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={12} align="stretch">
        {/* Hero Section */}
        <Box textAlign="center" py={8}>
          <Box
            position="relative"
            width="250px"
            height="250px"
            mx="auto"
            mb={6}
          >
            <Image
              src="/Mi2So.webp"
              alt="Mi2So Assistant"
              width="100%"
              height="100%"
              borderRadius="50%"
              objectFit="cover"
              boxShadow="0 0 20px rgba(0, 0, 0, 0.3)"
              border="8px solid"
              borderColor="blue.400"
              _hover={{
                transform: 'scale(1.05) rotate(5deg)',
                transition: 'all 0.3s ease-in-out',
                boxShadow: '0 0 30px rgba(66, 153, 225, 0.5)'
              }}
            />
          </Box>
          <Heading size="2xl" mb={4} bgGradient="linear(to-r, blue.400, blue.600)" bgClip="text">
            {isEnglish ? 'Welcome to UrbCiv' : 'Bienvenido a UrbCiv'}
          </Heading>
          <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')} maxW="2xl" mx="auto">
            {isEnglish 
              ? 'Your intelligent government services assistant'
              : 'Tu asistente inteligente de servicios gubernamentales'}
          </Text>
        </Box>

        {/* Features Section */}
        <Box>
          <Heading size="lg" mb={8} textAlign="center">
            {isEnglish ? 'Why Choose UrbCiv?' : '¿Por qué elegir UrbCiv?'}
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {features.map((feature, index) => (
              <Box
                key={index}
                p={6}
                bg={useColorModeValue('white', 'gray.800')}
                borderRadius="lg"
                boxShadow="md"
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                transition="all 0.2s"
              >
                <Flex align="center" mb={4}>
                  <Icon as={feature.icon} boxSize={6} color="blue.500" mr={3} />
                  <Heading size="md">{feature.title[language as 'en' | 'es']}</Heading>
                </Flex>
                <Text color={useColorModeValue('gray.600', 'gray.400')}>
                  {feature.description[language as 'en' | 'es']}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Services Section */}
        <Box>
          <Heading size="lg" mb={8} textAlign="center">
            {isEnglish ? 'Available Services' : 'Servicios Disponibles'}
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {services.map((service) => (
              <Button
                key={service.id}
                height="auto"
                p={6}
                onClick={() => navigate('/chat')}
                variant="outline"
                colorScheme="blue"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                <VStack spacing={3}>
                  <Icon as={service.icon} boxSize={8} />
                  <Text>{service.title[language as 'en' | 'es']}</Text>
                </VStack>
              </Button>
            ))}
          </SimpleGrid>
        </Box>

        {/* CTA Section */}
        <Box textAlign="center" py={8}>
          <Button
            size="lg"
            colorScheme="blue"
            onClick={() => navigate('/chat')}
            leftIcon={<FaRobot />}
            px={8}
            py={6}
            fontSize="xl"
            _hover={{
              transform: 'scale(1.05)',
              boxShadow: 'xl',
            }}
            transition="all 0.2s"
          >
            {isEnglish ? 'You write, we answer, all true, best support.' : 'Tú escribes, nosotros respondemos, todo cierto, el mejor apoyo.'}
          </Button>
        </Box>
      </VStack>
    </Container>
  )
}

export default Home 