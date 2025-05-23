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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { FaHome, FaGraduationCap, FaIdCard, FaBus, FaHandHoldingHeart, FaHeartbeat, FaBriefcase, FaBalanceScale, FaRobot, FaGlobe, FaClock, FaShieldAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useLocation } from '../contexts/LocationContext.js'
import { useState } from 'react'

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
  { 
    id: 'vivienda', 
    icon: FaHome, 
    title: { en: 'Housing', es: 'Vivienda' },
    help: {
      en: 'Information about housing assistance, subsidies, and housing programs',
      es: 'Información sobre asistencia de vivienda, subsidios y programas habitacionales'
    }
  },
  { 
    id: 'educacion', 
    icon: FaGraduationCap, 
    title: { en: 'Education', es: 'Educación' },
    help: {
      en: 'Educational programs, scholarships, and student support services',
      es: 'Programas educativos, becas y servicios de apoyo estudiantil'
    }
  },
  { 
    id: 'documentacion', 
    icon: FaIdCard, 
    title: { en: 'Documentation', es: 'Documentación' },
    help: {
      en: 'Help with official documents, IDs, and paperwork',
      es: 'Ayuda con documentos oficiales, identificaciones y trámites'
    }
  },
  { 
    id: 'transporte', 
    icon: FaBus, 
    title: { en: 'Transportation', es: 'Transporte' },
    help: {
      en: 'Public transportation information and travel assistance',
      es: 'Información sobre transporte público y asistencia de viaje'
    }
  },
  { 
    id: 'beneficio', 
    icon: FaHandHoldingHeart, 
    title: { en: 'Social Benefits', es: 'Beneficio Social' },
    help: {
      en: 'Social welfare programs and financial assistance',
      es: 'Programas de bienestar social y asistencia financiera'
    }
  },
  { 
    id: 'salud', 
    icon: FaHeartbeat, 
    title: { en: 'Health', es: 'Salud' },
    help: {
      en: 'Healthcare services and medical assistance information',
      es: 'Información sobre servicios de salud y asistencia médica'
    }
  },
  { 
    id: 'trabajo', 
    icon: FaBriefcase, 
    title: { en: 'Work', es: 'Trabajo' },
    help: {
      en: 'Employment opportunities and job search assistance',
      es: 'Oportunidades de empleo y asistencia en la búsqueda de trabajo'
    }
  },
  { 
    id: 'justicia', 
    icon: FaBalanceScale, 
    title: { en: 'Justice', es: 'Justicia' },
    help: {
      en: 'Legal assistance and justice system information',
      es: 'Asistencia legal e información sobre el sistema de justicia'
    }
  },
]

const Home = () => {
  const navigate = useNavigate()
  const { language } = useLocation()
  const isEnglish = language === 'en'
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedService, setSelectedService] = useState<any>(null)

  const handleServiceClick = (service: any) => {
    setSelectedService(service)
    onOpen()
  }

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
            cursor="pointer"
            onClick={() => navigate('/chat')}
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
                onClick={() => handleServiceClick(service)}
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
            {isEnglish ? 'Start Chatting Now' : 'Comienza a Chatear Ahora'}
          </Button>
        </Box>
      </VStack>

      {/* Service Help Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedService?.title[language as 'en' | 'es']}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text mb={4}>
              {selectedService?.help[language as 'en' | 'es']}
            </Text>
            <Button
              colorScheme="blue"
              onClick={() => {
                onClose()
                navigate('/chat')
              }}
              width="100%"
            >
              {isEnglish ? 'Start Chat' : 'Iniciar Chat'}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default Home 