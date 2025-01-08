// backend/routes/lessonRoutes.js
const express = require('express');
const router = express.Router();
const { getLessons, getLessonById } = require('../controllers/lessonController');

router.get('/', getLessons);
router.get('/:id', getLessonById);

module.exports = router;