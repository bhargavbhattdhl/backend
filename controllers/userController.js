// backend/controllers/userController.js
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usersFilePath = path.join(__dirname, '../data', 'users.json');

// Helper functions to read and write JSON files
const readJSONFile = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const writeJSONFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// Register user
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const users = await readJSONFile(usersFilePath);
    const user = users.find(user => user.username === username);
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const newUser = { id: users.length + 1, username, password, progress: {} };
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    users.push(newUser);
    writeJSONFile(usersFilePath, users);

    const payload = { user: { id: newUser.id } };
    jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const users = await readJSONFile(usersFilePath);
    const user = users.find(user => user.username === username);
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Get user progress
exports.getUserProgress = async (req, res) => {
  try {
    const users = await readJSONFile(usersFilePath);
    const user = users.find(user => user.id === parseInt(req.params.userId));
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user.progress);
  } catch (err) {
    res.status(500).send('Server error');
  }
};