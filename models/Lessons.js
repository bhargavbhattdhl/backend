// backend/models/Lesson.js
const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  quiz: { type: Array, default: [] },
});

module.exports = mongoose.model('Lesson', LessonSchema);