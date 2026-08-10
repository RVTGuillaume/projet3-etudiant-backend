const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

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

// Afficher toutes les routes enregistrées
console.log('Routes disponibles :');
app._router.stack.forEach((layer) => {
  if (layer.route) {
    console.log(layer.route.path);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Serveur demarre sur le port ' + PORT);
  console.log('URL: http://0.0.0.0:' + PORT);
});
