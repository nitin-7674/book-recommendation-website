// server/routes/chatRoutes.js
const express = require('express');
const chatController = require('../controllers/chatController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.post('/recommendations', chatController.getRecommendations);

module.exports = router;