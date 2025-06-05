const { processQuestion } = require('../services/qaService');
const { v4: uuidv4 } = require('uuid');
const { db } = require('../config/firebase');

// Almacenamiento temporal de sesiones (en producción usar una base de datos)
const sessions = new Map();

// Función para obtener o crear una sesión
async function getOrCreateSession(sessionId) {
  if (!sessionId || !sessions.has(sessionId)) {
    sessionId = uuidv4();
    const sessionData = {
      createdAt: new Date(),
      lastActivity: new Date(),
      messages: [],
      userData: {},
      context: {
        currentCategory: null,
        lastQuestion: null,
        lastResponse: null
      }
    };
    sessions.set(sessionId, sessionData);
    
    // Crear documento en Firebase
    try {
      await db.collection('sessions').doc(sessionId).set({
        createdAt: sessionData.createdAt,
        lastActivity: sessionData.lastActivity,
        messages: [],
        userData: {},
        context: sessionData.context
      });
    } catch (error) {
      console.error('Error creating session in Firebase:', error);
    }
  }
  return sessionId;
}

// Función para guardar mensaje en la sesión
async function saveMessage(sessionId, message, response) {
  const session = sessions.get(sessionId);
  if (session) {
    const messageData = {
      timestamp: new Date(),
      userMessage: message,
      botResponse: response,
      category: response.category,
      confidence: response.confidence,
      details: response.details
    };
    
    session.messages.push(messageData);
    session.lastActivity = new Date();
    session.context = {
      ...session.context,
      lastQuestion: message,
      lastResponse: response,
      currentCategory: response.category || session.context.currentCategory
    };
    
    // Guardar en Firebase
    try {
      await db.collection('sessions').doc(sessionId).update({
        messages: db.FieldValue.arrayUnion(messageData),
        lastActivity: session.lastActivity,
        context: session.context
      });
    } catch (error) {
      console.error('Error saving message to Firebase:', error);
    }
  }
}

// Función para procesar el mensaje del usuario
async function processMessage(req, res) {
  try {
    const { message, sessionId: clientSessionId, countryCode, language, userData } = req.body;
    
    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    // Obtener o crear sesión
    const sessionId = await getOrCreateSession(clientSessionId);
    
    // Procesar la pregunta con el contexto actual
    const session = sessions.get(sessionId);
    const response = await processQuestion(
      message, 
      sessionId, 
      countryCode, 
      language,
      session?.context || {}
    );
    
    // Guardar el mensaje y la respuesta
    await saveMessage(sessionId, message, response);
    
    // Enviar respuesta
    res.json({
      ...response,
      sessionId
    });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

// Función para obtener el historial de la sesión
async function getSessionHistory(req, res) {
  try {
    const { sessionId } = req.params;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: 'Session ID is required'
      });
    }

    // Intentar obtener la sesión de Firebase
    try {
      const sessionDoc = await db.collection('sessions').doc(sessionId).get();
      
      if (!sessionDoc.exists) {
        return res.status(404).json({
          success: false,
          error: 'Session not found'
        });
      }

      const sessionData = sessionDoc.data();
      
      res.json({
        success: true,
        session: {
          id: sessionId,
          createdAt: sessionData.createdAt,
          lastActivity: sessionData.lastActivity,
          userData: sessionData.userData,
          messages: sessionData.messages,
          context: sessionData.context
        }
      });
    } catch (error) {
      console.error('Error getting session from Firebase:', error);
      res.status(500).json({
        success: false,
        error: 'Error retrieving session data'
      });
    }
  } catch (error) {
    console.error('Error getting session history:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

// Función para limpiar sesiones antiguas
async function cleanupOldSessions() {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  
  for (const [sessionId, session] of sessions.entries()) {
    if (session.lastActivity < oneDayAgo) {
      sessions.delete(sessionId);
      try {
        await db.collection('sessions').doc(sessionId).delete();
      } catch (error) {
        console.error('Error deleting old session from Firebase:', error);
      }
    }
  }
}

// Ejecutar limpieza cada hora
setInterval(cleanupOldSessions, 60 * 60 * 1000);

module.exports = {
  processMessage,
  getSessionHistory
}; 