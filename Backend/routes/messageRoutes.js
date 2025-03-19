const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  sendMessage,
  getMessages,
} = require('../controllers/messageControllers');

const router = express.Router();

// Send a message
router.post('/send', protect, sendMessage);

// Get messages between two users
router.get('/:userId', protect, getMessages);

module.exports = router;