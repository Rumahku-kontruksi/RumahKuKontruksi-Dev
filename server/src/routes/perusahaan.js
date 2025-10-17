// server/src/routes/perusahaan.js
const express = require('express');
const router = express.Router();
const perusahaanController = require('../controller/perusahaanController');

// GET all perusahaan
router.get('/', perusahaanController.getAllPerusahaan);

// GET perusahaan by id
router.get('/:id', perusahaanController.getPerusahaanById);

// POST create new perusahaan
router.post('/', perusahaanController.createPerusahaan);

// PUT update perusahaan
router.put('/:id', perusahaanController.updatePerusahaan);

// DELETE perusahaan
router.delete('/:id', perusahaanController.deletePerusahaan);

module.exports = router;
