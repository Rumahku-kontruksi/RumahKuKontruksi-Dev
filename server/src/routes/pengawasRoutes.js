const express = require('express');
const router = express.Router();
const pengawasController = require('../controller/pengawasController');

// GET semua pengawas
router.get('/', pengawasController.getAllPengawas);

// GET pengawas by ID
router.get('/:id', pengawasController.getPengawasById);

// POST buat pengawas baru
router.post('/', pengawasController.createPengawas);

// PUT update pengawas
router.put('/:id', pengawasController.updatePengawas);

// DELETE pengawas
router.delete('/:id', pengawasController.deletePengawas);

module.exports = router;
