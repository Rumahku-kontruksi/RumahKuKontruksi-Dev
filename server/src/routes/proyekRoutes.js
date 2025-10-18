const express = require('express');
const router = express.Router();
const proyekController = require('../controller/proyekController');

// GET semua proyek
router.get('/', proyekController.getAllProyek);

// GET proyek by ID
router.get('/:id', proyekController.getProyekById);

// POST buat proyek baru
router.post('/', proyekController.createProyek);

// PUT update proyek
router.put('/:id', proyekController.updateProyek);

// DELETE proyek
router.delete('/:id', proyekController.deleteProyek);

module.exports = router;
