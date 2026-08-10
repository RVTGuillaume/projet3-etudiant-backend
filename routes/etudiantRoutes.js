const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiantController');
const upload = require('../middleware/upload');

// Routes CRUD
router.get('/', etudiantController.getAllEtudiants);
router.get('/search', etudiantController.searchEtudiants);
router.post('/', upload.single('photo'), etudiantController.createEtudiant);
router.put('/:id', upload.single('photo'), etudiantController.updateEtudiant);
router.delete('/:id', etudiantController.deleteEtudiant);

module.exports = router;
