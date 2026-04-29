const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para procesar datos JSON y servir archivos estáticos
app.use(express.json());
app.use(express.static('public'));

// Base de datos temporal en memoria
let baseDeDatosComentarios = [
  { nombre: "Edwing", mensaje: "¡Excelente inicio de proyecto tecnológico!", fecha: "2026-04-28" }
];

// Endpoint para obtener comentarios (GET)
app.get('/api/comentarios', (req, res) => {
  res.json(baseDeDatosComentarios);
});

// Endpoint para recibir comentarios (POST)
app.post('/api/comentarios', (req, res) => {
  const { nombre, mensaje } = req.body;
  
  if (nombre && mensaje) {
    const nuevoComentario = {
      nombre,
      mensaje,
      fecha: new Date().toLocaleDateString()
    };
    baseDeDatosComentarios.push(nuevoComentario);
    return res.status(201).json({ success: true, comentario: nuevoComentario });
  }
  
  res.status(400).json({ success: false, error: "Datos incompletos" });
});

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});