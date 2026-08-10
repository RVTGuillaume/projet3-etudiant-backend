const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Etudiant - operationnelle' });
});

app.get('/api/etudiants', (req, res) => {
  res.json({ success: true, data: [] });
});

app.post('/api/etudiants', (req, res) => {
  res.json({ success: true, message: 'Etudiant ajoute avec succes' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Serveur Express demarre sur le port ' + PORT);
});
