const express = require('express');
const router = express.Router();
const { processMessage, getSessionHistory } = require('../controllers/chatController');

// Ruta para procesar mensajes
router.post('/message', processMessage);

// Ruta para obtener el historial de la sesión
router.get('/session/:sessionId', getSessionHistory);

module.exports = router; 