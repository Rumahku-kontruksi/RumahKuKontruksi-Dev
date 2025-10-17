// server/src/routes/pengawas.js

const express = require('express');
const router = express.Router();
const pengawasController = require('../controller/pengawasController');

router.get('/', pengawasController.getAllPengawas);
router.get('/:id', pengawasController.getPengawasById);
router.post('/', pengawasController.createPengawas);
router.put('/:id', pengawasController.updatePengawas);
router.delete('/:id', pengawasController.deletePengawas);

module.exports = router;
