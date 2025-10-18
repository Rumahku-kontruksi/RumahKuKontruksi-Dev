const express = require('express');
const router = express.Router();
const mandorController = require('../controller/mandorController');

// GET semua mandor
router.get('/', mandorController.getAllMandor);

// GET mandor by ID
router.get('/:id', mandorController.getMandorById);

// POST buat mandor baru
router.post('/', mandorController.createMandor);

// PUT update mandor
router.put('/:id', mandorController.updateMandor);

// DELETE mandor
router.delete('/:id', mandorController.deleteMandor);

module.exports = router;
