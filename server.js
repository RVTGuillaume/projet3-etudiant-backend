require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const etudiantRoutes = require('./routes/etudiantRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/etudiants', etudiantRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API Etudiant - operationnelle' });
});

const PORT = process.env.PORT || 3000;

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
