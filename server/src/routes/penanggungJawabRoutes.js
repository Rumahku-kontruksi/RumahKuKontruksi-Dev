const express = require('express');
const router = express.Router();
const controller = require('../controller/penanggungJawabController');

// GET semua
router.get('/', controller.getAllPenanggungJawab);

// GET by ID
router.get('/:id', controller.getPenanggungJawabById);

// POST buat baru
router.post('/', controller.createPenanggungJawab);

// PUT update
router.put('/:id', controller.updatePenanggungJawab);

// DELETE hapus
router.delete('/:id', controller.deletePenanggungJawab);

module.exports = router;
