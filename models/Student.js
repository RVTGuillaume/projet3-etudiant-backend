const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  idetudiant: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  nom: {
    type: String,
    required: true,
    trim: true
  },
  datenais: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
