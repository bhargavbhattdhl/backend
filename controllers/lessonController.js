// backend/controllers/lessonController.js
const fs = require('fs');
const path = require('path');

const lessonsFilePath = path.join(__dirname, '../data', 'lessons.json');

// Helper functions to read and write JSON files
const readJSONFile = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Get all lessons
exports.getLessons = async (req, res) => {
  try {
    const lessons = readJSONFile(lessonsFilePath);
    res.json(lessons);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Get lesson by ID
exports.getLessonById = async (req, res) => {
  try {
    const lessons = readJSONFile(lessonsFilePath);
    const lesson = lessons.find(lesson => lesson.id === parseInt(req.params.id));
    if (!lesson) return res.status(404).json({ msg: 'Lesson not found' });
    res.json(lesson);
  } catch (err) {
    res.status(500).send('Server error');
  }
};