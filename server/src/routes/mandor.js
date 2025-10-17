// server/src/routes/mandor.js
const express = require('express');
const router = express.Router();
const mandorController = require('../controller/mandorController');

// GET all mandor
router.get('/', mandorController.getAllMandor);

// GET mandor by id
router.get('/:id', mandorController.getMandorById);

// POST create new mandor
router.post('/', mandorController.createMandor);

// PUT update mandor
router.put('/:id', mandorController.updateMandor);

// DELETE mandor
router.delete('/:id', mandorController.deleteMandor);

module.exports = router;
