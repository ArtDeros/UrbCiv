# UrbCiv Chat

Un chatbot inteligente para asistencia ciudadana, desarrollado con React, Node.js y Firebase.

## Características

- 💬 Chat interactivo en tiempo real
- 🌐 Soporte multilingüe (Español/Inglés)
- 🤖 Procesamiento de lenguaje natural
- 📊 Análisis de calidad y sesgo
- 🔍 Sugerencias contextuales
- 💾 Persistencia de conversaciones
- 📱 Interfaz responsive

## Tecnologías

- Frontend: React, TypeScript, Chakra UI
- Backend: Node.js, Express
- Base de datos: Firebase
- NLP: Natural
- Despliegue: Vercel

## Configuración del Entorno

1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/chatbot-gobierno.git
cd chatbot-gobierno
```

2. Instalar dependencias
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Configurar variables de entorno
Crear archivo `.env` en la carpeta backend con:
```
FIREBASE_PROJECT_ID=tu-project-id
FIREBASE_PRIVATE_KEY=tu-private-key
FIREBASE_CLIENT_EMAIL=tu-client-email
FIREBASE_DATABASE_URL=tu-database-url
```

4. Iniciar desarrollo
```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

## Estructura del Proyecto

```
chatbot-gobierno/
├── frontend/          # Aplicación React
├── backend/           # Servidor Node.js
├── .gitignore        # Archivos ignorados por git
└── vercel.json       # Configuración de Vercel
```

## Licencia

MIT 