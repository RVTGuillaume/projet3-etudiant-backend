const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route racine - pour tester si le serveur r?pond
app.get('/', (req, res) => {
  res.json({ message: 'API Etudiant - operationnelle' });
});

// Routes API
app.get('/api/etudiants', (req, res) => {
  res.json({ success: true, data: [] });
});

app.post('/api/etudiants', (req, res) => {
  res.json({ success: true, message: 'Etudiant ajoute avec succes' });
});

app.put('/api/etudiants/:id', (req, res) => {
  res.json({ success: true, message: 'Etudiant modifie avec succes' });
});

app.delete('/api/etudiants/:id', (req, res) => {
  res.json({ success: true, message: 'Etudiant supprime avec succes' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Serveur demarre sur le port ' + PORT);
});
