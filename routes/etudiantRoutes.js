const express = require('express');
const router = express.Router();
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');
const Etudiant = require('../models/Etudiant');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Seules les images sont acceptees'));
  },
});

function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'etudiants' },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { nom, datenais } = req.body;
    if (!nom || !datenais) {
      return res.status(400).json({ message: 'nom et datenais sont requis' });
    }
    let photoUrl = null;
    let photoPublicId = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      photoUrl = result.secure_url;
      photoPublicId = result.public_id;
    }
    const etudiant = await Etudiant.create({ nom, datenais, photoUrl, photoPublicId });
    res.status(201).json(etudiant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const etudiants = await Etudiant.find().sort({ createdAt: -1 });
    res.json(etudiants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { nom } = req.query;
    if (!nom) return res.status(400).json({ message: 'Parametre nom requis' });
    const etudiants = await Etudiant.find({
      nom: { $regex: nom, $options: 'i' },
    }).sort({ createdAt: -1 });
    res.json(etudiants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.params.id);
    if (!etudiant) return res.status(404).json({ message: 'Etudiant introuvable' });
    res.json(etudiant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.params.id);
    if (!etudiant) return res.status(404).json({ message: 'Etudiant introuvable' });
    const { nom, datenais } = req.body;
    if (nom) etudiant.nom = nom;
    if (datenais) etudiant.datenais = datenais;
    if (req.file) {
      if (etudiant.photoPublicId) {
        await cloudinary.uploader.destroy(etudiant.photoPublicId).catch(() => {});
      }
      const result = await uploadToCloudinary(req.file.buffer);
      etudiant.photoUrl = result.secure_url;
      etudiant.photoPublicId = result.public_id;
    }
    await etudiant.save();
    res.json(etudiant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.params.id);
    if (!etudiant) return res.status(404).json({ message: 'Etudiant introuvable' });
    if (etudiant.photoPublicId) {
      await cloudinary.uploader.destroy(etudiant.photoPublicId).catch(() => {});
    }
    await etudiant.deleteOne();
    res.json({ message: 'Etudiant supprime avec succes' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
