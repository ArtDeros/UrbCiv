import { CategoryKey } from '../types/chat';

interface Category {
  name: {
    en: string;
    es: string;
    fr: string;
  };
  description: {
    en: string;
    es: string;
    fr: string;
  };
  suggestions: Array<{
    type: 'question';
    en: string;
    es: string;
    fr: string;
    category: CategoryKey;
  }>;
}

export const categories: Record<CategoryKey, Category> = {
  vivienda: {
    name: {
      en: 'Housing',
      es: 'Vivienda',
      fr: 'Logement'
    },
    description: {
      en: 'Information about housing benefits, rent control, and tenant rights',
      es: 'Información sobre beneficios de vivienda, control de rentas y derechos de inquilinos',
      fr: 'Informations sur les prestations de logement, le contrôle des loyers et les droits des locataires'
    },
    suggestions: [
      {
        type: 'question',
        en: 'What is the BC Benefits Connector?',
        es: '¿Qué es el BC Benefits Connector?',
        fr: 'Qu\'est-ce que le BC Benefits Connector?',
        category: 'vivienda'
      },
      {
        type: 'question',
        en: 'Is there a limit to rent increases in BC?',
        es: '¿Hay un límite para los aumentos de renta en BC?',
        fr: 'Y a-t-il une limite aux augmentations de loyer en CB?',
        category: 'vivienda'
      },
      {
        type: 'question',
        en: 'What rights do I have as a tenant in BC?',
        es: '¿Qué derechos tengo como inquilino en BC?',
        fr: 'Quels sont mes droits en tant que locataire en CB?',
        category: 'vivienda'
      }
    ]
  },
  educacion: {
    name: {
      en: 'Education',
      es: 'Educación',
      fr: 'Éducation'
    },
    description: {
      en: 'Information about schools, scholarships, and educational programs',
      es: 'Información sobre escuelas, becas y programas educativos',
      fr: 'Informations sur les écoles, les bourses et les programmes éducatifs'
    },
    suggestions: [
      {
        type: 'question',
        en: 'How do I enroll my child in school?',
        es: '¿Cómo inscribo a mi hijo en la escuela?',
        fr: 'Comment inscrire mon enfant à l\'école?',
        category: 'educacion'
      },
      {
        type: 'question',
        en: 'What scholarships are available?',
        es: '¿Qué becas están disponibles?',
        fr: 'Quelles bourses sont disponibles?',
        category: 'educacion'
      },
      {
        type: 'question',
        en: 'What adult education programs are available?',
        es: '¿Qué programas de educación para adultos están disponibles?',
        fr: 'Quels programmes d\'éducation pour adultes sont disponibles?',
        category: 'educacion'
      }
    ]
  },
  documentacion: {
    name: {
      en: 'Documentation',
      es: 'Documentación',
      fr: 'Documentation'
    },
    description: {
      en: 'Information about IDs, passports, and official documents',
      es: 'Información sobre cédulas, pasaportes y documentos oficiales',
      fr: 'Informations sur les cartes d\'identité, passeports et documents officiels'
    },
    suggestions: [
      {
        type: 'question',
        en: 'How do I get a new ID card?',
        es: '¿Cómo obtengo una nueva cédula?',
        fr: 'Comment obtenir une nouvelle carte d\'identité?',
        category: 'documentacion'
      },
      {
        type: 'question',
        en: 'What documents do I need for a passport?',
        es: '¿Qué documentos necesito para un pasaporte?',
        fr: 'Quels documents sont nécessaires pour un passeport?',
        category: 'documentacion'
      },
      {
        type: 'question',
        en: 'How do I renew my driver\'s license?',
        es: '¿Cómo renuevo mi licencia de conducir?',
        fr: 'Comment renouveler mon permis de conduire?',
        category: 'documentacion'
      }
    ]
  },
  transporte: {
    name: {
      en: 'Transportation',
      es: 'Transporte',
      fr: 'Transport'
    },
    description: {
      en: 'Information about public transportation, licenses, and permits',
      es: 'Información sobre transporte público, licencias y permisos',
      fr: 'Informations sur les transports publics, licences et permis'
    },
    suggestions: [
      {
        type: 'question',
        en: 'How do I get a bus pass?',
        es: '¿Cómo obtengo un pase de bus?',
        fr: 'Comment obtenir un pass de bus?',
        category: 'transporte'
      },
      {
        type: 'question',
        en: 'What are the public transportation routes?',
        es: '¿Cuáles son las rutas de transporte público?',
        fr: 'Quelles sont les routes de transport public?',
        category: 'transporte'
      },
      {
        type: 'question',
        en: 'How do I report a problem with public transportation?',
        es: '¿Cómo reporto un problema con el transporte público?',
        fr: 'Comment signaler un problème avec les transports publics?',
        category: 'transporte'
      }
    ]
  },
  beneficio: {
    name: {
      en: 'Benefits',
      es: 'Beneficios',
      fr: 'Prestations'
    },
    description: {
      en: 'Information about social benefits and assistance programs',
      es: 'Información sobre beneficios sociales y programas de asistencia',
      fr: 'Informations sur les prestations sociales et programmes d\'assistance'
    },
    suggestions: [
      {
        type: 'question',
        en: 'How do I apply for social benefits?',
        es: '¿Cómo solicito beneficios sociales?',
        fr: 'Comment demander des prestations sociales?',
        category: 'beneficio'
      },
      {
        type: 'question',
        en: 'What benefits am I eligible for?',
        es: '¿A qué beneficios soy elegible?',
        fr: 'À quelles prestations ai-je droit?',
        category: 'beneficio'
      },
      {
        type: 'question',
        en: 'How do I renew my benefits?',
        es: '¿Cómo renuevo mis beneficios?',
        fr: 'Comment renouveler mes prestations?',
        category: 'beneficio'
      }
    ]
  },
  salud: {
    name: {
      en: 'Health',
      es: 'Salud',
      fr: 'Santé'
    },
    description: {
      en: 'Information about healthcare services, insurance, and medical benefits',
      es: 'Información sobre servicios de salud, seguros y beneficios médicos',
      fr: 'Informations sur les services de santé, l\'assurance et les prestations médicales'
    },
    suggestions: [
      {
        type: 'question',
        en: 'How do I get a BC Services Card?',
        es: '¿Cómo obtengo una tarjeta de servicios de BC?',
        fr: 'Comment obtenir une carte de services de CB?',
        category: 'salud'
      },
      {
        type: 'question',
        en: 'What healthcare services are covered?',
        es: '¿Qué servicios de salud están cubiertos?',
        fr: 'Quels services de santé sont couverts?',
        category: 'salud'
      },
      {
        type: 'question',
        en: 'How do I find a family doctor?',
        es: '¿Cómo encuentro un médico de familia?',
        fr: 'Comment trouver un médecin de famille?',
        category: 'salud'
      }
    ]
  },
  trabajo: {
    name: {
      en: 'Employment',
      es: 'Trabajo',
      fr: 'Emploi'
    },
    description: {
      en: 'Information about jobs, work permits, and employment services',
      es: 'Información sobre trabajos, permisos de trabajo y servicios de empleo',
      fr: 'Informations sur les emplois, permis de travail et services d\'emploi'
    },
    suggestions: [
      {
        type: 'question',
        en: 'How do I find a job?',
        es: '¿Cómo encuentro trabajo?',
        fr: 'Comment trouver un emploi?',
        category: 'trabajo'
      },
      {
        type: 'question',
        en: 'What are the requirements for work permits?',
        es: '¿Cuáles son los requisitos para permisos de trabajo?',
        fr: 'Quelles sont les conditions pour les permis de travail?',
        category: 'trabajo'
      },
      {
        type: 'question',
        en: 'How do I file for unemployment benefits?',
        es: '¿Cómo solicito beneficios por desempleo?',
        fr: 'Comment demander des allocations de chômage?',
        category: 'trabajo'
      }
    ]
  },
  justicia: {
    name: {
      en: 'Justice',
      es: 'Justicia',
      fr: 'Justice'
    },
    description: {
      en: 'Information about legal services, courts, and justice system',
      es: 'Información sobre servicios legales, cortes y sistema de justicia',
      fr: 'Informations sur les services juridiques, tribunaux et système judiciaire'
    },
    suggestions: [
      {
        type: 'question',
        en: 'How do I file a complaint?',
        es: '¿Cómo presento una queja?',
        fr: 'Comment déposer une plainte?',
        category: 'justicia'
      },
      {
        type: 'question',
        en: 'Where can I get legal advice?',
        es: '¿Dónde puedo obtener asesoría legal?',
        fr: 'Où puis-je obtenir des conseils juridiques?',
        category: 'justicia'
      },
      {
        type: 'question',
        en: 'How do I access court records?',
        es: '¿Cómo accedo a los registros judiciales?',
        fr: 'Comment accéder aux dossiers judiciaires?',
        category: 'justicia'
      }
    ]
  }
};

