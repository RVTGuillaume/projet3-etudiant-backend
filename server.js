require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

console.log('=== DEBUT SERVER ===');

// Importer les routes avec chemin absolu
console.log('Importation des routes...');
const etudiantRoutes = require(path.join(__dirname, 'routes', 'etudiantRoutes'));
console.log('Routes importees avec succes');

const app = express();

console.log('Configuration CORS...');
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

console.log('Enregistrement des routes...');
app.use('/api/etudiants', etudiantRoutes);
console.log('Routes enregistrees');

app.get('/', (req, res) => {
  res.json({ message: 'API Etudiant - operationnelle' });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Route test fonctionne' });
});

console.log('Liste des routes enregistrees:');
app._router.stack.forEach((layer) => {
  if (layer.route) {
    console.log(layer.route.path);
  }
});

const PORT = process.env.PORT || 3000;

console.log('Connexion a MongoDB...');
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connecte a MongoDB Atlas');
    app.listen(PORT, '0.0.0.0', () => {
      console.log('Serveur demarre sur le port ' + PORT);
    });
  })
  .catch((err) => {
    console.error('Erreur de connexion MongoDB :', err.message);
    process.exit(1);
  });
