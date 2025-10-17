// server/src/routes/rabPekerjaan.js
const express = require('express');
const router = express.Router();
const rabPekerjaanController = require('../controller/rabPekerjaanController');

// GET all pekerjaan
router.get('/', rabPekerjaanController.getAllPekerjaan);

// GET pekerjaan by id
router.get('/:id', rabPekerjaanController.getPekerjaanById);

// POST create new pekerjaan
router.post('/', rabPekerjaanController.createPekerjaan);

// PUT update pekerjaan
router.put('/:id', rabPekerjaanController.updatePekerjaan);

// DELETE pekerjaan
router.delete('/:id', rabPekerjaanController.deletePekerjaan);

module.exports = router;
