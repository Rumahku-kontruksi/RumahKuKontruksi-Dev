const express = require('express');
const router = express.Router();
const rabPekerjaanController = require('../controller/rabPekerjaanController');

// GET semua pekerjaan RAB
router.get('/', rabPekerjaanController.getAllRABPekerjaan);

// GET pekerjaan RAB by ID
router.get('/:id', rabPekerjaanController.getRABPekerjaanById);

// POST buat pekerjaan baru
router.post('/', rabPekerjaanController.createRABPekerjaan);

// PUT update pekerjaan
router.put('/:id', rabPekerjaanController.updateRABPekerjaan);

// DELETE pekerjaan
router.delete('/:id', rabPekerjaanController.deleteRABPekerjaan);

module.exports = router;
