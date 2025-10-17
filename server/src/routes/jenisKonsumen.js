const express = require('express');
const router = express.Router();
const jenisKonsumenController = require('../controller/jenisKonsumenController');

// Semua operasi menggunakan :jenis (perseorangan / perusahaan)
router.get('/:jenis', jenisKonsumenController.getAllKonsumenByJenis);
router.get('/:jenis/:id', jenisKonsumenController.getKonsumenByIdAndJenis);
router.post('/:jenis', jenisKonsumenController.createKonsumen);
router.put('/:jenis/:id', jenisKonsumenController.updateKonsumen);
router.delete('/:jenis/:id', jenisKonsumenController.deleteKonsumen);

module.exports = router;
