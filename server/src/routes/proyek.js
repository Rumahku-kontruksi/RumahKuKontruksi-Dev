// server/src/routes/proyek.js
const express = require('express');
const router = express.Router();
const proyekController = require('../controller/proyekController');

// GET all proyek
router.get('/', proyekController.getAllProyek);

// GET proyek by id
router.get('/:id', proyekController.getProyekById);

// POST create new proyek
router.post('/', proyekController.createProyek);

// PUT update proyek
router.put('/:id', proyekController.updateProyek);

// DELETE proyek
router.delete('/:id', proyekController.deleteProyek);

module.exports = router;
