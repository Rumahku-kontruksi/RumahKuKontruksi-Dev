// server/src/routes/rab.js
const express = require('express');
const router = express.Router();
const rabController = require('../controller/rabController');

// GET all RAB
router.get('/', rabController.getAllRAB);

// GET RAB by id
router.get('/:id', rabController.getRABById);

// POST create new RAB
router.post('/', rabController.createRAB);

// PUT update RAB
router.put('/:id', rabController.updateRAB);

// DELETE RAB
router.delete('/:id', rabController.deleteRAB);

module.exports = router;
