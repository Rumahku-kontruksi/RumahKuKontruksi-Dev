// server/src/routes/timeline.js

const express = require('express');
const router = express.Router();
const timelineController = require('../controller/timelineController');

router.get('/', timelineController.getAllTimeline);
router.get('/:id', timelineController.getTimelineById);
router.post('/', timelineController.createTimeline);
router.put('/:id', timelineController.updateTimeline);
router.delete('/:id', timelineController.deleteTimeline);

module.exports = router;

