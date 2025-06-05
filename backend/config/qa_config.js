const qaConfig = {
  categories: {
    housing: {
      name: {
        en: "Housing",
        es: "Vivienda",
        fr: "Logement"
      },
      description: {
        en: "Information about housing programs, subsidies, and requirements in British Columbia",
        es: "Información sobre programas de vivienda, subsidios y requisitos en British Columbia",
        fr: "Informations sur les programmes d'habitation, les subventions et les exigences en Colombie-Britannique"
      },
      questions: [
        {
          patterns: {
            en: [
              "What is subsidized housing in BC and who is eligible?",
              "subsidized housing eligibility",
              "who can apply for housing",
              "housing assistance requirements"
            ],
            es: [
              "¿Qué es la vivienda subsidiada en BC y quién puede aplicar?",
              "qué es vivienda subsidiada",
              "quien puede aplicar vivienda",
              "requisitos vivienda subsidiada"
            ],
            fr: [
              "Qu'est-ce que l'habitation subventionnée en Colombie-Britannique et qui peut s'y prévaloir ?",
              "éligibilité à l'habitation subventionnée",
              "qui peut s'y prévaloir",
              "exigences d'aide à l'habitation"
            ]
          },
          response: {
            en: {
              main: "Subsidized housing in BC is a program that offers reduced-price housing for low-income individuals.",
              details: [
                "Eligible applicants include:",
                "- Permanent residents or Canadian citizens",
                "- People with income below the established limit",
                "- Families, individuals, and seniors"
              ],
              links: [
                {
                  text: "BC Housing - Subsidized Housing",
                  url: "https://www.bchousing.org/housing-assistance/rental-housing/subsidized-housing"
                },
                {
                  text: "Eligibility Guide",
                  url: "https://www.bchousing.org/housing-assistance/rental-housing/subsidized-housing/eligibility"
                }
              ],
              additionalInfo: "The program is designed to help people find affordable housing in BC. Prices are calculated based on family income."
            },
            es: {
              main: "La vivienda subsidiada en BC es un programa que ofrece viviendas a precios reducidos para personas de bajos ingresos.",
              details: [
                "Pueden aplicar:",
                "- Residentes permanentes o ciudadanos canadienses",
                "- Personas con ingresos por debajo del límite establecido",
                "- Familias, individuos y personas mayores"
              ],
              links: [
                {
                  text: "BC Housing - Vivienda Subsidiada",
                  url: "https://www.bchousing.org/housing-assistance/rental-housing/subsidized-housing"
                },
                {
                  text: "Guía de Elegibilidad",
                  url: "https://www.bchousing.org/housing-assistance/rental-housing/subsidized-housing/eligibility"
                }
              ],
              additionalInfo: "El programa está diseñado para ayudar a las personas a encontrar viviendas asequibles en BC. Los precios se calculan basándose en el ingreso familiar."
            },
            fr: {
              main: "L'habitation subventionnée en Colombie-Britannique est un programme qui offre des logements à prix réduits pour les personnes de faible revenu.",
              details: [
                "Les personnes éligibles incluent :",
                "- Résidents permanents ou citoyens canadiens",
                "- Les personnes avec des revenus en dessous de la limite établie",
                "- Les familles, les individus et les personnes âgées"
              ],
              links: [
                {
                  text: "BC Housing - Habitation Subventionnée",
                  url: "https://www.bchousing.org/housing-assistance/rental-housing/subsidized-housing"
                },
                {
                  text: "Guide d'éligibilité",
                  url: "https://www.bchousing.org/housing-assistance/rental-housing/subsidized-housing/eligibility"
                }
              ],
              additionalInfo: "Le programme est conçu pour aider les personnes à trouver des logements abordables en Colombie-Britannique. Les prix sont calculés en fonction du revenu familial."
            }
          }
        },
        {
          patterns: {
            en: [
              "What are the eligibility requirements for subsidized housing in BC?",
              "housing requirements",
              "subsidized housing requirements",
              "how to qualify for housing"
            ],
            es: [
              "¿Cuáles son los requisitos para acceder a una vivienda subsidiada en BC?",
              "requisitos vivienda subsidiada",
              "cómo calificar para vivienda",
              "requisitos para vivienda"
            ],
            fr: [
              "Quels sont les exigences d'éligibilité pour l'habitation subventionnée en Colombie-Britannique ?",
              "exigences d'habitation",
              "exigences d'habitation subventionnée",
              "comment se qualifier pour l'habitation"
            ]
          },
          response: {
            en: {
              main: "The main requirements for accessing subsidized housing in BC are:",
              details: [
                "1. Be a permanent resident or Canadian citizen",
                "2. Have income below the established limit",
                "3. Not own a home",
                "4. Meet specific program requirements"
              ],
              links: [
                {
                  text: "Detailed Requirements",
                  url: "https://www.bchousing.org/housing-assistance/rental-housing/subsidized-housing/eligibility"
                },
                {
                  text: "Income Calculator",
                  url: "https://www.bchousing.org/housing-assistance/rental-housing/subsidized-housing/income-calculator"
                }
              ],
              additionalInfo: "Income limits vary by family size and location. It's recommended to check the current limits on the BC Housing website."
            },
            es: {
              main: "Los requisitos principales para acceder a vivienda subsidiada en BC son:",
              details: [
                "1. Ser residente permanente o ciudadano canadiense",
                "2. Tener ingresos por debajo del límite establecido",
                "3. No poseer una vivienda",
                "4. Cumplir con los requisitos específicos del programa"
              ],
              links: [
                {
                  text: "Requisitos Detallados",
                  url: "https://www.bchousing.org/housing-assistance/rental-housing/subsidized-housing/eligibility"
                },
                {
                  text: "Calculadora de Ingresos",
                  url: "https://www.bchousing.org/housing-assistance/rental-housing/subsidized-housing/income-calculator"
                }
              ],
              additionalInfo: "Los límites de ingresos varían según el tamaño de la familia y la ubicación. Se recomienda verificar los límites actualizados en el sitio web de BC Housing."
            },
            fr: {
              main: "Les exigences d'éligibilité principales pour l'habitation subventionnée en Colombie-Britannique sont :",
              details: [
                "1. Être résident permanent ou citoyen canadiens",
                "2. Avoir des revenus en dessous de la limite établie",
                "3. Ne pas posséder une habitation",
                "4. Répondre aux exigences spécifiques du programme"
              ],
              links: [
                {
                  text: "Exigences Détaillées",
                  url: "https://www.bchousing.org/housing-assistance/rental-housing/subsidized-housing/eligibility"
                },
                {
                  text: "Calculatrice de Revenus",
                  url: "https://www.bchousing.org/housing-assistance/rental-housing/subsidized-housing/income-calculator"
                }
              ],
              additionalInfo: "Les limites de revenu varient en fonction de la taille de la famille et de la localisation. Il est recommandé de vérifier les limites actuelles sur le site web de BC Housing."
            }
          }
        }
      ]
    },
    education: {
      name: {
        en: "Education",
        es: "Educación",
        fr: "Éducation"
      },
      description: {
        en: "Information about the education system, enrollment, and programs in BC",
        es: "Información sobre el sistema educativo, inscripciones y programas en BC",
        fr: "Informations sur le système éducatif, les inscriptions et les programmes en Colombie-Britannique"
      },
      questions: [
        {
          patterns: {
            en: [
              "How do I enroll my child in a public school in BC?",
              "school enrollment process",
              "register child in school",
              "public school registration"
            ],
            es: [
              "¿Cómo inscribo a mi hijo en una escuela pública en BC?",
              "inscripción escuela pública",
              "registrar hijo en escuela",
              "proceso de inscripción escolar"
            ],
            fr: [
              "Comment inscrire mon enfant à l'école publique en Colombie-Britannique ?",
              "processus d'inscription à l'école",
              "inscrire l'enfant à l'école",
              "inscription à l'école"
            ]
          },
          response: {
            en: {
              main: "To enroll your child in a public school in BC, follow these steps:",
              details: [
                "1. Contact your local school",
                "2. Provide identity and residence documents",
                "3. Complete the registration form",
                "4. Provide vaccination records"
              ],
              links: [
                {
                  text: "Registration Guide",
                  url: "https://www2.gov.bc.ca/gov/content/education-training/k-12/support"
                },
                {
                  text: "Find Your School",
                  url: "https://www2.gov.bc.ca/gov/content/education-training/k-12/support/school-finder"
                }
              ],
              additionalInfo: "It's important to register your child as early as possible, especially if you plan to start in September. Schools may have waiting lists."
            },
            es: {
              main: "Para inscribir a tu hijo en una escuela pública en BC, sigue estos pasos:",
              details: [
                "1. Contacta a la escuela de tu zona",
                "2. Proporciona documentos de identidad y residencia",
                "3. Completa el formulario de inscripción",
                "4. Proporciona registros de vacunación"
              ],
              links: [
                {
                  text: "Guía de Inscripción",
                  url: "https://www2.gov.bc.ca/gov/content/education-training/k-12/support"
                },
                {
                  text: "Encuentra tu Escuela",
                  url: "https://www2.gov.bc.ca/gov/content/education-training/k-12/support/school-finder"
                }
              ],
              additionalInfo: "Es importante inscribir a tu hijo lo antes posible, especialmente si planeas comenzar en septiembre. Las escuelas pueden tener listas de espera."
            },
            fr: {
              main: "Pour inscrire votre enfant à l'école publique en Colombie-Britannique, suivez ces étapes :",
              details: [
                "1. Contactez votre école locale",
                "2. Fournissez les documents d'identité et de résidence",
                "3. Remplissez le formulaire d'inscription",
                "4. Fournissez les relevés de vaccination"
              ],
              links: [
                {
                  text: "Guide d'Inscription",
                  url: "https://www2.gov.bc.ca/gov/content/education-training/k-12/support"
                },
                {
                  text: "Trouvez Votre École",
                  url: "https://www2.gov.bc.ca/gov/content/education-training/k-12/support/school-finder"
                }
              ],
              additionalInfo: "Il est important d'inscrire votre enfant le plus tôt possible, surtout si vous prévoyez commencer en septembre. Les écoles peuvent avoir des listes d'attente."
            }
          }
        }
      ]
    },
    transportation: {
      name: "Transporte",
      questions: [
        {
          patterns: [
            "¿Cómo sacar la tarjeta Compass para el transporte público?",
            "How do I get a Compass Card for public transit?",
            "obtener tarjeta compass",
            "get compass card"
          ],
          response: "Para obtener una tarjeta Compass:\n1. Visita un centro de servicio de Compass\n2. Compra la tarjeta ($6)\n3. Carga saldo inicial\n4. Registra tu tarjeta en línea\n\nDetalles: https://www.translink.ca/fares-and-passes/compass-card"
        }
        // ... más preguntas de transporte
      ]
    }
    // ... más categorías
  }
};

module.exports = qaConfig; 