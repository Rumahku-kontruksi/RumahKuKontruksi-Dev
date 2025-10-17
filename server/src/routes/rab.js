const express = require('express');
const router = express.Router();
const rabController = require('../controller/rabController');

// RAB PROYEK
router.get('/proyek', rabController.getAllRabProyek);
router.get('/proyek/:id', rabController.getRabProyekById);
router.post('/proyek', rabController.createRabProyek);
router.put('/proyek/:id', rabController.updateRabProyek);
router.delete('/proyek/:id', rabController.deleteRabProyek);

// RAB KATEGORI
router.get('/kategori', rabController.getAllRabKategori);
router.get('/kategori/:id', rabController.getRabKategoriById);
router.post('/kategori', rabController.createRabKategori);
router.put('/kategori/:id', rabController.updateRabKategori);
router.delete('/kategori/:id', rabController.deleteRabKategori);

// RAB PEKERJAAN
router.get('/pekerjaan', rabController.getAllRabPekerjaan);
router.get('/pekerjaan/:id', rabController.getRabPekerjaanById);
router.post('/pekerjaan', rabController.createRabPekerjaan);
router.put('/pekerjaan/:id', rabController.updateRabPekerjaan);
router.delete('/pekerjaan/:id', rabController.deleteRabPekerjaan);

module.exports = router;
