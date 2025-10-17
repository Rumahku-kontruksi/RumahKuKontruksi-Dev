// server/src/routes/perseorangan.js
const express = require('express');
const router = express.Router();
const perseoranganController = require('../controller/perseoranganController');

// GET all perseorangan
router.get('/', perseoranganController.getAllPerseorangan);

// GET perseorangan by id
router.get('/:id', perseoranganController.getPerseoranganById);

// POST create new perseorangan
router.post('/', perseoranganController.createPerseorangan);

// PUT update perseorangan
router.put('/:id', perseoranganController.updatePerseorangan);

// DELETE perseorangan
router.delete('/:id', perseoranganController.deletePerseorangan);

module.exports = router;
