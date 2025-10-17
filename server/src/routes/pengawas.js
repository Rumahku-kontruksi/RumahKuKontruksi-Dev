// server/src/routes/pengawas.js
const express = require('express');
const router = express.Router();
const pengawasController = require('../controller/pengawasController');

// GET all pengawas
router.get('/', pengawasController.getAllPengawas);

// GET pengawas by id
router.get('/:id', pengawasController.getPengawasById);

// POST create new pengawas
router.post('/', pengawasController.createPengawas);

// PUT update pengawas
router.put('/:id', pengawasController.updatePengawas);

// DELETE pengawas
router.delete('/:id', pengawasController.deletePengawas);

module.exports = router;
