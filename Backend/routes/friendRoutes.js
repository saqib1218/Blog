// routes/friendRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests,
  getFriends,
  getSuggestions,
} = require('../controllers/friendControllers');

const router = express.Router();

// Friend request routes
router.post('/request', protect, sendFriendRequest);
router.post('/accept', protect, acceptFriendRequest);
router.post('/reject', protect, rejectFriendRequest);

// Get friends, requests, and suggestions
router.get('/requests', protect, getFriendRequests);
router.get('/', protect, getFriends);
router.get('/suggestions', protect, getSuggestions);

module.exports = router;