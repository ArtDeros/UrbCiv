const admin = require('firebase-admin');
require('dotenv').config();

// Inicializar Firebase Admin con configuración básica
admin.initializeApp({
  projectId: 'chatbot-gobierno',
  databaseURL: 'https://chatbot-gobierno.firebaseio.com'
});

const db = admin.firestore();

module.exports = { admin, db };