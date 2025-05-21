const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Configuración de CORS para permitir peticiones desde el frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Mapeo de países a idiomas
const countryLanguageMap = {
  CA: 'en',
  CO: 'es',
};

// Respuestas predefinidas en múltiples idiomas
const predefinedResponses = {
  // Saludos iniciales
  'hello': {
    en: 'Hello! I am your UrbCiv Assistant. How can I help you today?',
    es: '¡Hola! Soy tu Asistente UrbCiv. ¿Cómo puedo ayudarte hoy?'
  },
  'hi': {
    en: 'Hello! I am your UrbCiv Assistant. How can I help you today?',
    es: '¡Hola! Soy tu Asistente UrbCiv. ¿Cómo puedo ayudarte hoy?'
  },

  // Preguntas Frecuentes
  'faq': {
    en: {
      title: 'Frequently Asked Questions',
      response: 'Here are the most common questions:\n\n1. How do I apply for subsidized housing?\n2. What documents do I need for citizenship?\n3. How do I get a driver\'s license?\n4. What are the requirements for social benefits?\n5. How do I register for healthcare?\n6. What job search services are available?\n7. How do I check my court case status?\n8. What educational programs are available?\n9. How do I renew my ID?\n10. What transportation services are available?\n11. How do I apply for unemployment benefits?\n12. What mental health services are available?\n13. How do I start a business?\n14. What legal aid services are available?\n15. How do I report a problem?\n16. What childcare services are available?\n17. How do I pay my taxes?\n18. What emergency services are available?\n19. How do I get a building permit?\n20. What environmental services are available?\n21. How do I apply for a work permit?\n22. How do I get a birth certificate?\n23. How do I apply for a marriage license?\n24. How do I get a death certificate?\n25. How do I apply for a passport?\n\nPlease type the number of your question.'
    },
    es: {
      title: 'Preguntas Frecuentes',
      response: 'Aquí están las preguntas más comunes:\n\n1. ¿Cómo solicito vivienda subsidiada?\n2. ¿Qué documentos necesito para la ciudadanía?\n3. ¿Cómo obtengo una licencia de conducir?\n4. ¿Cuáles son los requisitos para beneficios sociales?\n5. ¿Cómo me registro para el seguro de salud?\n6. ¿Qué servicios de búsqueda de empleo hay disponibles?\n7. ¿Cómo verifico el estado de mi caso judicial?\n8. ¿Qué programas educativos hay disponibles?\n9. ¿Cómo renuevo mi identificación?\n10. ¿Qué servicios de transporte hay disponibles?\n11. ¿Cómo solicito beneficios por desempleo?\n12. ¿Qué servicios de salud mental hay disponibles?\n13. ¿Cómo inicio un negocio?\n14. ¿Qué servicios de asistencia legal hay disponibles?\n15. ¿Cómo reporto un problema?\n16. ¿Qué servicios de cuidado infantil hay disponibles?\n17. ¿Cómo pago mis impuestos?\n18. ¿Qué servicios de emergencia hay disponibles?\n19. ¿Cómo obtengo un permiso de construcción?\n20. ¿Qué servicios ambientales hay disponibles?\n21. ¿Cómo solicito un permiso de trabajo?\n22. ¿Cómo obtengo un acta de nacimiento?\n23. ¿Cómo solicito una licencia de matrimonio?\n24. ¿Cómo obtengo un acta de defunción?\n25. ¿Cómo solicito un pasaporte?\n\nPor favor, escriba el número de su pregunta.'
    }
  },

  // Respuestas detalladas para cada pregunta
  'faq_1': {
    en: {
      title: 'How to Apply for Subsidized Housing',
      response: 'To apply for subsidized housing in BC:\n\n1. Visit BC Housing website\n2. Complete the Housing Registry application\n3. Provide required documents:\n   - Proof of income\n   - Identification\n   - Current address\n   - Family composition\n\nProcessing time: 2-4 weeks\n\nUseful links:\n- BC Housing Registry\n- Housing Assistance Programs\n- Emergency Housing Services'
    },
    es: {
      title: 'Cómo Solicitar Vivienda Subsidiada',
      response: 'Para solicitar vivienda subsidiada en BC:\n\n1. Visite el sitio web de BC Housing\n2. Complete la solicitud del Registro de Vivienda\n3. Proporcione los documentos requeridos:\n   - Comprobante de ingresos\n   - Identificación\n   - Dirección actual\n   - Composición familiar\n\nTiempo de procesamiento: 2-4 semanas\n\nEnlaces útiles:\n- Registro de Vivienda BC\n- Programas de Asistencia de Vivienda\n- Servicios de Vivienda de Emergencia'
    }
  },

  'faq_2': {
    en: {
      title: 'Documents Required for Citizenship',
      response: 'Required documents for citizenship application:\n\n1. Valid passport\n2. Permanent Resident Card\n3. Language test results\n4. Proof of residence\n5. Tax returns\n6. Criminal record check\n\nProcessing time: 12-24 months\n\nUseful links:\n- Immigration, Refugees and Citizenship Canada\n- Citizenship Application Guide\n- Document Checklist'
    },
    es: {
      title: 'Documentos Requeridos para Ciudadanía',
      response: 'Documentos requeridos para la solicitud de ciudadanía:\n\n1. Pasaporte válido\n2. Tarjeta de Residente Permanente\n3. Resultados de prueba de idioma\n4. Comprobante de residencia\n5. Declaraciones de impuestos\n6. Verificación de antecedentes penales\n\nTiempo de procesamiento: 12-24 meses\n\nEnlaces útiles:\n- Inmigración, Refugiados y Ciudadanía Canadá\n- Guía de Solicitud de Ciudadanía\n- Lista de Verificación de Documentos'
    }
  },

  'faq_3': {
    en: {
      title: 'How to Get a Driver\'s License',
      response: 'Steps to obtain a driver\'s license:\n\n1. Study the driver\'s manual\n2. Take the knowledge test\n3. Complete driver training\n4. Pass the road test\n5. Pay the license fee\n\nRequired documents:\n- Proof of identity\n- Proof of residence\n- Medical certificate (if required)\n\nUseful links:\n- ICBC Driver Licensing\n- Driver Training Schools\n- Road Test Booking'
    },
    es: {
      title: 'Cómo Obtener una Licencia de Conducir',
      response: 'Pasos para obtener una licencia de conducir:\n\n1. Estudiar el manual del conductor\n2. Aprobar el examen teórico\n3. Completar el entrenamiento\n4. Aprobar el examen práctico\n5. Pagar la tarifa de licencia\n\nDocumentos requeridos:\n- Comprobante de identidad\n- Comprobante de residencia\n- Certificado médico (si es necesario)\n\nEnlaces útiles:\n- Licencias de Conducir ICBC\n- Escuelas de Entrenamiento\n- Reserva de Examen Práctico'
    }
  },

  'faq_4': {
    en: {
      title: 'Requirements for Social Benefits',
      response: 'Requirements for social benefits:\n\n1. Proof of income\n2. Proof of expenses\n3. Family status\n4. Residency status\n5. Bank statements\n\nAvailable benefits:\n- Income assistance\n- Disability benefits\n- Child benefits\n- Housing assistance\n\nUseful links:\n- BC Benefits\n- Income Assistance\n- Family Benefits'
    },
    es: {
      title: 'Requisitos para Beneficios Sociales',
      response: 'Requisitos para beneficios sociales:\n\n1. Comprobante de ingresos\n2. Comprobante de gastos\n3. Estado familiar\n4. Estado de residencia\n5. Estados de cuenta bancarios\n\nBeneficios disponibles:\n- Asistencia de ingresos\n- Beneficios por discapacidad\n- Beneficios familiares\n- Asistencia de vivienda\n\nEnlaces útiles:\n- Beneficios BC\n- Asistencia de Ingresos\n- Beneficios Familiares'
    }
  },

  'faq_5': {
    en: {
      title: 'How to Register for Healthcare',
      response: 'Steps to register for healthcare:\n\n1. Complete MSP application\n2. Provide required documents:\n   - Proof of identity\n   - Proof of residence\n   - Immigration status\n3. Wait for MSP card\n\nCoverage includes:\n- Doctor visits\n- Hospital care\n- Diagnostic services\n- Emergency services\n\nUseful links:\n- Medical Services Plan\n- Health Insurance BC\n- Health Services Finder'
    },
    es: {
      title: 'Cómo Registrarse para el Seguro de Salud',
      response: 'Pasos para registrarse en el seguro de salud:\n\n1. Complete la solicitud MSP\n2. Proporcione los documentos requeridos:\n   - Comprobante de identidad\n   - Comprobante de residencia\n   - Estado de inmigración\n3. Espere la tarjeta MSP\n\nLa cobertura incluye:\n- Visitas al médico\n- Atención hospitalaria\n- Servicios de diagnóstico\n- Servicios de emergencia\n\nEnlaces útiles:\n- Plan de Servicios Médicos\n- Seguro de Salud BC\n- Buscador de Servicios de Salud'
    }
  },

  'faq_6': {
    en: {
      title: 'Available Job Search Services',
      response: 'Available job search services:\n\n1. WorkBC Centers\n2. Online job boards\n3. Career counseling\n4. Resume workshops\n5. Interview preparation\n\nServices include:\n- Job matching\n- Skills assessment\n- Training programs\n- Employment counseling\n\nUseful links:\n- WorkBC\n- Job Bank\n- Career Services'
    },
    es: {
      title: 'Servicios de Búsqueda de Empleo Disponibles',
      response: 'Servicios de búsqueda de empleo disponibles:\n\n1. Centros WorkBC\n2. Bolsas de trabajo en línea\n3. Asesoramiento profesional\n4. Talleres de currículum\n5. Preparación para entrevistas\n\nLos servicios incluyen:\n- Emparejamiento de empleos\n- Evaluación de habilidades\n- Programas de capacitación\n- Asesoramiento laboral\n\nEnlaces útiles:\n- WorkBC\n- Banco de Empleos\n- Servicios de Carrera'
    }
  },

  'faq_7': {
    en: {
      title: 'How to Check Court Case Status',
      response: 'Ways to check court case status:\n\n1. Online Court Services\n2. Phone inquiry\n3. In-person visit\n\nRequired information:\n- Case number\n- Court location\n- Party names\n\nAvailable services:\n- Case status updates\n- Document access\n- Hearing schedules\n\nUseful links:\n- Court Services Online\n- BC Courts\n- Legal Aid Services'
    },
    es: {
      title: 'Cómo Verificar el Estado de un Caso Judicial',
      response: 'Formas de verificar el estado de un caso judicial:\n\n1. Servicios Judiciales en Línea\n2. Consulta telefónica\n3. Visita en persona\n\nInformación requerida:\n- Número de caso\n- Ubicación del tribunal\n- Nombres de las partes\n\nServicios disponibles:\n- Actualizaciones de estado\n- Acceso a documentos\n- Programación de audiencias\n\nEnlaces útiles:\n- Servicios Judiciales en Línea\n- Tribunales BC\n- Servicios de Asistencia Legal'
    }
  },

  'faq_8': {
    en: {
      title: 'Available Educational Programs',
      response: 'Available educational programs:\n\n1. K-12 Education\n2. Post-secondary\n3. Adult education\n4. Language courses\n5. Vocational training\n\nPrograms include:\n- Academic courses\n- Technical training\n- Online learning\n- Continuing education\n\nUseful links:\n- BC Education\n- Post-secondary Institutions\n- Adult Learning Programs'
    },
    es: {
      title: 'Programas Educativos Disponibles',
      response: 'Programas educativos disponibles:\n\n1. Educación K-12\n2. Post-secundaria\n3. Educación de adultos\n4. Cursos de idiomas\n5. Capacitación vocacional\n\nLos programas incluyen:\n- Cursos académicos\n- Capacitación técnica\n- Aprendizaje en línea\n- Educación continua\n\nEnlaces útiles:\n- Educación BC\n- Instituciones Post-secundarias\n- Programas de Aprendizaje para Adultos'
    }
  },

  'faq_9': {
    en: {
      title: 'How to Renew ID',
      response: 'Steps to renew ID:\n\n1. Visit ICBC office\n2. Complete application\n3. Provide documents:\n   - Current ID\n   - Proof of residence\n   - Photo\n4. Pay renewal fee\n\nProcessing time: 2-3 weeks\n\nUseful links:\n- ICBC ID Services\n- ID Renewal Guide\n- Office Locations'
    },
    es: {
      title: 'Cómo Renovar Identificación',
      response: 'Pasos para renovar identificación:\n\n1. Visite oficina ICBC\n2. Complete la solicitud\n3. Proporcione documentos:\n   - ID actual\n   - Comprobante de residencia\n   - Foto\n4. Pague tarifa de renovación\n\nTiempo de procesamiento: 2-3 semanas\n\nEnlaces útiles:\n- Servicios de ID ICBC\n- Guía de Renovación de ID\n- Ubicaciones de Oficinas'
    }
  },

  'faq_10': {
    en: {
      title: 'Available Transportation Services',
      response: 'Available transportation services:\n\n1. Public transit\n2. HandyDART\n3. Taxi services\n4. Bike sharing\n5. Car sharing\n\nServices include:\n- Bus routes\n- SkyTrain\n- SeaBus\n- West Coast Express\n\nUseful links:\n- TransLink\n- BC Transit\n- Transportation Options'
    },
    es: {
      title: 'Servicios de Transporte Disponibles',
      response: 'Servicios de transporte disponibles:\n\n1. Transporte público\n2. HandyDART\n3. Servicios de taxi\n4. Compartir bicicletas\n5. Compartir automóviles\n\nLos servicios incluyen:\n- Rutas de autobús\n- SkyTrain\n- SeaBus\n- West Coast Express\n\nEnlaces útiles:\n- TransLink\n- BC Transit\n- Opciones de Transporte'
    }
  },

  'faq_11': {
    en: {
      title: 'How to Apply for Unemployment Benefits',
      response: 'Steps to apply for unemployment benefits:\n\n1. Register with WorkBC\n2. Complete application\n3. Provide documents:\n   - Record of employment\n   - Bank information\n   - ID\n4. Attend orientation\n\nProcessing time: 2-4 weeks\n\nUseful links:\n- Employment Insurance\n- WorkBC Services\n- Benefit Calculator'
    },
    es: {
      title: 'Cómo Solicitar Beneficios por Desempleo',
      response: 'Pasos para solicitar beneficios por desempleo:\n\n1. Regístrese con WorkBC\n2. Complete la solicitud\n3. Proporcione documentos:\n   - Registro de empleo\n   - Información bancaria\n   - Identificación\n4. Asista a orientación\n\nTiempo de procesamiento: 2-4 semanas\n\nEnlaces útiles:\n- Seguro de Empleo\n- Servicios WorkBC\n- Calculadora de Beneficios'
    }
  },

  'faq_12': {
    en: {
      title: 'Available Mental Health Services',
      response: 'Available mental health services:\n\n1. Counseling\n2. Crisis support\n3. Group therapy\n4. Online resources\n5. Emergency services\n\nServices include:\n- Individual therapy\n- Family counseling\n- Crisis hotline\n- Support groups\n\nUseful links:\n- Mental Health Support\n- Crisis Services\n- Health Services Directory'
    },
    es: {
      title: 'Servicios de Salud Mental Disponibles',
      response: 'Servicios de salud mental disponibles:\n\n1. Asesoramiento\n2. Apoyo en crisis\n3. Terapia grupal\n4. Recursos en línea\n5. Servicios de emergencia\n\nLos servicios incluyen:\n- Terapia individual\n- Asesoramiento familiar\n- Línea de crisis\n- Grupos de apoyo\n\nEnlaces útiles:\n- Apoyo de Salud Mental\n- Servicios de Crisis\n- Directorio de Servicios de Salud'
    }
  },

  'faq_13': {
    en: {
      title: 'How to Start a Business',
      response: 'Steps to start a business:\n\n1. Business registration\n2. Business license\n3. Tax registration\n4. Insurance\n5. Business plan\n\nRequirements:\n- Business name\n- Business structure\n- Location\n- Financial plan\n\nUseful links:\n- Business Registration\n- Small Business BC\n- Business Resources'
    },
    es: {
      title: 'Cómo Iniciar un Negocio',
      response: 'Pasos para iniciar un negocio:\n\n1. Registro de negocio\n2. Licencia comercial\n3. Registro de impuestos\n4. Seguros\n5. Plan de negocio\n\nRequisitos:\n- Nombre del negocio\n- Estructura del negocio\n- Ubicación\n- Plan financiero\n\nEnlaces útiles:\n- Registro de Negocios\n- Pequeñas Empresas BC\n- Recursos para Negocios'
    }
  },

  'faq_14': {
    en: {
      title: 'Available Legal Aid Services',
      response: 'Available legal aid services:\n\n1. Legal advice\n2. Court representation\n3. Document preparation\n4. Mediation\n5. Family law services\n\nServices include:\n- Criminal law\n- Family law\n- Immigration law\n- Civil law\n\nUseful links:\n- Legal Aid BC\n- Pro Bono Services\n- Law Society'
    },
    es: {
      title: 'Servicios de Asistencia Legal Disponibles',
      response: 'Servicios de asistencia legal disponibles:\n\n1. Asesoramiento legal\n2. Representación en tribunales\n3. Preparación de documentos\n4. Mediación\n5. Servicios de derecho familiar\n\nLos servicios incluyen:\n- Derecho penal\n- Derecho familiar\n- Derecho de inmigración\n- Derecho civil\n\nEnlaces útiles:\n- Asistencia Legal BC\n- Servicios Pro Bono\n- Sociedad de Abogados'
    }
  },

  'faq_15': {
    en: {
      title: 'How to Report a Problem',
      response: 'Ways to report a problem:\n\n1. Online reporting\n2. Phone hotline\n3. In-person report\n4. Email\n5. Mobile app\n\nTypes of reports:\n- Public safety\n- Infrastructure\n- Environmental\n- Noise complaints\n\nUseful links:\n- Report a Problem\n- City Services\n- Emergency Services'
    },
    es: {
      title: 'Cómo Reportar un Problema',
      response: 'Formas de reportar un problema:\n\n1. Reporte en línea\n2. Línea telefónica\n3. Reporte en persona\n4. Correo electrónico\n5. Aplicación móvil\n\nTipos de reportes:\n- Seguridad pública\n- Infraestructura\n- Ambiental\n- Quejas de ruido\n\nEnlaces útiles:\n- Reportar un Problema\n- Servicios de la Ciudad\n- Servicios de Emergencia'
    }
  },

  'faq_16': {
    en: {
      title: 'Available Childcare Services',
      response: 'Available childcare services:\n\n1. Daycare centers\n2. Family daycare\n3. Preschool programs\n4. After-school care\n5. Summer camps\n\nServices include:\n- Full-time care\n- Part-time care\n- Emergency care\n- Special needs care\n\nUseful links:\n- Childcare BC\n- Child Care Finder\n- Child Care Subsidy'
    },
    es: {
      title: 'Servicios de Cuidado Infantil Disponibles',
      response: 'Servicios de cuidado infantil disponibles:\n\n1. Centros de cuidado diario\n2. Cuidado familiar\n3. Programas preescolares\n4. Cuidado después de la escuela\n5. Campamentos de verano\n\nLos servicios incluyen:\n- Cuidado de tiempo completo\n- Cuidado de medio tiempo\n- Cuidado de emergencia\n- Cuidado para necesidades especiales\n\nEnlaces útiles:\n- Cuidado Infantil BC\n- Buscador de Cuidado Infantil\n- Subsidio de Cuidado Infantil'
    }
  },

  'faq_17': {
    en: {
      title: 'How to Pay Taxes',
      response: 'Ways to pay taxes:\n\n1. Online payment\n2. Bank payment\n3. Mail payment\n4. In-person payment\n5. Automatic payment\n\nRequired documents:\n- Tax return\n- Income statements\n- Receipts\n- Bank information\n\nUseful links:\n- CRA Online Services\n- Tax Payment Options\n- Tax Forms'
    },
    es: {
      title: 'Cómo Pagar Impuestos',
      response: 'Formas de pagar impuestos:\n\n1. Pago en línea\n2. Pago bancario\n3. Pago por correo\n4. Pago en persona\n5. Pago automático\n\nDocumentos requeridos:\n- Declaración de impuestos\n- Estados de ingresos\n- Recibos\n- Información bancaria\n\nEnlaces útiles:\n- Servicios en Línea CRA\n- Opciones de Pago de Impuestos\n- Formularios de Impuestos'
    }
  },

  'faq_18': {
    en: {
      title: 'Available Emergency Services',
      response: 'Available emergency services:\n\n1. Police (911)\n2. Fire (911)\n3. Ambulance (911)\n4. Poison control\n5. Crisis hotline\n\nServices include:\n- Emergency response\n- Disaster relief\n- Emergency shelter\n- Medical emergency\n\nUseful links:\n- Emergency Services\n- 911 Services\n- Emergency Preparedness'
    },
    es: {
      title: 'Servicios de Emergencia Disponibles',
      response: 'Servicios de emergencia disponibles:\n\n1. Policía (911)\n2. Bomberos (911)\n3. Ambulancia (911)\n4. Control de intoxicaciones\n5. Línea de crisis\n\nLos servicios incluyen:\n- Respuesta de emergencia\n- Ayuda en desastres\n- Refugio de emergencia\n- Emergencia médica\n\nEnlaces útiles:\n- Servicios de Emergencia\n- Servicios 911\n- Preparación para Emergencias'
    }
  },

  'faq_19': {
    en: {
      title: 'How to Get a Building Permit',
      response: 'Steps to get a building permit:\n\n1. Submit application\n2. Provide plans\n3. Pay fees\n4. Wait for review\n5. Receive permit\n\nRequired documents:\n- Building plans\n- Site survey\n- Contractor information\n- Insurance proof\n\nUseful links:\n- Building Permits\n- Development Services\n- Building Codes'
    },
    es: {
      title: 'Cómo Obtener un Permiso de Construcción',
      response: 'Pasos para obtener un permiso de construcción:\n\n1. Presentar solicitud\n2. Proporcionar planos\n3. Pagar tarifas\n4. Esperar revisión\n5. Recibir permiso\n\nDocumentos requeridos:\n- Planos de construcción\n- Levantamiento del sitio\n- Información del contratista\n- Comprobante de seguro\n\nEnlaces útiles:\n- Permisos de Construcción\n- Servicios de Desarrollo\n- Códigos de Construcción'
    }
  },

  'faq_20': {
    en: {
      title: 'Available Environmental Services',
      response: 'Available environmental services:\n\n1. Recycling\n2. Waste collection\n3. Green spaces\n4. Water conservation\n5. Air quality\n\nServices include:\n- Waste management\n- Environmental protection\n- Conservation programs\n- Sustainability initiatives\n\nUseful links:\n- Environmental Services\n- Recycling Programs\n- Green Initiatives'
    },
    es: {
      title: 'Servicios Ambientales Disponibles',
      response: 'Servicios ambientales disponibles:\n\n1. Reciclaje\n2. Recolección de residuos\n3. Espacios verdes\n4. Conservación de agua\n5. Calidad del aire\n\nLos servicios incluyen:\n- Gestión de residuos\n- Protección ambiental\n- Programas de conservación\n- Iniciativas de sostenibilidad\n\nEnlaces útiles:\n- Servicios Ambientales\n- Programas de Reciclaje\n- Iniciativas Verdes'
    }
  },

  // Nuevas respuestas detalladas para trámites específicos
  'faq_21': {
    en: {
      title: 'How to Apply for a Work Permit',
      response: 'Steps to apply for a work permit:\n\n1. Determine your eligibility\n2. Gather required documents:\n   - Job offer letter\n   - LMIA (if required)\n   - Passport\n   - Photos\n   - Application fee\n3. Submit application online or in person\n4. Wait for processing\n\nProcessing time: 2-3 months\n\nUseful links:\n- Work Permit Application: https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/permit.html\n- Document Checklist: https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/guide-5487-applying-work-permit-outside-canada.html\n- Processing Times: https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html'
    },
    es: {
      title: 'Cómo Solicitar un Permiso de Trabajo',
      response: 'Pasos para solicitar un permiso de trabajo:\n\n1. Determine su elegibilidad\n2. Reúna los documentos requeridos:\n   - Carta de oferta de trabajo\n   - LMIA (si es necesario)\n   - Pasaporte\n   - Fotos\n   - Tarifa de solicitud\n3. Presente la solicitud en línea o en persona\n4. Espere el procesamiento\n\nTiempo de procesamiento: 2-3 meses\n\nEnlaces útiles:\n- Solicitud de Permiso de Trabajo: https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/permit.html\n- Lista de Verificación de Documentos: https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/guide-5487-applying-work-permit-outside-canada.html\n- Tiempos de Procesamiento: https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html'
    }
  },

  'faq_22': {
    en: {
      title: 'How to Get a Birth Certificate',
      response: 'Steps to obtain a birth certificate:\n\n1. Complete the application form\n2. Provide required documents:\n   - Parent\'s identification\n   - Hospital records\n   - Proof of relationship\n3. Pay the application fee\n4. Submit in person or by mail\n\nProcessing time: 2-4 weeks\n\nUseful links:\n- Birth Certificate Application: https://www2.gov.bc.ca/gov/content/life-events/birth-adoption/birth-certificates\n- Application Form: https://www2.gov.bc.ca/assets/gov/birth-adoption-death-marriage-and-divorce/birth-adoption/birth-certificates/application_for_birth_certificate.pdf\n- Office Locations: https://www2.gov.bc.ca/gov/content/life-events/birth-adoption/birth-certificates/where-to-apply'
    },
    es: {
      title: 'Cómo Obtener un Acta de Nacimiento',
      response: 'Pasos para obtener un acta de nacimiento:\n\n1. Complete el formulario de solicitud\n2. Proporcione los documentos requeridos:\n   - Identificación de los padres\n   - Registros hospitalarios\n   - Prueba de relación\n3. Pague la tarifa de solicitud\n4. Presente en persona o por correo\n\nTiempo de procesamiento: 2-4 semanas\n\nEnlaces útiles:\n- Solicitud de Acta de Nacimiento: https://www2.gov.bc.ca/gov/content/life-events/birth-adoption/birth-certificates\n- Formulario de Solicitud: https://www2.gov.bc.ca/assets/gov/birth-adoption-death-marriage-and-divorce/birth-adoption/birth-certificates/application_for_birth_certificate.pdf\n- Ubicaciones de Oficinas: https://www2.gov.bc.ca/gov/content/life-events/birth-adoption/birth-certificates/where-to-apply'
    }
  },

  'faq_23': {
    en: {
      title: 'How to Apply for a Marriage License',
      response: 'Steps to apply for a marriage license:\n\n1. Complete the application form\n2. Provide required documents:\n   - Valid ID\n   - Proof of age\n   - Divorce certificate (if applicable)\n3. Pay the application fee\n4. Submit in person\n\nProcessing time: Immediate\n\nUseful links:\n- Marriage License Application: https://www2.gov.bc.ca/gov/content/life-events/marriage/marriage-licences\n- Application Form: https://www2.gov.bc.ca/assets/gov/birth-adoption-death-marriage-and-divorce/marriage/marriage-licences/application_for_marriage_licence.pdf\n- Office Locations: https://www2.gov.bc.ca/gov/content/life-events/marriage/marriage-licences/where-to-apply'
    },
    es: {
      title: 'Cómo Solicitar una Licencia de Matrimonio',
      response: 'Pasos para solicitar una licencia de matrimonio:\n\n1. Complete el formulario de solicitud\n2. Proporcione los documentos requeridos:\n   - Identificación válida\n   - Prueba de edad\n   - Certificado de divorcio (si aplica)\n3. Pague la tarifa de solicitud\n4. Presente en persona\n\nTiempo de procesamiento: Inmediato\n\nEnlaces útiles:\n- Solicitud de Licencia de Matrimonio: https://www2.gov.bc.ca/gov/content/life-events/marriage/marriage-licences\n- Formulario de Solicitud: https://www2.gov.bc.ca/assets/gov/birth-adoption-death-marriage-and-divorce/marriage/marriage-licences/application_for_marriage_licence.pdf\n- Ubicaciones de Oficinas: https://www2.gov.bc.ca/gov/content/life-events/marriage/marriage-licences/where-to-apply'
    }
  },

  'faq_24': {
    en: {
      title: 'How to Get a Death Certificate',
      response: 'Steps to obtain a death certificate:\n\n1. Complete the application form\n2. Provide required documents:\n   - Proof of relationship\n   - Funeral home statement\n   - Medical certificate\n3. Pay the application fee\n4. Submit in person or by mail\n\nProcessing time: 2-4 weeks\n\nUseful links:\n- Death Certificate Application: https://www2.gov.bc.ca/gov/content/life-events/death/death-certificates\n- Application Form: https://www2.gov.bc.ca/assets/gov/birth-adoption-death-marriage-and-divorce/death/death-certificates/application_for_death_certificate.pdf\n- Office Locations: https://www2.gov.bc.ca/gov/content/life-events/death/death-certificates/where-to-apply'
    },
    es: {
      title: 'Cómo Obtener un Acta de Defunción',
      response: 'Pasos para obtener un acta de defunción:\n\n1. Complete el formulario de solicitud\n2. Proporcione los documentos requeridos:\n   - Prueba de relación\n   - Declaración de la funeraria\n   - Certificado médico\n3. Pague la tarifa de solicitud\n4. Presente en persona o por correo\n\nTiempo de procesamiento: 2-4 semanas\n\nEnlaces útiles:\n- Solicitud de Acta de Defunción: https://www2.gov.bc.ca/gov/content/life-events/death/death-certificates\n- Formulario de Solicitud: https://www2.gov.bc.ca/assets/gov/birth-adoption-death-marriage-and-divorce/death/death-certificates/application_for_death_certificate.pdf\n- Ubicaciones de Oficinas: https://www2.gov.bc.ca/gov/content/life-events/death/death-certificates/where-to-apply'
    }
  },

  'faq_25': {
    en: {
      title: 'How to Apply for a Passport',
      response: 'Steps to apply for a passport:\n\n1. Complete the application form\n2. Provide required documents:\n   - Proof of citizenship\n   - Valid ID\n   - Photos\n   - References\n3. Pay the application fee\n4. Submit in person\n\nProcessing time: 2-3 weeks\n\nUseful links:\n- Passport Application: https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports.html\n- Application Form: https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/forms.html\n- Office Locations: https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/passport-offices.html'
    },
    es: {
      title: 'Cómo Solicitar un Pasaporte',
      response: 'Pasos para solicitar un pasaporte:\n\n1. Complete el formulario de solicitud\n2. Proporcione los documentos requeridos:\n   - Prueba de ciudadanía\n   - Identificación válida\n   - Fotos\n   - Referencias\n3. Pague la tarifa de solicitud\n4. Presente en persona\n\nTiempo de procesamiento: 2-3 semanas\n\nEnlaces útiles:\n- Solicitud de Pasaporte: https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports.html\n- Formulario de Solicitud: https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/forms.html\n- Ubicaciones de Oficinas: https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/passport-offices.html'
    }
  }
};

