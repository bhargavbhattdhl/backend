// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProgress } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/progress/:userId', getUserProgress);

module.exports = router;