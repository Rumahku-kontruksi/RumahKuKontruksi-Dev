// routes/timelineRoutes.js
const express = require('express');
const router = express.Router();
const timelineController = require('../controller/timelineController');

// GET all timelines
router.get('/', timelineController.getAllTimelines);

// GET timeline by id
router.get('/:id', timelineController.getTimelineById);

// CREATE new timeline
router.post('/', timelineController.createTimeline);

// UPDATE timeline
router.put('/:id', timelineController.updateTimeline);

// DELETE timeline
router.delete('/:id', timelineController.deleteTimeline);

module.exports = router;
