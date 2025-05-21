import React, { useState } from 'react'
import {
  Box,
  VStack,
  Heading,
  Text,
  Progress,
  Badge,
  Button,
  useToast,
  Collapse,
  Icon,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaBell, FaCheck, FaClock, FaFileAlt } from 'react-icons/fa'
import { useLocation } from '../contexts/LocationContext'

interface TrackingItem {
  id: string
  title: string
  status: 'pending' | 'in-progress' | 'completed'
  dueDate: string
  documents: string[]
  description: string
}

const TrackingSystem = () => {
  const [showDetails, setShowDetails] = useState<string | null>(null)
  const { language } = useLocation()
  const isEnglish = language === 'en'
  const toast = useToast()
  const bgColor = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  // Datos de ejemplo - En una implementación real, esto vendría de una API
  const [trackingItems] = useState<TrackingItem[]>([
    {
      id: '1',
      title: isEnglish ? 'Immigration Application' : 'Solicitud de Inmigración',
      status: 'in-progress',
      dueDate: '2024-04-15',
      documents: [
        isEnglish ? 'Passport Copy' : 'Copia de Pasaporte',
        isEnglish ? 'Birth Certificate' : 'Certificado de Nacimiento'
      ],
      description: isEnglish 
        ? 'Your immigration application is being processed. Please submit the required documents.'
        : 'Tu solicitud de inmigración está siendo procesada. Por favor, envía los documentos requeridos.'
    },
    {
      id: '2',
      title: isEnglish ? 'Tax Declaration' : 'Declaración de Impuestos',
      status: 'pending',
      dueDate: '2024-04-30',
      documents: [
        isEnglish ? 'Income Statement' : 'Declaración de Ingresos',
        isEnglish ? 'Tax Forms' : 'Formularios de Impuestos'
      ],
      description: isEnglish
        ? 'Your tax declaration is pending. Please complete the forms before the due date.'
        : 'Tu declaración de impuestos está pendiente. Por favor, completa los formularios antes de la fecha límite.'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'green'
      case 'in-progress':
        return 'blue'
      case 'pending':
        return 'yellow'
      default:
        return 'gray'
    }
  }

  const getStatusText = (status: string) => {
    if (isEnglish) {
      switch (status) {
        case 'completed':
          return 'Completed'
        case 'in-progress':
          return 'In Progress'
        case 'pending':
          return 'Pending'
        default:
          return 'Unknown'
      }
    } else {
      switch (status) {
        case 'completed':
          return 'Completado'
        case 'in-progress':
          return 'En Progreso'
        case 'pending':
          return 'Pendiente'
        default:
          return 'Desconocido'
      }
    }
  }

  const handleReminder = (item: TrackingItem) => {
    toast({
      title: isEnglish ? 'Reminder Set' : 'Recordatorio Configurado',
      description: isEnglish
        ? `You will be reminded about ${item.title}`
        : `Serás notificado sobre ${item.title}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <VStack spacing={4} align="stretch" w="full">
      <Heading size="md" mb={4}>
        {isEnglish ? 'Track Your Procedures' : 'Seguimiento de Trámites'}
      </Heading>

      {trackingItems.map((item) => (
        <Box
          key={item.id}
          p={4}
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
          shadow="sm"
        >
          <Flex justify="space-between" align="center" mb={2}>
            <Heading size="sm">{item.title}</Heading>
            <Badge colorScheme={getStatusColor(item.status)}>
              {getStatusText(item.status)}
            </Badge>
          </Flex>

          <Progress
            value={
              item.status === 'completed'
                ? 100
                : item.status === 'in-progress'
                ? 50
                : 0
            }
            colorScheme={getStatusColor(item.status)}
            mb={2}
          />

          <Text fontSize="sm" color="gray.500" mb={2}>
            {isEnglish ? 'Due Date' : 'Fecha Límite'}: {item.dueDate}
          </Text>

          <Button
            size="sm"
            leftIcon={<Icon as={FaBell} />}
            onClick={() => handleReminder(item)}
            mb={2}
          >
            {isEnglish ? 'Set Reminder' : 'Configurar Recordatorio'}
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowDetails(showDetails === item.id ? null : item.id)}
            mb={2}
          >
            {isEnglish ? 'Show Details' : 'Mostrar Detalles'}
          </Button>

          <Collapse in={showDetails === item.id}>
            <Box mt={2} p={2} bg={useColorModeValue('gray.50', 'gray.600')} borderRadius="md">
              <Text mb={2}>{item.description}</Text>
              <Heading size="xs" mb={2}>
                {isEnglish ? 'Required Documents' : 'Documentos Requeridos'}:
              </Heading>
              <VStack align="start" spacing={1}>
                {item.documents.map((doc, index) => (
                  <Flex key={index} align="center">
                    <Icon as={FaFileAlt} mr={2} />
                    <Text fontSize="sm">{doc}</Text>
                  </Flex>
                ))}
              </VStack>
            </Box>
          </Collapse>
        </Box>
      ))}
    </VStack>
  )
}

export default TrackingSystem 