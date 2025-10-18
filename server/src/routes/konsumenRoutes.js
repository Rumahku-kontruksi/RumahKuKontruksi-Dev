const express = require('express');
const router = express.Router();
const konsumenController = require('../controller/konsumenController');

router.get('/', konsumenController.getAllKonsumen);
router.get('/:id', konsumenController.getKonsumenById);
router.post('/', konsumenController.createKonsumen);
router.put('/:id', konsumenController.updateKonsumen);
router.delete('/:id', konsumenController.deleteKonsumen);

module.exports = router;

