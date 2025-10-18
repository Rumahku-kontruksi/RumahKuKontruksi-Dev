// routes/rabRoutes.js
const express = require('express');
const router = express.Router();
const rabController = require('../controller/rabController');

// GET semua RAB
router.get('/', rabController.getAllRAB);

// GET RAB by ID
router.get('/:id', rabController.getRABById);

// POST buat RAB baru
router.post('/', rabController.createRAB);

// PUT update RAB
router.put('/:id', rabController.updateRAB);

// DELETE RAB
router.delete('/:id', rabController.deleteRAB);

module.exports = router;