export const getCategoryResponse = (category: string, question: string, language: string) => {
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
        fr: "Oui, il y a une limite annuelle aux augmentations de loyer, que vous pouvez vérifier à jour dans le Benefits Connector. �� https://gov.bc.ca/BCBenefitsConnector"
      },
      "What rights do I have as a tenant in BC?": {
        en: "You can check them in the 'Residential Tenancies' section of the Housing and Tenancy portal. 🔗 https://www2.gov.bc.ca/gov/content/housing-tenancy",
        es: "Puedes consultarlos en la sección 'Residential Tenancies' del portal de Housing and Tenancy del gobierno. 🔗 https://www2.gov.bc.ca/gov/content/housing-tenancy",
        fr: "Vous pouvez les consulter dans la section 'Residential Tenancies' du portail Housing and Tenancy. 🔗 https://www2.gov.bc.ca/gov/content/housing-tenancy"
      }
    },
    salud: {
      "How do I get a BC Services Card?": {
        en: "You can apply for a BC Services Card at any ICBC driver licensing office or Service BC location. 🔗 https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card",
        es: "Puedes solicitar una BC Services Card en cualquier oficina de licencias de conducir de ICBC o ubicación de Service BC. 🔗 https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card",
        fr: "Vous pouvez demander une carte de services BC dans n'importe quel bureau de permis de conduire ICBC ou centre Service BC. 🔗 https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card"
      },
      "What healthcare services are covered?": {
        en: "MSP covers medically required services provided by physicians and midwives, dental and oral surgery, and some orthodontic services. 🔗 https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/benefits",
        es: "El MSP cubre servicios médicamente necesarios proporcionados por médicos y parteras, cirugía dental y oral, y algunos servicios ortodónticos. 🔗 https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/benefits",
        fr: "Le MSP couvre les services médicalement nécessaires fournis par les médecins et les sages-femmes, la chirurgie dentaire et buccale, et certains services orthodontiques. 🔗 https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/benefits"
      },
      "How do I find a family doctor?": {
        en: "You can find a family doctor through your primary care provider or by searching online. 🔗 https://www.healthlinkbc.ca/find-a-doctor",
        es: "Puedes encontrar un médico de familia a través de tu proveedor de atención primaria o buscando en línea. 🔗 https://www.healthlinkbc.ca/find-a-doctor",
        fr: "Vous pouvez trouver un médecin de famille via votre fournisseur de soins de base ou en recherchant en ligne. 🔗 https://www.healthlinkbc.ca/find-a-doctor"
      }
    },
    educacion: {
      "How do I enroll my child in school?": {
        en: "You can enroll your child at your local school or through the School District's website. 🔗 https://www2.gov.bc.ca/gov/content/education-training/k-12/support/schools",
        es: "Puedes inscribir a tu hijo en la escuela local o a través del sitio web del Distrito Escolar. 🔗 https://www2.gov.bc.ca/gov/content/education-training/k-12/support/schools",
        fr: "Vous pouvez inscrire votre enfant à l'école locale ou via le site web du district scolaire. 🔗 https://www2.gov.bc.ca/gov/content/education-training/k-12/support/schools"
      },
      "What scholarships are available?": {
        en: "There are various scholarships available through StudentAid BC and other organizations. 🔗 https://studentaidbc.ca/scholarships",
        es: "Hay varias becas disponibles a través de StudentAid BC y otras organizaciones. 🔗 https://studentaidbc.ca/scholarships",
        fr: "Il existe diverses bourses disponibles par l'intermédiaire de StudentAid BC et d'autres organisations. 🔗 https://studentaidbc.ca/scholarships"
      },
      "What adult education programs are available?": {
        en: "There are various adult education programs available through community colleges, adult education centers, and online platforms. 🔗 https://www.bccampus.ca/programs/adult-education",
        es: "Hay varios programas de educación para adultos disponibles a través de las universidades de la comunidad, centros de educación para adultos y plataformas en línea. 🔗 https://www.bccampus.ca/programs/adult-education",
        fr: "Il existe diverses programmes d'éducation pour adultes disponibles par le biais de collèges communautaires, centres d'éducation pour adultes et plateformes en ligne. 🔗 https://www.bccampus.ca/programs/adult-education"
      }
    }
  };

  return responses[category]?.[question]?.[language] || 
         (language === 'en' ? "I don't have information about that specific question." : 
          language === 'fr' ? "Je n'ai pas d'informations sur cette question spécifique." :
          "No tengo información sobre esa pregunta específica.");
}; 