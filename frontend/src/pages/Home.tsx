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
} from '@chakra-ui/react'
import { FaHome, FaGraduationCap, FaIdCard, FaBus, FaHandHoldingHeart, FaHeartbeat, FaBriefcase, FaBalanceScale, FaRobot, FaGlobe, FaClock, FaShieldAlt, FaBuilding, FaUser } from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../config/language_config'
import { useState } from 'react'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const t = translations[language as keyof typeof translations]
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedService, setSelectedService] = useState<any>(null)

  const handleServiceClick = (service: any) => {
    setSelectedService(service)
    onOpen()
  }

  const features = [
    {
      icon: FaGlobe,
      title: t.home.features.multilingual,
      description: 'Access services in multiple languages'
    },
    {
      icon: FaBuilding,
      title: t.home.features.governmentServices,
      description: 'Find information about government services'
    },
    {
      icon: FaClock,
      title: t.home.features.realTimeUpdates,
      description: 'Get real-time updates on services'
    },
    {
      icon: FaUser,
      title: t.home.features.personalizedAssistance,
      description: 'Receive personalized assistance'
    }
  ]

  const services = [
    { 
      id: 'housing', 
      icon: FaHome, 
      title: t.home.services.housing,
      help: {
        en: 'Information about housing assistance, subsidies, and housing programs',
        fr: 'Informations sur l\'aide au logement, les subventions et les programmes de logement',
        es: 'Información sobre asistencia de vivienda, subsidios y programas habitacionales'
      }
    },
    { 
      id: 'education', 
      icon: FaGraduationCap, 
      title: t.home.services.education,
      help: {
        en: 'Educational programs, scholarships, and student support services',
        fr: 'Programmes éducatifs, bourses et services de soutien aux étudiants',
        es: 'Programas educativos, becas y servicios de apoyo estudiantil'
      }
    },
    { 
      id: 'documentation', 
      icon: FaIdCard, 
      title: t.home.services.documentation,
      help: {
        en: 'Help with official documents, IDs, and paperwork',
        fr: 'Aide avec les documents officiels, les pièces d\'identité et les formalités',
        es: 'Ayuda con documentos oficiales, identificaciones y trámites'
      }
    },
    { 
      id: 'transportation', 
      icon: FaBus, 
      title: t.home.services.transportation,
      help: {
        en: 'Public transportation information and travel assistance',
        fr: 'Informations sur les transports publics et assistance aux voyages',
        es: 'Información sobre transporte público y asistencia de viaje'
      }
    },
    { 
      id: 'socialBenefits', 
      icon: FaHandHoldingHeart, 
      title: t.home.services.socialBenefits,
      help: {
        en: 'Social welfare programs and financial assistance',
        fr: 'Programmes d\'aide sociale et assistance financière',
        es: 'Programas de bienestar social y asistencia financiera'
      }
    },
    { 
      id: 'health', 
      icon: FaHeartbeat, 
      title: t.home.services.health,
      help: {
        en: 'Healthcare services and medical assistance information',
        fr: 'Services de santé et informations sur l\'assistance médicale',
        es: 'Información sobre servicios de salud y asistencia médica'
      }
    },
    { 
      id: 'work', 
      icon: FaBriefcase, 
      title: t.home.services.work,
      help: {
        en: 'Employment opportunities and job search assistance',
        fr: 'Opportunités d\'emploi et assistance à la recherche d\'emploi',
        es: 'Oportunidades de empleo y asistencia en la búsqueda de trabajo'
      }
    },
    { 
      id: 'justice', 
      icon: FaBalanceScale, 
      title: t.home.services.justice,
      help: {
        en: 'Legal assistance and justice system information',
        fr: 'Assistance juridique et informations sur le système judiciaire',
        es: 'Asistencia legal e información sobre el sistema de justicia'
      }
    }
  ]

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="center">
        <Heading
          as="h1"
          size="2xl"
          textAlign="center"
          bgGradient="linear(to-r, blue.400, blue.600)"
          bgClip="text"
        >
          {t.home.title}
        </Heading>
        <Text fontSize="xl" textAlign="center" color="gray.600">
          {t.home.subtitle}
        </Text>
        <Button
          size="lg"
          colorScheme="blue"
          onClick={() => navigate('/chat')}
          px={8}
        >
          {t.home.startChat}
        </Button>

        <Box w="full" py={10}>
          <Heading as="h2" size="xl" mb={8} textAlign="center">
            {t.home.features.title}
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {features.map((feature, index) => (
              <Box
                key={index}
                p={6}
                bg={useColorModeValue('white', 'gray.800')}
                rounded="lg"
                shadow="md"
                _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
                transition="all 0.3s"
              >
                <Icon
                  as={feature.icon}
                  w={10}
                  h={10}
                  color="blue.500"
                  mb={4}
                />
                <Heading as="h3" size="md" mb={2}>
                  {feature.title}
                </Heading>
                <Text color="gray.600">{feature.description}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        <Box>
          <Heading size="lg" mb={8} textAlign="center">
            {t.home.services.title}
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
                  <Text>{service.title}</Text>
                </VStack>
              </Button>
            ))}
          </SimpleGrid>
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
      </VStack>
    </Container>
  )
}

export default Home 