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
import ChatSuggestions, { suggestions } from '../components/ChatSuggestions'
import { Suggestion, Message as ImportedMessage, Conversation } from '../types/chat'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

interface Message {
  text: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  category?: string | null;
  suggestions?: Suggestion[];
  id?: string;
  isUser?: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<string | null>(null)
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    hasProvidedInfo: false
  })
  const [isInputEnabled, setIsInputEnabled] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const toast = useToast()
  const { language, countryCode } = useLocation()
  const isEnglish = language === 'en'
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showNextQuestions, setShowNextQuestions] = useState(false)

  const handleStartChat = () => {
    const welcomeMessage: Message = {
      text: isEnglish 
        ? "Hello! I'm UrbCiv, your virtual assistant in government matters. Before we start, what's your name?"
        : "¡Hola! Soy UrbCiv, tu asistente virtual en temas gubernamentales. Antes de empezar, ¿cómo te llamas?",
      sender: 'assistant',
      timestamp: new Date().toISOString(),
      id: Date.now().toString(),
      isUser: false
    }
    setMessages([welcomeMessage])
    setIsInputEnabled(true)
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
        const response = await axios.get(`${API_URL}/chat/conversations`)
        setConversations(response.data)
      } catch (error) {
        console.error('Error loading conversations:', error)
      }
    }
    loadConversations()
  }, [])

  const getCategoryResponse = (category: string, question: string, isEnglish: boolean) => {
    const responses: { [key: string]: { [key: string]: { en: string, es: string } } } = {
      vivienda: {
        "What is BC Housing and what services does it offer?": {
          en: "BC Housing is the main provincial government agency responsible for providing housing-related assistance. It offers rental subsidy programs, supported housing, and resources for tenants and property owners. 🔗 https://www.bchousing.org/",
          es: "BC Housing es la agencia principal del gobierno provincial encargada de proveer asistencia relacionada con vivienda. Ofrece programas de subsidio de alquiler, viviendas con apoyo, y recursos para inquilinos y propietarios. 🔗 https://www.bchousing.org/"
        },
        "Where can I find rental assistance programs in BC?": {
          en: "In the 'Rental Assistance Programs' section of BC Housing, you can find assistance such as RAP (Rental Assistance Program) for low-income families. 🔗 https://www.bchousing.org/housing-assistance/rental-assistance-programs/RAP",
          es: "En la sección 'Rental Assistance Programs' de BC Housing puedes encontrar ayudas como el RAP (Rental Assistance Program) para familias de bajos ingresos. 🔗 https://www.bchousing.org/housing-assistance/rental-assistance-programs/RAP"
        },
        "What is the subsidized housing program?": {
          en: "It's a program that reduces rental costs for low-income individuals. It's based on 30% of gross monthly income. 🔗 https://www.bchousing.org/housing-assistance/rental-housing/subsidized-housing",
          es: "Es un programa que reduce el costo del alquiler para personas de bajos ingresos. Se basa en el 30% del ingreso mensual bruto. 🔗 https://www.bchousing.org/housing-assistance/rental-housing/subsidized-housing"
        },
        "Where can I see recent housing news in BC?": {
          en: "In the 'What's New' section of the BC Housing website. 🔗 https://www.bchousing.org/",
          es: "En la sección 'What's New' del sitio de BC Housing. 🔗 https://www.bchousing.org/"
        },
        "What is BC Builds Homes?": {
          en: "It's an initiative to quickly build affordable rental housing for middle-income individuals. 🔗 https://www.bcbuildshomes.ca/",
          es: "Es una iniciativa para construir rápidamente viviendas de alquiler asequibles para personas con ingresos medios. 🔗 https://www.bcbuildshomes.ca/"
        },
        "What is the B.C. Benefits Connector?": {
          en: "It's a portal where you can check all available benefits in the province, including those related to housing. 🔗 https://gov.bc.ca/BCBenefitsConnector",
          es: "Es un portal donde puedes revisar todos los beneficios disponibles en la provincia, incluidos los relacionados con vivienda. 🔗 https://gov.bc.ca/BCBenefitsConnector"
        },
        "Is there a limit to rent increases in BC?": {
          en: "Yes, there is an annual cap on rent increases, which you can check updated in the Benefits Connector. 🔗 https://gov.bc.ca/BCBenefitsConnector",
          es: "Sí, existe un tope anual al aumento de rentas, el cual puedes revisar actualizado en el Benefits Connector. 🔗 https://gov.bc.ca/BCBenefitsConnector"
        },
        "What rights do I have as a tenant in BC?": {
          en: "You can check them in the 'Residential Tenancies' section of the Housing and Tenancy portal. 🔗 https://www2.gov.bc.ca/gov/content/housing-tenancy",
          es: "Puedes consultarlos en la sección 'Residential Tenancies' del portal de Housing and Tenancy del gobierno. 🔗 https://www2.gov.bc.ca/gov/content/housing-tenancy"
        },
        "Are there housing options for seniors in BC?": {
          en: "Yes, BC Housing offers specific housing programs for seniors. 🔗 https://www2.gov.bc.ca/gov/content/housing-tenancy",
          es: "Sí, BC Housing ofrece programas específicos de vivienda para personas mayores. 🔗 https://www2.gov.bc.ca/gov/content/housing-tenancy"
        },
        "Is there help for indigenous communities regarding housing?": {
          en: "Yes, there are programs focused on indigenous housing available through the BC government website. 🔗 https://www2.gov.bc.ca/gov/content/housing-tenancy",
          es: "Sí, existen programas enfocados en vivienda indígena disponibles a través del sitio del gobierno de BC. 🔗 https://www2.gov.bc.ca/gov/content/housing-tenancy"
        },
        "What tax benefits exist for tenants in BC?": {
          en: "The tenant tax credit is one of the benefits you can find in the Benefits Connector. 🔗 https://gov.bc.ca/BCBenefitsConnector",
          es: "El crédito fiscal para inquilinos es uno de los beneficios que puedes encontrar en el Benefits Connector. 🔗 https://gov.bc.ca/BCBenefitsConnector"
        },
        "What programs exist for first-time homebuyers in BC?": {
          en: "There are provincial benefits such as tax reductions and down payment assistance. 🔗 https://gov.bc.ca/BCBenefitsConnector",
          es: "Hay beneficios provinciales como reducción de impuestos y ayudas al pago inicial. 🔗 https://gov.bc.ca/BCBenefitsConnector"
        },
        "Where can I look for housing development opportunities in BC?": {
          en: "In BC Builds Homes, both landowners and developers can access opportunities. 🔗 https://www.bcbuildshomes.ca/",
          es: "En BC Builds Homes, tanto propietarios de tierras como desarrolladores pueden acceder a oportunidades. 🔗 https://www.bcbuildshomes.ca/"
        },
        "Where can I find the Housing Registry?": {
          en: "Through the BC Housing portal in the 'Housing Registry for Housing Providers' section. 🔗 https://www.bchousing.org/",
          es: "A través del portal de BC Housing en la sección 'Housing Registry for Housing Providers'. 🔗 https://www.bchousing.org/"
        },
        "Are there funds available for housing development partners?": {
          en: "Yes, BC Housing offers funding opportunities to non-profit and private partners. 🔗 https://www.bchousing.org/",
          es: "Sí, BC Housing ofrece oportunidades de financiación a socios sin fines de lucro y privados. 🔗 https://www.bchousing.org/"
        },
        "Where can I research housing policies and data?": {
          en: "In the BC Housing Research Centre. 🔗 https://www.bchousing.org/",
          es: "En el BC Housing Research Centre. 🔗 https://www.bchousing.org/"
        },
        "Where can I find information about secondary suites and accessory housing?": {
          en: "On the Housing and Tenancy website, 'Secondary suites' section. 🔗 https://www2.gov.bc.ca/gov/content/housing-tenancy",
          es: "En el sitio de Housing and Tenancy, sección 'Secondary suites'. 🔗 https://www2.gov.bc.ca/gov/content/housing-tenancy"
        },
        "What should I do if I have questions about my eligibility for programs?": {
          en: "You can contact BC Housing directly or use their contact forms. 🔗 https://www.bchousing.org/",
          es: "Puedes contactar directamente a BC Housing o usar sus formularios de contacto. 🔗 https://www.bchousing.org/"
        },
        "Where can I get free help applying to these programs?": {
          en: "You can look for community organizations and non-profits that offer support. Try searching for 'housing support services' in your city.",
          es: "Puedes buscar organizaciones comunitarias y sin fines de lucro que ofrezcan apoyo. Prueba buscando 'housing support services' en tu ciudad."
        },
        "What should I do if my situation changes after applying for a benefit?": {
          en: "It's essential to update your information directly in the BC Housing system to avoid delays or problems with benefits.",
          es: "Es fundamental actualizar tu información directamente en el sistema de BC Housing para evitar demoras o problemas en los beneficios."
        }
      },
      educacion: {
        "Where can I find general information about education and training in B.C.?": {
          en: "You can visit the main education and training portal of British Columbia at: https://www2.gov.bc.ca/gov/content/education-training. This site covers everything from early childhood to post-secondary and adult education.",
          es: "Puedes visitar el portal principal de educación y capacitación de la provincia de British Columbia en: https://www2.gov.bc.ca/gov/content/education-training. Este sitio abarca desde la educación infantil hasta la postsecundaria y para adultos."
        },
        "What resources does the Ministry of Education and Child Care of B.C. offer?": {
          en: "The Ministry provides information about K-12 curriculum, child care programs, certificates and transcripts, as well as scholarships and awards for high school students. You can access these resources at: https://www.gov.bc.ca/bced/.",
          es: "El Ministerio proporciona información sobre el currículo K-12, programas de cuidado infantil, certificados y transcripciones, así como becas y premios para estudiantes de secundaria. Puedes acceder a estos recursos en: https://www.gov.bc.ca/bced/."
        },
        "How can I apply for financial aid for post-secondary studies in B.C.?": {
          en: "StudentAid BC offers student loans, grants, and scholarships. You can start your application at: https://studentaidbc.ca/apply. Make sure you have a BC Services Card account to access the portal.",
          es: "StudentAid BC ofrece préstamos estudiantiles, subvenciones y becas. Puedes iniciar tu solicitud en: https://studentaidbc.ca/apply. Asegúrate de tener una cuenta de BC Services Card para acceder al portal."
        },
        "What services does WorkBC offer related to education and employment?": {
          en: "WorkBC provides resources about training, post-secondary education, cooperative education, and support for skills and trades. You can explore these services at: https://www.workbc.ca/.",
          es: "WorkBC proporciona recursos sobre capacitación, educación postsecundaria, educación cooperativa y apoyo para habilidades y oficios. Puedes explorar estos servicios en: https://www.workbc.ca/."
        },
        "Where can I find information about B.C.'s education system for international students?": {
          en: "The Canadian Information Centre for International Credentials (CICIC) provides an overview of B.C.'s education system, useful for international students and credential recognition. Visit: https://www.cicic.ca/1132/british_columbia.canada.",
          es: "El Canadian Information Centre for International Credentials (CICIC) ofrece una visión general del sistema educativo de B.C., útil para estudiantes internacionales y para el reconocimiento de credenciales. Visita: https://www.cicic.ca/1132/british_columbia.canada."
        },
        "What student aid programs does the Government of Canada offer?": {
          en: "The centralized portal for federal student aid includes loans, grants, scholarships, the Lifelong Learning Plan, and support for apprentices. Access at: https://www.canada.ca/en/services/benefits/education.html.",
          es: "El portal centralizado para la ayuda estudiantil federal incluye préstamos, subvenciones, becas, el Plan de Aprendizaje Permanente y apoyo para aprendices. Accede a: https://www.canada.ca/en/services/benefits/education/student-aid.html."
        },
        "How can I apply for federal student loans and grants?": {
          en: "You can apply for student loans and grants through your province or territory. For B.C., use StudentAid BC: https://studentaidbc.ca/apply. For other provinces, check: https://www.canada.ca/en/services/benefits/education/student-aid/grants-loans/province-apply.html.",
          es: "Puedes solicitar préstamos y subvenciones estudiantiles a través de tu provincia o territorio. Para B.C., utiliza StudentAid BC: https://studentaidbc.ca/apply. Para otras provincias, consulta: https://www.canada.ca/en/services/benefits/education/student-aid/grants-loans/province-apply.html."
        },
        "What is the Lifelong Learning Plan (LLP)?": {
          en: "The LLP allows you to withdraw funds from your Registered Retirement Savings Plan (RRSP) to finance education or training. More information at: https://www.canada.ca/en/services/benefits/education/education-savings.html.",
          es: "El LLP permite retirar fondos de tu Plan Registrado de Ahorro para la Jubilación (RRSP) para financiar educación o capacitación. Más información en: https://www.canada.ca/en/services/benefits/education/education-savings.html."
        },
        "What support exists for apprentices in Canada?": {
          en: "The Government of Canada offers financial support and programs for apprentices in skilled trades. Check: https://www.canada.ca/en/services/benefits/education/apprentices.html.",
          es: "El Gobierno de Canadá ofrece apoyo financiero y programas para aprendices en oficios especializados. Consulta: https://www.canada.ca/en/services/benefits/education/apprentices.html."
        },
        "Where can I find information about Canada's Education Savings Program?": {
          en: "Canada's Education Savings Program includes the Registered Education Savings Plan (RESP) and other aids. Visit: https://www.canada.ca/en/services/benefits/education/education-savings.html.",
          es: "El Programa de Ahorro para la Educación de Canadá incluye el Plan de Ahorro Educativo Registrado (RESP) y otras ayudas. Visita: https://www.canada.ca/en/services/benefits/education/education-savings.html."
        },
        "What is Canada's Student Financial Assistance Program?": {
          en: "This program offers loans and grants to full-time and part-time students to help pay for their post-secondary education. More details at: https://www.canada.ca/en/services/benefits/education/student-aid.html.",
          es: "Este programa ofrece préstamos y subvenciones a estudiantes de tiempo completo y parcial para ayudar a pagar su educación postsecundaria. Más detalles en: https://www.canada.ca/en/services/benefits/education/student-aid.html."
        },
        "How can I access training and skills development programs in B.C.?": {
          en: "WorkBC offers training programs, including trades training and cooperative education. Explore options at: https://www.workbc.ca/explore-training-and-education.",
          es: "WorkBC ofrece programas de capacitación, incluyendo formación en oficios y educación cooperativa. Explora las opciones en: https://www.workbc.ca/explore-training-and-education."
        },
        "What is the Student Learning Support Program (SSLP)?": {
          en: "The SSLP funds organizations to provide tutoring, mentoring, wellness services, and scholarships to students. More information at: https://www.canada.ca/en/employment-social-development/programs/supports-student-learning.html.",
          es: "El SSLP financia organizaciones para proporcionar tutorías, mentorías, servicios de bienestar y becas a estudiantes. Más información en: https://www.canada.ca/en/employment-social-development/programs/supports-student-learning.html."
        },
        "Where can I find tools to plan my post-secondary education?": {
          en: "The Government of Canada offers interactive tools to help you save, plan, and pay for your post-secondary education. Access at: https://www.canada.ca/en/employment-social-development/services/post-secondary/tools.html.",
          es: "El Gobierno de Canadá ofrece herramientas interactivas para ayudarte a ahorrar, planificar y pagar tu educación postsecundaria. Accede a: https://www.canada.ca/en/employment-social-development/services/post-secondary/tools.html."
        },
        "What tax benefits are available for students in Canada?": {
          en: "Students may be eligible for tax deductions and credits for tuition, books, public transit, and student loan interest. More details at: https://www.canada.ca/en/financial-consumer-agency/services/pay-down-student-debt.html.",
          es: "Los estudiantes pueden ser elegibles para deducciones y créditos fiscales por matrícula, libros, transporte público e intereses de préstamos estudiantiles. Más detalles en: https://www.canada.ca/en/financial-consumer-agency/services/pay-down-student-debt.html."
        },
        "How can I receive my student funding in B.C.?": {
          en: "After applying and being approved, you can receive your funding by following the instructions at: https://studentaidbc.ca/apply/receive.",
          es: "Después de aplicar y ser aprobado, puedes recibir tu financiamiento siguiendo las instrucciones en: https://studentaidbc.ca/apply/receive."
        },
        "What should I do if I can't pay my student loan?": {
          en: "You can apply for the Repayment Assistance Plan (RAP), which can reduce or pause your payments. More information at: https://www.canada.ca/en/services/benefits/education/student-aid/grants-loans/repay/assistance/rap.html.",
          es: "Puedes solicitar el Plan de Asistencia para el Reembolso (RAP), que puede reducir o pausar tus pagos. Más información en: https://www.canada.ca/en/services/benefits/education/student-aid/grants-loans/repay/assistance/rap.html."
        },
        "Where can I find accessible education programs in B.C.?": {
          en: "B.C. offers accessible education programs for students with disabilities or learning difficulties. Check: https://www2.gov.bc.ca/gov/content/education-training/adult-education/accessible-education-and-training.",
          es: "B.C. ofrece programas de educación accesible para estudiantes con discapacidades o dificultades de aprendizaje. Consulta: https://www2.gov.bc.ca/gov/content/education-training/adult-education/accessible-education-and-training."
        },
        "How can I get my teaching certificate in B.C.?": {
          en: "To become a certified teacher in B.C., review the requirements and process at: https://www2.gov.bc.ca/gov/content/education-training/k-12/teach.",
          es: "Para convertirte en maestro certificado en B.C., revisa los requisitos y el proceso en: https://www2.gov.bc.ca/gov/content/education-training/k-12/teach."
        },
        "Where can I find approved teacher education programs in B.C.?": {
          en: "Approved teacher education programs in B.C. are listed at: https://www2.gov.bc.ca/gov/content/education-training/k-12/teach/become-a-teacher/teacher-education-programs.",
          es: "Los programas de formación docente aprobados en B.C. están listados en: https://www2.gov.bc.ca/gov/content/education-training/k-12/teach/become-a-teacher/teacher-education-programs."
        }
      },
      transporte: {
        "What organization regulates transportation at the federal level in Canada?": {
          en: "Transport Canada is the entity responsible for transportation policies, regulations, and programs at the national level. It oversees road, rail, air, and maritime transportation. 🔗 Official Transport Canada website",
          es: "Transport Canada es la entidad encargada de las políticas, regulaciones y programas de transporte a nivel nacional. Supervisa el transporte por carretera, ferrocarril, aéreo y marítimo. 🔗 Sitio oficial de Transport Canada"
        },
        "Where can I find travel notices, passport information, or travel documents for Canada?": {
          en: "You can check the Travel.gc.ca portal, which offers travel advice, entry and exit requirements, and travel documents such as passports. 🔗 Go to Travel.gc.ca",
          es: "Puedes consultar el portal Travel.gc.ca, que ofrece consejos de viaje, requisitos de entrada y salida, y documentos de viaje como pasaportes. 🔗 Ir a Travel.gc.ca"
        },
        "What is the Canada Public Transit Fund?": {
          en: "It's a federal investment aimed at improving public transportation and related infrastructure in communities across Canada. 🔗 View program details",
          es: "Es una inversión federal destinada a mejorar el transporte público y la infraestructura relacionada en comunidades de todo Canadá. 🔗 Ver detalles del programa"
        },
        "What authority manages roads and transportation permits in BC?": {
          en: "The Ministry of Transportation and Infrastructure of BC administers roads, infrastructure projects, and transportation permits. 🔗 Ministry website",
          es: "El Ministry of Transportation and Infrastructure de BC administra carreteras, proyectos de infraestructura y permisos de transporte. 🔗 Sitio del Ministerio"
        },
        "Where can I check the current status of roads in BC?": {
          en: "Visit DriveBC to see road conditions, webcams, planned closures, and report issues. 🔗 Road Status - DriveBC",
          es: "Visita DriveBC para ver condiciones de las carreteras, cámaras web, cierres planificados y reportar problemas. 🔗 Estado de carreteras - DriveBC"
        },
        "What service handles public transportation outside Metro Vancouver?": {
          en: "BC Transit operates public transportation in most communities in the province (except Metro Vancouver). 🔗 Search routes and fares",
          es: "BC Transit opera el transporte público en la mayoría de las comunidades de la provincia (excepto Metro Vancouver). 🔗 Buscar rutas y tarifas"
        },
        "What entity manages public transportation in Metro Vancouver?": {
          en: "TransLink offers bus, SkyTrain, SeaBus, and other services, including route planning and fares (Compass Card). 🔗 TransLink - Trip Planner",
          es: "TransLink ofrece servicios de autobús, SkyTrain, SeaBus, y otros, incluyendo planificación de rutas y tarifas (Compass Card). 🔗 TransLink - Planificador de Viajes"
        },
        "Where can I get my driver's license or insure my vehicle in BC?": {
          en: "ICBC (Insurance Corporation of BC) manages everything related to licenses, vehicle insurance, road safety, and claims. 🔗 Go to ICBC",
          es: "ICBC (Insurance Corporation of BC) gestiona todo lo relacionado con licencias, seguros de vehículos, seguridad vial y reclamos. 🔗 Ir a ICBC"
        },
        "Where can I find information about road safety and driving regulations?": {
          en: "Visit the 'Road safety' section on the ICBC portal and also check federal regulations at Transport Canada.",
          es: "Visita la sección 'Road safety' en el portal de ICBC y consulta también las regulaciones federales en Transport Canada."
        },
        "What federal programs exist to fund public transportation projects?": {
          en: "Infrastructure Canada offers programs such as the Public Transit Funding Stream, which includes green initiatives and rural infrastructure. 🔗 View programs",
          es: "Infrastructure Canada ofrece programas como el Public Transit Funding Stream, que incluye iniciativas verdes y de infraestructura rural. 🔗 Ver programas"
        },
        "Is there funding for active transportation projects like cycling or walking?": {
          en: "Yes, the Active Transportation Fund supports active transportation projects nationwide. 🔗 Learn about the fund",
          es: "Sí, el Active Transportation Fund apoya proyectos de transporte activo a nivel nacional. 🔗 Conocer el fondo"
        },
        "What organization can I consult for local or provincial transportation projects?": {
          en: "The Ministry of Transportation and Infrastructure of BC is responsible for regional projects, roads, and provincial permits. 🔗 BC Infrastructure Projects",
          es: "El Ministerio de Transporte e Infraestructura de BC es responsable de proyectos regionales, caminos y permisos provinciales. 🔗 Proyectos de infraestructura BC"
        },
        "What is the difference between provincial and federal transportation responsibilities?": {
          en: "Federal: Regulates air, maritime, rail transportation, and national standards.\nProvincial (BC): Handles roads, public transit (BC Transit), road safety, and ICBC.\nMunicipal: Manages local streets, parking, and some transit operations like TransLink in Metro Vancouver.",
          es: "Federal: Regula el transporte aéreo, marítimo, ferroviario y normas nacionales.\nProvincial (BC): Maneja carreteras, tránsito público (BC Transit), seguridad vial e ICBC.\nMunicipal: Administra calles locales, estacionamientos y algunas operaciones de tránsito como TransLink en Metro Vancouver."
        },
        "How do I know which agency to contact based on my location?": {
          en: "In Metro Vancouver: Use TransLink\nOutside Metro Vancouver: BC Transit\nFor roads or projects: BC Ministry of Transportation\nFor federal regulations: Transport Canada",
          es: "En Metro Vancouver: Usa TransLink\nFuera de Metro Vancouver: BC Transit\nPara carreteras o proyectos: Ministerio de Transporte de BC\nPara regulaciones federales: Transport Canada"
        },
        "Where can I check transportation fares and passes in BC?": {
          en: "Check the BC Transit or TransLink portal for options like Compass Card, discounts, and the Umo mobility app. 🔗 Umo Mobility App",
          es: "Revisa el portal de BC Transit o TransLink para opciones como Compass Card, descuentos y la app de movilidad Umo. 🔗 Umo Mobility App"
        },
        "What types of discounts are available for public transportation?": {
          en: "There are reduced fares for students, seniors, and people with disabilities. Check details at BC Transit and TransLink.",
          es: "Hay tarifas reducidas para estudiantes, adultos mayores y personas con discapacidad. Consulta detalles en BC Transit y TransLink."
        },
        "Where can I see updates about new projects and transportation news?": {
          en: "Follow TranBC for news, notices, route conditions, and infrastructure updates. 🔗 TranBC - News",
          es: "Sigue TranBC para noticias, avisos, condiciones de rutas y novedades sobre infraestructura. 🔗 TranBC - Noticias"
        },
        "How can I stay informed about public transportation service alerts?": {
          en: "Check the official TransLink and BC Transit websites for alerts, disruptions, and detours.",
          es: "Consulta los sitios oficiales de TransLink y BC Transit para alertas, interrupciones y desvíos."
        },
        "Can I report a problem on BC roads?": {
          en: "Yes. Use the DriveBC portal to report incidents on provincial highways. 🔗 Report a problem",
          es: "Sí. Usa el portal DriveBC para reportar incidentes en autopistas provinciales. 🔗 Reportar un problema"
        },
        "Where can I find help or send feedback about transportation?": {
          en: "You can contact the agencies directly through their websites:\nTransport Canada - Contact\nBC Transit - Contact\nTransLink - Support",
          es: "Puedes contactar directamente a las agencias en sus sitios web:\nTransport Canada – Contacto\nBC Transit – Contacto\nTransLink – Soporte"
        }
      },
      salud: {
        "Where can I find general information about health in British Columbia?": {
          en: "You can visit the Ministry of Health of British Columbia portal. Here you'll find information about the health system, covered services, primary care registries, and more.",
          es: "Puedes visitar el portal del Ministry of Health de British Columbia. Aquí encontrarás información sobre el sistema de salud, servicios cubiertos, registros de atención primaria y más."
        },
        "What is the Medical Services Plan (MSP)?": {
          en: "MSP is B.C.'s provincial medical coverage plan. It covers medically necessary services provided by physicians. More information and how to register here: Medical Services Plan - BC.",
          es: "El MSP es el plan provincial de cobertura médica de B.C. Cubre servicios médicamente necesarios prestados por médicos. Más información y cómo registrarte aquí: Medical Services Plan - BC."
        },
        "Where can I get coverage for medications in B.C.?": {
          en: "The PharmaCare program helps cover prescription medications and approved medical supplies. There are various plans depending on your needs. Learn more at: BC PharmaCare.",
          es: "El programa PharmaCare ayuda a cubrir medicamentos recetados y suministros médicos aprobados. Existen varios planes según tus necesidades. Aprende más en: BC PharmaCare."
        },
        "How do I find a family doctor or primary care provider?": {
          en: "Register with the Health Connect Registry to be assigned a primary care provider in your area.",
          es: "Regístrate en el Health Connect Registry para que te asignen un proveedor de atención primaria en tu área."
        },
        "What services does HealthLink BC offer?": {
          en: "HealthLink BC offers 24/7 guidance by phone (811), website, and mobile app with nurses, dietitians, and pharmacists. Explore the portal here: HealthLink BC.",
          es: "HealthLink BC ofrece orientación 24/7 por teléfono (811), sitio web y app móvil con enfermeras, dietistas y farmacéuticos. Explora el portal aquí: HealthLink BC."
        },
        "What number should I call for health advice in B.C.?": {
          en: "Call 811 (available 24/7). You'll receive care from registered nurses, dietitians, or pharmacists free of charge. Details: Call 811 – HealthLink BC.",
          es: "Llama al 811 (disponible 24/7). Recibirás atención de enfermeras registradas, dietistas o farmacéuticos de forma gratuita. Detalles: Call 811 – HealthLink BC."
        },
        "What is my Regional Health Authority in B.C.?": {
          en: "It depends on your location. Here are the direct links:\nFraser Health\nInterior Health\nIsland Health\nNorthern Health\nVancouver Coastal Health\nPHSA",
          es: "Depende de tu ubicación. Aquí tienes los enlaces directos:\nFraser Health\nInterior Health\nIsland Health\nNorthern Health\nVancouver Coastal Health\nPHSA"
        },
        "What services does Fraser Health offer?": {
          en: "Fraser Health offers emergency wait times, mental health, lab bookings, and services for indigenous communities. Check here: Fraser Health Services.",
          es: "Fraser Health ofrece tiempos de espera en urgencias, salud mental, reservas para laboratorio y servicios para comunidades indígenas. Consulta aquí: Fraser Health Services."
        },
        "Where can I get public health alerts in B.C.?": {
          en: "Visit the BC Centre for Disease Control (BCCDC). There you'll find updates on diseases, statistics, vaccination, and health alerts.",
          es: "Visita el BC Centre for Disease Control (BCCDC). Allí encontrarás actualizaciones sobre enfermedades, estadísticas, vacunación y alertas sanitarias."
        },
        "What services does Interior Health offer?": {
          en: "Includes hospital services, community services, mental health, and public health. Check their resources here: Interior Health.",
          es: "Incluye servicios hospitalarios, comunitarios, salud mental y pública. Consulta sus recursos aquí: Interior Health."
        },
        "Where can I find information about health programs for indigenous communities?": {
          en: "Check PHSA - Indigenous Health and your regional authority for specialized resources and support.",
          es: "Consulta PHSA - Indigenous Health y tu autoridad regional para recursos y apoyo especializado."
        },
        "What services are excluded from MSP?": {
          en: "MSP doesn't cover general dentistry, eyeglasses, over-the-counter medications, or physiotherapy. Consider complementary private insurance. Info: MSP – What's covered.",
          es: "MSP no cubre odontología general, anteojos, medicamentos sin receta ni fisioterapia. Considera seguros privados complementarios. Info: MSP – Qué cubre."
        },
        "Where can I see information about diseases and vaccines in B.C.?": {
          en: "On the BC Centre for Disease Control website, you'll find detailed information about diseases, vaccination, and outbreaks.",
          es: "En el sitio del BC Centre for Disease Control encontrarás información detallada sobre enfermedades, vacunación y brotes."
        },
        "Where can I get information about federal health in Canada?": {
          en: "Check the Health Canada portal for topics such as nutrition, vaccines, indigenous health, medications, and more.",
          es: "Consulta el portal de Health Canada para temas como nutrición, vacunas, salud indígena, medicamentos y más."
        },
        "What is the Public Health Agency of Canada?": {
          en: "PHAC protects Canadians from health threats. It offers health alerts, disease prevention, and resources. Details at: PHAC.",
          es: "La PHAC protege a los canadienses frente a amenazas sanitarias. Ofrece alertas de salud, prevención de enfermedades y recursos. Detalles en: PHAC."
        },
        "What does the Canada Dental Benefit cover?": {
          en: "It's a federal benefit that covers dental care for those without private insurance. More information: Canada Dental Benefit.",
          es: "Es un beneficio federal que cubre atención dental para quienes no tienen seguro privado. Más información: Canada Dental Benefit."
        },
        "What benefits exist for people with disabilities?": {
          en: "The federal government offers programs and funding for people with disabilities. More at: Disability Benefits - Canada.",
          es: "El gobierno federal ofrece programas y financiación para personas con discapacidades. Más en: Disability Benefits - Canada."
        },
        "Where can I find information about product safety or public health alerts?": {
          en: "Check the alerts section of Health Canada and PHAC.",
          es: "Consulta la sección de alertas de Health Canada y PHAC."
        },
        "How do I know what benefits I'm entitled to in Canada?": {
          en: "Use the Government of Canada's Benefits Finder tool to find out what benefits you can receive based on your situation.",
          es: "Usa la herramienta Benefits Finder del Gobierno de Canadá para saber qué beneficios puedes recibir según tu situación."
        },
        "What services are available for indigenous peoples (First Nations and Inuit)?": {
          en: "The Non-Insured Health Benefits (NIHB) program covers medications, medical transportation, dental services, and more. Check the official information here: NIHB – Health Canada.",
          es: "El programa Non-Insured Health Benefits (NIHB) cubre medicamentos, transporte médico, servicios dentales y más. Revisa la información oficial aquí: NIHB – Health Canada."
        }
      }
    };

    const categoryResponses = responses[category] || {};
    const response = categoryResponses[question] || {
      en: "I'm sorry, I don't have specific information about that question yet. Please contact the relevant department for assistance.",
      es: "Lo siento, aún no tengo información específica sobre esa pregunta. Por favor, contacta al departamento correspondiente para obtener ayuda."
    };

    return isEnglish ? response.en : response.es;
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    // Si es una categoría, mostrar las preguntas sugeridas
    if (suggestion.type === 'category') {
      setCurrentCategory(suggestion.category || null)
      setInput('')
      setIsInputEnabled(true)
      setCurrentQuestionIndex(0) // Resetear el índice de preguntas
      
      // Obtener la primera pregunta de la categoría
      const categoryQuestions = suggestions[suggestion.category as keyof typeof suggestions];
      if (categoryQuestions && categoryQuestions.length > 0) {
        const firstQuestion = {
          ...categoryQuestions[0],
          type: 'question' as const
        };
        
        // Primero mostrar el mensaje de bienvenida
        const categoryWelcome: Message = {
          text: isEnglish 
            ? `You've selected the ${suggestion.category} category. Here's a question you might want to ask:`
            : `Has seleccionado la categoría de ${suggestion.category}. Aquí hay una pregunta que podrías hacer:`,
          sender: 'assistant',
          timestamp: new Date().toISOString(),
          id: Date.now().toString(),
          isUser: false
        }
        setMessages(prev => [...prev, categoryWelcome])

        // Luego mostrar la primera pregunta como un mensaje separado
        const firstQuestionMessage: Message = {
          text: isEnglish 
            ? "Here's a question you might be interested in:"
            : "Aquí hay una pregunta que podría interesarte:",
          sender: 'assistant',
          timestamp: new Date().toISOString(),
          id: (Date.now() + 1).toString(),
          isUser: false,
          suggestions: [firstQuestion]
        }
        setMessages(prev => [...prev, firstQuestionMessage])
      }
      return
    }

    // Si es una pregunta sugerida
    if (suggestion.type === 'question') {
      // Añadir la pregunta del usuario al chat
      const userQuestion = isEnglish ? (suggestion.en || suggestion.es || '') : (suggestion.es || suggestion.en || '');
      const message: Message = {
        text: userQuestion,
        sender: 'user',
        timestamp: new Date().toISOString(),
        id: Date.now().toString(),
        isUser: true
      }
      setMessages(prev => [...prev, message])
      
      // Obtener la respuesta para la pregunta
      const responseText = getCategoryResponse(currentCategory || '', suggestion.en || suggestion.es || '', isEnglish);
      
      // Añadir la respuesta al chat
      const response: Message = {
        text: responseText,
        sender: 'assistant',
        timestamp: new Date().toISOString(),
        id: (Date.now() + 1).toString(),
        isUser: false
      }
      setMessages(prev => [...prev, response])

      // Preparar la siguiente pregunta
      const categoryQuestions = suggestions[currentCategory as keyof typeof suggestions];
      if (categoryQuestions && categoryQuestions.length > 0) {
        // Calcular el índice de la siguiente pregunta
        const nextIndex = (currentQuestionIndex + 1) % categoryQuestions.length;
        setCurrentQuestionIndex(nextIndex);

        // Mostrar la siguiente pregunta después de un breve retraso
        setTimeout(() => {
          const nextQuestion = {
            ...categoryQuestions[nextIndex],
            type: 'question' as const
          };
          const followUp: Message = {
            text: isEnglish 
              ? "Would you like to know more about this topic?"
              : "¿Te gustaría saber más sobre este tema?",
            sender: 'assistant',
            timestamp: new Date().toISOString(),
            id: (Date.now() + 2).toString(),
            isUser: false,
            suggestions: [nextQuestion]
          }
          setMessages(prev => [...prev, followUp])
        }, 1000);
      }
    }
  }

  // Función mejorada para encontrar la pregunta más similar
  const findSimilarQuestion = (userInput: string, category: string): Suggestion | null => {
    const categoryQuestions = suggestions[category as keyof typeof suggestions] || [];
    const normalizedInput = userInput.toLowerCase().trim();
    
    // Buscar coincidencias exactas o similares
    const similarQuestion = categoryQuestions.find(q => {
      const normalizedQuestionEn = q.en.toLowerCase();
      const normalizedQuestionEs = q.es.toLowerCase();
      const inputWords = normalizedInput.split(' ').filter(word => word.length > 3);
      
      // Verificar coincidencias exactas
      if (normalizedQuestionEn === normalizedInput || normalizedQuestionEs === normalizedInput) return true;
      
      // Verificar si la pregunta contiene la entrada o viceversa
      if (normalizedQuestionEn.includes(normalizedInput) || normalizedInput.includes(normalizedQuestionEn) ||
          normalizedQuestionEs.includes(normalizedInput) || normalizedInput.includes(normalizedQuestionEs)) return true;
      
      // Verificar palabras clave comunes
      const questionWordsEn = normalizedQuestionEn.split(' ').filter(word => word.length > 3);
      const questionWordsEs = normalizedQuestionEs.split(' ').filter(word => word.length > 3);
      const commonWordsEn = inputWords.filter(word => questionWordsEn.includes(word));
      const commonWordsEs = inputWords.filter(word => questionWordsEs.includes(word));
      
      return commonWordsEn.length >= 2 || commonWordsEs.length >= 2; // Al menos 2 palabras en común
    });

    return similarQuestion || null;
  };

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
      id: Date.now().toString(),
      isUser: true
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')

    try {
      // Si el usuario está proporcionando su nombre
      if (!userData.name) {
        setUserData(prev => ({ ...prev, name: input }))
        const emailRequest: Message = {
          text: isEnglish 
            ? `Thank you ${input}! Could you please provide your email address?`
            : `¡Gracias ${input}! ¿Podrías proporcionarme tu correo electrónico?`,
          sender: 'assistant',
          timestamp: new Date().toISOString(),
          id: Date.now().toString(),
          isUser: false
        }
        setMessages(prev => [...prev, emailRequest])
        return
      }

      // Si el usuario está proporcionando su email
      if (!userData.email) {
        setUserData(prev => ({ ...prev, email: input }))
        const categoryRequest: Message = {
          text: isEnglish 
            ? `Thank you for providing your information. Please select a category from the sidebar to get started.`
            : `Gracias por proporcionar tu información. Por favor, selecciona una categoría del panel lateral para comenzar.`,
          sender: 'assistant',
          timestamp: new Date().toISOString(),
          id: Date.now().toString(),
          isUser: false
        }
        setMessages(prev => [...prev, categoryRequest])
        return
      }

      // Si el usuario ya proporcionó su información y hay una categoría seleccionada
      if (currentCategory) {
        // Buscar si la pregunta del usuario coincide con alguna pregunta sugerida
        const similarQuestion = findSimilarQuestion(input, currentCategory);
        
        if (similarQuestion) {
          // Si encontramos una pregunta similar, responder con la respuesta predefinida
          const response: Message = {
            text: getCategoryResponse(currentCategory, similarQuestion.en || similarQuestion.es || '', isEnglish),
            sender: 'assistant',
            timestamp: new Date().toISOString(),
            id: Date.now().toString(),
            isUser: false
          }
          setMessages(prev => [...prev, response]);

          // Mostrar la siguiente pregunta después de un breve retraso
          setTimeout(() => {
            const categoryQuestions = suggestions[currentCategory as keyof typeof suggestions];
            if (categoryQuestions && categoryQuestions.length > 0) {
              const nextQuestion = categoryQuestions[currentQuestionIndex];
              const followUp: Message = {
                text: isEnglish 
                  ? "Here's another question you might be interested in:"
                  : "Aquí hay otra pregunta que podría interesarte:",
                sender: 'assistant',
                timestamp: new Date().toISOString(),
                id: Date.now().toString(),
                isUser: false,
                suggestions: [nextQuestion]
              }
              setMessages(prev => [...prev, followUp])
            }
          }, 1000);
        } else {
          // Si no encontramos una pregunta similar, usar la API
          const response = await sendMessage(input)
          const assistantMessage: Message = {
            text: response.text,
            sender: 'assistant',
            timestamp: response.timestamp,
            suggestions: response.suggestions,
            id: Date.now().toString(),
            isUser: false
          }
          setMessages(prev => [...prev, assistantMessage])

          // Mostrar una pregunta sugerida después de un breve retraso
          setTimeout(() => {
            const categoryQuestions = suggestions[currentCategory as keyof typeof suggestions];
            if (categoryQuestions && categoryQuestions.length > 0) {
              const nextQuestion = categoryQuestions[currentQuestionIndex];
              const followUp: Message = {
                text: isEnglish 
                  ? "Here's a question you might be interested in:"
                  : "Aquí hay una pregunta que podría interesarte:",
                sender: 'assistant',
                timestamp: new Date().toISOString(),
                id: Date.now().toString(),
                isUser: false,
                suggestions: [nextQuestion]
              }
              setMessages(prev => [...prev, followUp])
            }
          }, 1000);
        }
      } else {
        // Si no hay categoría seleccionada, usar la API normal
        const response = await sendMessage(input)
        const assistantMessage: Message = {
          text: response.text,
          sender: 'assistant',
          timestamp: response.timestamp,
          suggestions: response.suggestions,
          id: Date.now().toString(),
          isUser: false
        }
        setMessages(prev => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        text: isEnglish ? "Sorry, there was an error processing your message." : "Lo siento, hubo un error al procesar tu mensaje.",
        sender: 'assistant',
        timestamp: new Date().toISOString(),
        id: Date.now().toString(),
        isUser: false
      }
      setMessages(prev => [...prev, errorMessage])
    }
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
      setMessages(conversation.messages.map(msg => ({
        ...msg,
        sender: msg.isUser ? 'user' : 'assistant',
        timestamp: new Date().toISOString()
      })))
      setCurrentConversation(conversationId)
      onClose()
    }
  }

  const sendMessage = async (message: string) => {
    try {
      const response = await axios.post(`${API_URL}/chat`, {
        message,
        sessionId: currentConversation || 'new',
        countryCode,
        language,
        userData: {
          name: userData.name,
          email: userData.email,
          category: currentCategory
        }
      });

      if (!response.data) {
        throw new Error('Invalid server response');
      }

      return {
        text: response.data.text,
        sender: 'assistant',
        timestamp: new Date().toISOString(),
        suggestions: response.data.suggestions
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
        {/* Chat Area */}
        <Box flex="1">
          {messages.length === 0 ? (
            <Flex justify="center" align="center" h="400px">
              <Button
                colorScheme="blue"
                size="lg"
                onClick={handleStartChat}
                leftIcon={<FaPaperPlane />}
              >
                {isEnglish ? "Start Chat" : "Iniciar Chat"}
              </Button>
            </Flex>
          ) : (
            <VStack spacing={4} align="stretch">
              {messages.map((message) => (
                <Box
                  key={message.id}
                  p={4}
                  bg={message.isUser ? useColorModeValue('blue.50', 'blue.900') : useColorModeValue('white', 'gray.800')}
                  borderRadius="lg"
                  boxShadow="sm"
                  maxW="80%"
                  alignSelf={message.isUser ? "flex-end" : "flex-start"}
                >
                  <Text color={useColorModeValue('black', 'white')}>{message.text}</Text>
                  {message.suggestions && message.suggestions.length > 0 && (
                    <VStack spacing={2} align="stretch" mt={2}>
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant="outline"
                          onClick={() => handleSuggestionClick(suggestion)}
                          justifyContent="flex-start"
                          textAlign="left"
                          whiteSpace="normal"
                          height="auto"
                          py={2}
                          colorScheme="blue"
                          _hover={{
                            bg: useColorModeValue('blue.50', 'blue.900')
                          }}
                        >
                          {isEnglish ? suggestion.en : suggestion.es}
                        </Button>
                      ))}
                    </VStack>
                  )}
                </Box>
              ))}
              {isLoading && (
                <Flex justify="center">
                  <Spinner />
                </Flex>
              )}
              <div ref={messagesEndRef} />
            </VStack>
          )}

          {messages.length > 0 && (
            <Box mt={4}>
              <Flex gap={2}>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isEnglish ? "Type your message..." : "Escribe tu mensaje..."}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  isDisabled={!isInputEnabled}
                />
                <Button
                  colorScheme="blue"
                  onClick={handleSend}
                  isLoading={isLoading}
                  leftIcon={<FaPaperPlane />}
                  isDisabled={!isInputEnabled}
                >
                  {isEnglish ? "Send" : "Enviar"}
                </Button>
              </Flex>
            </Box>
          )}
        </Box>

        {/* Suggestions Sidebar */}
        {messages.length > 0 && userData.email && (
          <Box
            w={{ base: '100%', md: '300px' }}
            display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
          >
            <ChatSuggestions
              onSuggestionClick={handleSuggestionClick}
              category={currentCategory}
            />
          </Box>
        )}
      </Flex>
    </Container>
  )
}

export default Chat 