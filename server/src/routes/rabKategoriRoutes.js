const express = require('express');
const router = express.Router();
const rabKategoriController = require('../controller/rabKategoriController');

// GET semua kategori RAB
router.get('/', rabKategoriController.getAllRABKategori);

// GET kategori RAB by ID
router.get('/:id', rabKategoriController.getRABKategoriById);

// POST buat kategori baru
router.post('/', rabKategoriController.createRABKategori);

// PUT update kategori
router.put('/:id', rabKategoriController.updateRABKategori);

// DELETE kategori
router.delete('/:id', rabKategoriController.deleteRABKategori);

module.exports = router;
