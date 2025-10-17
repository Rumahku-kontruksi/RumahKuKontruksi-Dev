// server/src/routes/konsumen.js
const express = require('express');
const router = express.Router();
const konsumenController = require('../controller/konsumenController');

// GET all konsumen
router.get('/', konsumenController.getAllKonsumen);

// GET konsumen by id
router.get('/:id', konsumenController.getKonsumenById);

// POST create new konsumen
router.post('/', konsumenController.createKonsumen);

// PUT update konsumen
router.put('/:id', konsumenController.updateKonsumen);

// DELETE konsumen
router.delete('/:id', konsumenController.deleteKonsumen);

module.exports = router;

