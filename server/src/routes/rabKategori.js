// server/src/routes/rabKategori.js
const express = require('express');
const router = express.Router();
const rabKategoriController = require('../controller/rabKategoriController');

// GET all kategori
router.get('/', rabKategoriController.getAllKategori);

// GET kategori by id
router.get('/:id', rabKategoriController.getKategoriById);

// POST create new kategori
router.post('/', rabKategoriController.createKategori);

// PUT update kategori
router.put('/:id', rabKategoriController.updateKategori);

// DELETE kategori
router.delete('/:id', rabKategoriController.deleteKategori);

module.exports = router;
