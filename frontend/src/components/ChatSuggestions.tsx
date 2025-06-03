import React from 'react';
import {
  Box,
  Button,
  HStack,
  VStack,
  Text,
  useColorModeValue,
  IconButton,
  Tooltip,
  Flex,
  Badge,
} from '@chakra-ui/react';
import { FaThumbsUp, FaThumbsDown, FaShare, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useLocation } from '../contexts/LocationContext.js';
import { Suggestion } from '../types/chat';

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: Suggestion) => void;
  category?: string | null;
}

export const suggestions = {
  vivienda: [
    {
      en: "What is BC Housing and what services does it offer?",
      es: "¿Qué es BC Housing y qué servicios ofrece?",
      category: "vivienda"
    },
    {
      en: "Where can I find rental assistance programs in BC?",
      es: "¿Dónde encuentro los programas de asistencia para el alquiler en BC?",
      category: "vivienda"
    },
    {
      en: "What is the subsidized housing program?",
      es: "¿Qué es el programa de vivienda subsidiada?",
      category: "vivienda"
    },
    {
      en: "Where can I see recent housing news in BC?",
      es: "¿Dónde puedo ver noticias recientes sobre vivienda en BC?",
      category: "vivienda"
    },
    {
      en: "What is BC Builds Homes?",
      es: "¿Qué es BC Builds Homes?",
      category: "vivienda"
    },
    {
      en: "What is the B.C. Benefits Connector?",
      es: "¿Qué es el B.C. Benefits Connector?",
      category: "vivienda"
    },
    {
      en: "Is there a limit to rent increases in BC?",
      es: "¿Hay algún límite a los aumentos de renta en BC?",
      category: "vivienda"
    },
    {
      en: "What rights do I have as a tenant in BC?",
      es: "¿Qué derechos tengo como inquilino en BC?",
      category: "vivienda"
    },
    {
      en: "Are there housing options for seniors in BC?",
      es: "¿Hay opciones de vivienda para adultos mayores en BC?",
      category: "vivienda"
    },
    {
      en: "Is there help for indigenous communities regarding housing?",
      es: "¿Existe ayuda para comunidades indígenas en temas de vivienda?",
      category: "vivienda"
    },
    {
      en: "What tax benefits exist for tenants in BC?",
      es: "¿Qué beneficios fiscales existen para inquilinos en BC?",
      category: "vivienda"
    },
    {
      en: "What programs exist for first-time homebuyers in BC?",
      es: "¿Qué programas existen para compradores de vivienda por primera vez en BC?",
      category: "vivienda"
    },
    {
      en: "Where can I look for housing development opportunities in BC?",
      es: "¿Dónde puedo buscar oportunidades de desarrollo de vivienda en BC?",
      category: "vivienda"
    },
    {
      en: "Where can I find the Housing Registry?",
      es: "¿Dónde puedo encontrar el Registro de Viviendas?",
      category: "vivienda"
    },
    {
      en: "Are there funds available for housing development partners?",
      es: "¿Hay fondos disponibles para socios que desarrollan vivienda?",
      category: "vivienda"
    },
    {
      en: "Where can I research housing policies and data?",
      es: "¿Dónde puedo investigar sobre políticas y datos de vivienda?",
      category: "vivienda"
    },
    {
      en: "Where can I find information about secondary suites and accessory housing?",
      es: "¿Dónde encuentro información sobre suites secundarias y vivienda accesoria?",
      category: "vivienda"
    },
    {
      en: "What should I do if I have questions about my eligibility for programs?",
      es: "¿Qué hago si tengo dudas sobre mi elegibilidad a los programas?",
      category: "vivienda"
    },
    {
      en: "Where can I get free help applying to these programs?",
      es: "¿Dónde puedo recibir ayuda gratuita para aplicar a estos programas?",
      category: "vivienda"
    },
    {
      en: "What should I do if my situation changes after applying for a benefit?",
      es: "¿Qué hago si mi situación cambia después de aplicar a un beneficio?",
      category: "vivienda"
    }
  ],
  educacion: [
    {
      en: "Where can I find general information about education and training in B.C.?",
      es: "¿Dónde puedo encontrar información general sobre educación y capacitación en B.C.?",
      category: "educacion"
    },
    {
      en: "What resources does the Ministry of Education and Child Care of B.C. offer?",
      es: "¿Qué recursos ofrece el Ministerio de Educación y Cuidado Infantil de B.C.?",
      category: "educacion"
    },
    {
      en: "How can I apply for financial aid for post-secondary studies in B.C.?",
      es: "¿Cómo puedo solicitar ayuda financiera para estudios postsecundarios en B.C.?",
      category: "educacion"
    },
    {
      en: "What services does WorkBC offer related to education and employment?",
      es: "¿Qué servicios ofrece WorkBC relacionados con la educación y el empleo?",
      category: "educacion"
    },
    {
      en: "Where can I find information about B.C.'s education system for international students?",
      es: "¿Dónde puedo encontrar información sobre el sistema educativo de B.C. para estudiantes internacionales?",
      category: "educacion"
    },
    {
      en: "What student aid programs does the Government of Canada offer?",
      es: "¿Qué programas de ayuda estudiantil ofrece el Gobierno de Canadá?",
      category: "educacion"
    },
    {
      en: "How can I apply for federal student loans and grants?",
      es: "¿Cómo puedo aplicar a préstamos y subvenciones estudiantiles federales?",
      category: "educacion"
    },
    {
      en: "What is the Lifelong Learning Plan (LLP)?",
      es: "¿Qué es el Plan de Aprendizaje Permanente (LLP)?",
      category: "educacion"
    },
    {
      en: "What support exists for apprentices in Canada?",
      es: "¿Qué apoyo existe para aprendices en Canadá?",
      category: "educacion"
    },
    {
      en: "Where can I find information about Canada's Education Savings Program?",
      es: "¿Dónde puedo encontrar información sobre el Programa de Ahorro para la Educación de Canadá?",
      category: "educacion"
    },
    {
      en: "What is Canada's Student Financial Assistance Program?",
      es: "¿Qué es el Programa de Asistencia Financiera para Estudiantes de Canadá?",
      category: "educacion"
    },
    {
      en: "How can I access training and skills development programs in B.C.?",
      es: "¿Cómo puedo acceder a programas de capacitación y desarrollo de habilidades en B.C.?",
      category: "educacion"
    },
    {
      en: "What is the Student Learning Support Program (SSLP)?",
      es: "¿Qué es el Programa de Apoyo al Aprendizaje de los Estudiantes (SSLP)?",
      category: "educacion"
    },
    {
      en: "Where can I find tools to plan my post-secondary education?",
      es: "¿Dónde puedo encontrar herramientas para planificar mi educación postsecundaria?",
      category: "educacion"
    },
    {
      en: "What tax benefits are available for students in Canada?",
      es: "¿Qué beneficios fiscales están disponibles para estudiantes en Canadá?",
      category: "educacion"
    },
    {
      en: "How can I receive my student funding in B.C.?",
      es: "¿Cómo puedo recibir mi financiamiento estudiantil en B.C.?",
      category: "educacion"
    },
    {
      en: "What should I do if I can't pay my student loan?",
      es: "¿Qué debo hacer si no puedo pagar mi préstamo estudiantil?",
      category: "educacion"
    },
    {
      en: "Where can I find accessible education programs in B.C.?",
      es: "¿Dónde puedo encontrar programas de educación accesible en B.C.?",
      category: "educacion"
    },
    {
      en: "How can I get my teaching certificate in B.C.?",
      es: "¿Cómo puedo obtener mi certificado de enseñanza en B.C.?",
      category: "educacion"
    },
    {
      en: "Where can I find approved teacher education programs in B.C.?",
      es: "¿Dónde puedo encontrar programas de formación docente aprobados en B.C.?",
      category: "educacion"
    }
  ],
  documentacion: [
    {
      en: "How do I get a new ID card?",
      es: "¿Cómo obtengo una nueva tarjeta de identidad?",
      category: "documentacion"
    },
    {
      en: "What documents do I need for citizenship?",
      es: "¿Qué documentos necesito para la ciudadanía?",
      category: "documentacion"
    },
    {
      en: "How do I renew my passport?",
      es: "¿Cómo renuevo mi pasaporte?",
      category: "documentacion"
    }
  ],
  transporte: [
    {
      en: "What organization regulates transportation at the federal level in Canada?",
      es: "¿Qué organismo regula el transporte a nivel federal en Canadá?",
      category: "transporte"
    },
    {
      en: "Where can I find travel notices, passport information, or travel documents for Canada?",
      es: "¿Dónde puedo encontrar avisos de viaje, información de pasaportes o documentos para viajar en Canadá?",
      category: "transporte"
    },
    {
      en: "What is the Canada Public Transit Fund?",
      es: "¿Qué es el Canada Public Transit Fund?",
      category: "transporte"
    },
    {
      en: "What authority manages roads and transportation permits in BC?",
      es: "¿Qué autoridad gestiona las carreteras y permisos de transporte en BC?",
      category: "transporte"
    },
    {
      en: "Where can I check the current status of roads in BC?",
      es: "¿Dónde puedo ver el estado actual de las carreteras en BC?",
      category: "transporte"
    },
    {
      en: "What service handles public transportation outside Metro Vancouver?",
      es: "¿Qué servicio se encarga del transporte público fuera de Metro Vancouver?",
      category: "transporte"
    },
    {
      en: "What entity manages public transportation in Metro Vancouver?",
      es: "¿Qué entidad gestiona el transporte público en Metro Vancouver?",
      category: "transporte"
    },
    {
      en: "Where can I get my driver's license or insure my vehicle in BC?",
      es: "¿Dónde puedo tramitar mi licencia de conducir o asegurar mi vehículo en BC?",
      category: "transporte"
    },
    {
      en: "Where can I find information about road safety and driving regulations?",
      es: "¿Dónde encuentro información sobre seguridad vial y normas de conducción?",
      category: "transporte"
    },
    {
      en: "What federal programs exist to fund public transportation projects?",
      es: "¿Qué programas federales existen para financiar proyectos de transporte público?",
      category: "transporte"
    },
    {
      en: "Is there funding for active transportation projects like cycling or walking?",
      es: "¿Existe financiación para proyectos de transporte activo como ciclismo o caminatas?",
      category: "transporte"
    },
    {
      en: "What organization can I consult for local or provincial transportation projects?",
      es: "¿Qué organismo puedo consultar para proyectos locales o provinciales de transporte?",
      category: "transporte"
    },
    {
      en: "What is the difference between provincial and federal transportation responsibilities?",
      es: "¿Cuál es la diferencia entre las responsabilidades provinciales y federales en transporte?",
      category: "transporte"
    },
    {
      en: "How do I know which agency to contact based on my location?",
      es: "¿Cómo sé qué agencia contactar según mi ubicación?",
      category: "transporte"
    },
    {
      en: "Where can I check transportation fares and passes in BC?",
      es: "¿Dónde consulto tarifas y pases de transporte en BC?",
      category: "transporte"
    },
    {
      en: "What types of discounts are available for public transportation?",
      es: "¿Qué tipos de descuentos están disponibles para transporte público?",
      category: "transporte"
    },
    {
      en: "Where can I see updates about new projects and transportation news?",
      es: "¿Dónde puedo ver actualizaciones sobre nuevos proyectos y noticias de transporte?",
      category: "transporte"
    },
    {
      en: "How can I stay informed about public transportation service alerts?",
      es: "¿Cómo puedo mantenerme informado sobre alertas de servicio en transporte público?",
      category: "transporte"
    },
    {
      en: "Can I report a problem on BC roads?",
      es: "¿Puedo reportar un problema en las carreteras de BC?",
      category: "transporte"
    },
    {
      en: "Where can I find help or send feedback about transportation?",
      es: "¿Dónde encontrar ayuda o enviar feedback sobre transporte?",
      category: "transporte"
    }
  ],
  beneficio: [
    {
      en: "What social benefits am I eligible for?",
      es: "¿A qué beneficios sociales soy elegible?",
      category: "beneficio"
    },
    {
      en: "How do I apply for food assistance?",
      es: "¿Cómo solicito asistencia alimentaria?",
      category: "beneficio"
    },
    {
      en: "What emergency assistance is available?",
      es: "¿Qué asistencia de emergencia está disponible?",
      category: "beneficio"
    }
  ],
  salud: [
    {
      en: "Where can I find general information about health in British Columbia?",
      es: "¿Dónde puedo encontrar información general sobre salud en British Columbia?",
      category: "salud"
    },
    {
      en: "What is the Medical Services Plan (MSP)?",
      es: "¿Qué es el Medical Services Plan (MSP)?",
      category: "salud"
    },
    {
      en: "Where can I get coverage for medications in B.C.?",
      es: "¿Dónde puedo obtener cobertura para medicamentos en B.C.?",
      category: "salud"
    },
    {
      en: "How do I find a family doctor or primary care provider?",
      es: "¿Cómo encuentro un médico de cabecera o proveedor de atención primaria?",
      category: "salud"
    },
    {
      en: "What services does HealthLink BC offer?",
      es: "¿Qué servicios ofrece HealthLink BC?",
      category: "salud"
    },
    {
      en: "What number should I call for health advice in B.C.?",
      es: "¿Qué número debo llamar para recibir consejos de salud en B.C.?",
      category: "salud"
    },
    {
      en: "What is my Regional Health Authority in B.C.?",
      es: "¿Cuál es mi Autoridad de Salud Regional en B.C.?",
      category: "salud"
    },
    {
      en: "What services does Fraser Health offer?",
      es: "¿Qué tipo de servicios ofrece Fraser Health?",
      category: "salud"
    },
    {
      en: "Where can I get public health alerts in B.C.?",
      es: "¿Dónde obtengo alertas de salud pública en B.C.?",
      category: "salud"
    },
    {
      en: "What services does Interior Health offer?",
      es: "¿Qué servicios ofrece Interior Health?",
      category: "salud"
    },
    {
      en: "Where can I find information about health programs for indigenous communities?",
      es: "¿Dónde encontrar información sobre programas de salud para comunidades indígenas?",
      category: "salud"
    },
    {
      en: "What services are excluded from MSP?",
      es: "¿Qué servicios están excluidos de MSP?",
      category: "salud"
    },
    {
      en: "Where can I see information about diseases and vaccines in B.C.?",
      es: "¿Dónde veo información sobre enfermedades y vacunas en B.C.?",
      category: "salud"
    },
    {
      en: "Where can I get information about federal health in Canada?",
      es: "¿Dónde obtengo información sobre salud a nivel federal en Canadá?",
      category: "salud"
    },
    {
      en: "What is the Public Health Agency of Canada?",
      es: "¿Qué es la Public Health Agency of Canada?",
      category: "salud"
    },
    {
      en: "What does the Canada Dental Benefit cover?",
      es: "¿Qué cubre el Canada Dental Benefit?",
      category: "salud"
    },
    {
      en: "What benefits exist for people with disabilities?",
      es: "¿Qué beneficios existen para personas con discapacidad?",
      category: "salud"
    },
    {
      en: "Where can I find information about product safety or public health alerts?",
      es: "¿Dónde encuentro información sobre seguridad de productos o alertas de salud pública?",
      category: "salud"
    },
    {
      en: "How do I know what benefits I'm entitled to in Canada?",
      es: "¿Cómo saber a qué beneficios tengo derecho en Canadá?",
      category: "salud"
    },
    {
      en: "What services are available for indigenous peoples (First Nations and Inuit)?",
      es: "¿Qué servicios hay para pueblos indígenas (First Nations e Inuit)?",
      category: "salud"
    }
  ],
  trabajo: [
    {
      en: "How do I find job opportunities?",
      es: "¿Cómo encuentro oportunidades de trabajo?",
      category: "trabajo"
    },
    {
      en: "What job training programs are available?",
      es: "¿Qué programas de capacitación laboral están disponibles?",
      category: "trabajo"
    },
    {
      en: "How do I file for unemployment?",
      es: "¿Cómo solicito el desempleo?",
      category: "trabajo"
    }
  ],
  justicia: [
    {
      en: "How do I find legal assistance?",
      es: "¿Cómo encuentro asistencia legal?",
      category: "justicia"
    },
    {
      en: "What are my rights as a citizen?",
      es: "¿Cuáles son mis derechos como ciudadano?",
      category: "justicia"
    },
    {
      en: "How do I file a complaint?",
      es: "¿Cómo presento una queja?",
      category: "justicia"
    }
  ]
}

