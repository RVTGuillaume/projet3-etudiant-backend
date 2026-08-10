const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route racine
app.get('/', (req, res) => {
  res.json({ message: 'API Etudiant - operationnelle' });
});

// Routes API directement dans le fichier principal
// Route pour récupérer tous les étudiants
app.get('/api/etudiants', async (req, res) => {
  try {
    // Ici vous pouvez ajouter votre logique MongoDB plus tard
    res.json({ success: true, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route pour créer un étudiant
app.post('/api/etudiants', async (req, res) => {
  try {
    // Ici vous pouvez ajouter votre logique d'ajout plus tard
    res.json({ success: true, message: 'Etudiant ajoute avec succes' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Serveur demarre sur le port ' + PORT);
});
