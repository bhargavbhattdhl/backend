// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load data
const usersFilePath = path.join(__dirname, 'data', 'users.json');
const lessonsFilePath = path.join(__dirname, 'data', 'lessons.json');

// Helper functions to read and write JSON files
const readJSONFile = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const writeJSONFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const lessonRoutes = require('./routes/lessonRoutes');
app.use('/api/lessons', lessonRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));