const ChatSuggestions = ({ onSuggestionClick, category }: ChatSuggestionsProps) => {
  const { language } = useLocation();
  const isEnglish = language === 'en';
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

  const handleCategoryClick = (category: string) => {
    const welcomeMessage = {
      en: `Before we start, what's your name?`,
      es: `Antes de empezar, dime cómo te llamas`,
      category: category,
      type: 'category' as const
    };
    onSuggestionClick(welcomeMessage);
    setCurrentQuestionIndex(0); // Resetear el índice al seleccionar una nueva categoría
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    onSuggestionClick(suggestion);
    // Avanzar al siguiente índice, volviendo al inicio si llegamos al final
    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      const totalQuestions = suggestions[category as keyof typeof suggestions]?.length || 0;
      return nextIndex >= totalQuestions ? 0 : nextIndex;
    });
  };

  return (
    <Box
      p={4}
      bg={bgColor}
      borderRadius="md"
      borderWidth="1px"
      borderColor={borderColor}
      mb={4}
    >
      <Text fontSize="lg" fontWeight="bold" mb={3} color={useColorModeValue('black', 'white')}>
        {isEnglish ? 'Select a Category' : 'Selecciona una Categoría'}
      </Text>
      <VStack spacing={2} align="stretch">
        {Object.keys(suggestions).map((cat) => (
          <Button
            key={cat}
            variant="outline"
            size="sm"
            onClick={() => handleCategoryClick(cat)}
            justifyContent="flex-start"
            textAlign="left"
            whiteSpace="normal"
            height="auto"
            py={2}
            colorScheme={cat === category ? "blue" : "gray"}
            _hover={{
              bg: useColorModeValue('gray.100', 'gray.700')
            }}
          >
            {isEnglish 
              ? cat === 'vivienda' ? 'Housing' :
                cat === 'educacion' ? 'Education' :
                cat === 'documentacion' ? 'Documentation' :
                cat === 'transporte' ? 'Transportation' :
                cat === 'beneficio' ? 'Benefits' :
                cat === 'salud' ? 'Health' :
                cat === 'trabajo' ? 'Work' :
                cat === 'justicia' ? 'Justice' : cat
              : cat === 'vivienda' ? 'Vivienda' :
                cat === 'educacion' ? 'Educación' :
                cat === 'documentacion' ? 'Documentación' :
                cat === 'transporte' ? 'Transporte' :
                cat === 'beneficio' ? 'Beneficios' :
                cat === 'salud' ? 'Salud' :
                cat === 'trabajo' ? 'Trabajo' :
                cat === 'justicia' ? 'Justicia' : cat}
          </Button>
        ))}
      </VStack>

      {category && suggestions[category as keyof typeof suggestions] && (
        <Box mt={4}>
          <Text fontSize="lg" fontWeight="bold" mb={3} color={useColorModeValue('black', 'white')}>
            {isEnglish ? 'Suggested Question' : 'Pregunta Sugerida'}
          </Text>
          <VStack spacing={2} align="stretch">
            {suggestions[category as keyof typeof suggestions][currentQuestionIndex] && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(suggestions[category as keyof typeof suggestions][currentQuestionIndex])}
                justifyContent="flex-start"
                textAlign="left"
                whiteSpace="normal"
                height="auto"
                py={2}
                colorScheme="blue"
                _hover={{
                  bg: useColorModeValue('gray.100', 'gray.700')
                }}
              >
                {isEnglish 
                  ? suggestions[category as keyof typeof suggestions][currentQuestionIndex].en 
                  : suggestions[category as keyof typeof suggestions][currentQuestionIndex].es}
              </Button>
            )}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default ChatSuggestions; 