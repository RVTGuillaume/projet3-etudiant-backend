const Student = require('../models/Student');
const cloudinary = require('../config/cloudinary');

// Obtenir tous les etudiants
exports.getAllEtudiants = async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Rechercher des etudiants par nom
exports.searchEtudiants = async (req, res) => {
  try {
    const { nom } = req.query;
    const query = nom ? { nom: new RegExp(nom, 'i') } : {};
    const students = await Student.find(query);
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Creer un etudiant
exports.createEtudiant = async (req, res) => {
  try {
    const { idetudiant, nom, datenais } = req.body;
    let photo = '';

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      photo = result.secure_url;
    }

    const student = await Student.create({
      idetudiant,
      nom,
      datenais,
      photo
    });

    res.status(201).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Modifier un etudiant
exports.updateEtudiant = async (req, res) => {
  try {
    const { id } = req.params;
    const { idetudiant, nom, datenais } = req.body;
    let updateData = { idetudiant, nom, datenais };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.photo = result.secure_url;
    }

    const student = await Student.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ success: false, error: 'Etudiant non trouve' });
    }

    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Supprimer un etudiant
exports.deleteEtudiant = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ success: false, error: 'Etudiant non trouve' });
    }

    res.json({ success: true, message: 'Etudiant supprime' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
