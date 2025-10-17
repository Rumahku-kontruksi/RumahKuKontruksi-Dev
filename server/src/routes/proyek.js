const express = require('express');
const router = express.Router();
const proyekController = require('../controller/proyekController');

router.get('/', proyekController.getAllProyek);
router.get('/:id', proyekController.getProyekById);
router.post('/', proyekController.createProyek);
router.put('/:id', proyekController.updateProyek);
router.delete('/:id', proyekController.deleteProyek);

module.exports = router;

