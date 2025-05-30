const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Importar las rutas del backend
const chatRoutes = require('../backend/routes/chatRoutes');
app.use('/api/chat', chatRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something broke!'
  });
});

module.exports = app; 