const express = require('express');
const router = express.Router();
const perusahaanController = require('../controller/perusahaanController');

// GET semua perusahaan
router.get('/', perusahaanController.getAllPerusahaan);

// GET perusahaan by ID
router.get('/:id', perusahaanController.getPerusahaanById);

// POST perusahaan baru
router.post('/', perusahaanController.createPerusahaan);

// PUT update perusahaan
router.put('/:id', perusahaanController.updatePerusahaan);

// DELETE perusahaan
router.delete('/:id', perusahaanController.deletePerusahaan);

module.exports = router;
