const express = require('express');
const router = express.Router();
const { getAllKonsumen, getKonsumenByJenis } = require('../controller/konsumenController');

// Semua konsumen
router.get('/', getAllKonsumen);

// Konsumen berdasarkan jenis
router.get('/:jenis', getKonsumenByJenis);

module.exports = router;
