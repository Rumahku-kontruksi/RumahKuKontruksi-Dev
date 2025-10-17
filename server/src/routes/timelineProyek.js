// server/src/routes/timelineProyek.js
const express = require('express');
const router = express.Router();
const timelineController = require('../controller/timelineProyekController');

// GET all timeline
router.get('/', timelineController.getAllTimeline);

// GET timeline by id
router.get('/:id', timelineController.getTimelineById);

// POST create new timeline
router.post('/', timelineController.createTimeline);

// PUT update timeline
router.put('/:id', timelineController.updateTimeline);

// DELETE timeline
router.delete('/:id', timelineController.deleteTimeline);

module.exports = router;