// Almacenamiento temporal de datos del usuario
const userSessions = {};

// Endpoint para procesar mensajes
app.post('/api/chat', async (req, res) => {
  try {
    const { message, userId, countryCode, language } = req.body;
    const botLanguage = language || countryLanguageMap[countryCode] || 'es';
    const messageLower = message.toLowerCase().trim();

    // Obtener o crear sesión de usuario
    if (!userSessions[userId]) {
      userSessions[userId] = {
        name: null,
        gender: null,
        step: 'initial'
      };
    }

    let responseText = '';
    let responseType = 'text';

    // Lógica de flujo de conversación
    switch (userSessions[userId].step) {
      case 'initial':
        if (messageLower === 'hello' || messageLower === 'hi') {
          responseText = predefinedResponses['hello'][botLanguage];
          userSessions[userId].step = 'waiting_name';
        } else {
          responseText = botLanguage === 'en' 
            ? 'Please start with "hello" or "hi"'
            : 'Por favor, comience con "hola"';
        }
        break;

      case 'waiting_name':
        // Asumimos que el mensaje es el nombre
        userSessions[userId].name = message;
        responseText = botLanguage === 'en'
          ? `Hello ${message}, what type of procedure would you like to perform? Are you a lady or gentleman?`
          : `Hola ${message}, ¿qué trámite desea realizar? ¿Es usted dama o caballero?`;
        userSessions[userId].step = 'waiting_gender';
        break;

      case 'waiting_gender':
        // Asumimos que el mensaje es el género
        userSessions[userId].gender = messageLower.includes('dama') || messageLower.includes('lady') ? 'lady' : 'gentleman';
        const genderText = userSessions[userId].gender === 'lady' 
          ? (botLanguage === 'en' ? 'lady' : 'dama')
          : (botLanguage === 'en' ? 'gentleman' : 'caballero');
        responseText = botLanguage === 'en'
          ? `Thank you ${userSessions[userId].name}. As a ${genderText}, please select one of the following services:\n\n1. Housing\n2. Education\n3. Documentation and Citizenship\n4. Transportation and Infrastructure\n5. Social Benefits\n6. Health and Wellness\n7. Work and Entrepreneurship\n8. Justice\n\nPlease type the number of your choice.`
          : `Gracias ${userSessions[userId].name}. Como ${genderText}, por favor seleccione uno de los siguientes servicios:\n\n1. Vivienda\n2. Educación\n3. Documentación y Ciudadanía\n4. Transporte e Infraestructura\n5. Beneficio Social\n6. Salud y Bienestar\n7. Trabajo y Emprendimiento\n8. Justicia\n\nPor favor, escriba el número de su elección.`;
        userSessions[userId].step = 'waiting_service';
        break;

      case 'waiting_service':
        // Procesar selección de servicio
        const serviceNumber = parseInt(message);
        if (isNaN(serviceNumber) || serviceNumber < 1 || serviceNumber > 8) {
          responseText = botLanguage === 'en'
            ? `${userSessions[userId].name}, please select a valid number from the menu.`
            : `${userSessions[userId].name}, por favor seleccione un número válido del menú.`;
        } else {
          const services = ['vivienda', 'educacion', 'documentacion', 'transporte', 'beneficio', 'salud', 'trabajo', 'justicia'];
          const selectedService = services[serviceNumber - 1];
          const serviceInfo = predefinedResponses[selectedService][botLanguage];
          
          responseText = botLanguage === 'en'
            ? `${userSessions[userId].name}, here is the information about ${serviceInfo.title}:\n\n${serviceInfo.response}`
            : `${userSessions[userId].name}, aquí está la información sobre ${serviceInfo.title}:\n\n${serviceInfo.response}`;
          userSessions[userId].step = 'initial';
        }
        break;
    }

    const response = {
      responses: [
        {
          text: responseText,
          type: responseType
        }
      ],
      language: botLanguage
    };

    res.json(response);
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({
      error: 'Error processing message',
      details: error.message
    });
  }
});

// Endpoint para verificar el estado del servidor
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Endpoint para obtener el estado de los trámites
app.get('/api/tracking', (req, res) => {
  const { language = 'en' } = req.query
  const data = trackingData[language] || trackingData['en']
  res.json(Object.values(data))
})

// Endpoint para actualizar el estado de un trámite
app.post('/api/tracking/:id', (req, res) => {
  const { id } = req.params
  const { language = 'en', status } = req.body
  
  if (!trackingData[language]?.[id]) {
    return res.status(404).json({ error: 'Tracking item not found' })
  }

  if (status) {
    trackingData[language][id].status = status
  }

  res.json(trackingData[language][id])
})

// Endpoint para configurar recordatorios
app.post('/api/tracking/:id/reminder', (req, res) => {
  const { id } = req.params
  const { language = 'en', reminderDate } = req.body
  
  if (!trackingData[language]?.[id]) {
    return res.status(404).json({ error: 'Tracking item not found' })
  }

  // Aquí se implementaría la lógica para configurar recordatorios
  // Por ahora, solo devolvemos un mensaje de éxito
  res.json({
    message: language === 'en' 
      ? 'Reminder set successfully' 
      : 'Recordatorio configurado exitosamente',
    reminderDate
  })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 