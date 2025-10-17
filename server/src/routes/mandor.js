const express = require('express');
const router = express.Router();
const mandorController = require('../controller/mandorController');

router.get('/', mandorController.getAllMandor);
router.get('/:id', mandorController.getMandorById);
router.post('/', mandorController.createMandor);
router.put('/:id', mandorController.updateMandor);
router.delete('/:id', mandorController.deleteMandor);

module.exports = router;
