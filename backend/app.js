const express = require('express');
const cors = require('cors');
const path = require('path');
const chatRoutes = require('./routes/chatRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: ['https://urb-civ-frontend.onrender.com', 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());

// Rutas de la API
app.use('/api/chat', chatRoutes);

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Para cualquier otra ruta, servir el index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something broke!'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 