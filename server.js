const express = require('express');
const app = express();

// Route de base
app.get('/', (req, res) => {
  res.json({ message: 'API Etudiant - operationnelle' });
});

// Route de test
app.get('/test', (req, res) => {
  res.json({ message: 'Route test fonctionne !' });
});

// Route API étudiants (simulée)
app.get('/api/etudiants', (req, res) => {
  res.json({ success: true, data: [] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Serveur demarre sur le port ' + PORT);
});
