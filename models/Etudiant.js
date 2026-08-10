const mongoose = require('mongoose');

const EtudiantSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, 'Le nom est obligatoire'],
      trim: true,
    },
    datenais: {
      type: Date,
      required: [true, 'La date de naissance est obligatoire'],
    },
    photoUrl: {
      type: String,
      default: null,
    },
    photoPublicId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Etudiant', EtudiantSchema);
