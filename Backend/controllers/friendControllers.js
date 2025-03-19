// controllers/friendControllers.js
const User = require('../models/User');

// @desc    Send a friend request
// @route   POST /api/friends/request
// @access  Private
const sendFriendRequest = async (req, res) => {
  const { userId } = req.body; // ID of the user to send the request to
  const senderId = req.user._id; // ID of the logged-in user

  try {
    const receiver = await User.findById(userId);
    if (!receiver) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the request already exists
    if (receiver.friendRequests.includes(senderId)) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    // Add the request to the receiver's friendRequests array
    receiver.friendRequests.push(senderId);
    await receiver.save();

    res.status(200).json({ message: 'Friend request sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Accept a friend request
// @route   POST /api/friends/accept
// @access  Private
const acceptFriendRequest = async (req, res) => {
  const { userId } = req.body; // ID of the user who sent the request
  const receiverId = req.user._id; // ID of the logged-in user

  try {
    const sender = await User.findById(userId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the request exists
    if (!receiver.friendRequests.includes(userId)) {
      return res.status(400).json({ message: 'Friend request not found' });
    }

    // Remove the request and add to friends list
    receiver.friendRequests = receiver.friendRequests.filter(
      (id) => id.toString() !== userId.toString()
    );
    receiver.friends.push(userId);
    sender.friends.push(receiverId);

    await receiver.save();
    await sender.save();

    res.status(200).json({ message: 'Friend request accepted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Reject a friend request
// @route   POST /api/friends/reject
// @access  Private
const rejectFriendRequest = async (req, res) => {
  const { userId } = req.body; // ID of the user who sent the request
  const receiverId = req.user._id; // ID of the logged-in user

  try {
    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the request exists
    if (!receiver.friendRequests.includes(userId)) {
      return res.status(400).json({ message: 'Friend request not found' });
    }

    // Remove the request
    receiver.friendRequests = receiver.friendRequests.filter(
      (id) => id.toString() !== userId.toString()
    );

    await receiver.save();

    res.status(200).json({ message: 'Friend request rejected' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get friend requests
// @route   GET /api/friends/requests
// @access  Private
const getFriendRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('friendRequests', 'name email avatar');
    res.status(200).json(user.friendRequests);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get friends list
// @route   GET /api/friends
// @access  Private
const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('friends', 'name email avatar');
    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get suggestions for new friends
// @route   GET /api/friends/suggestions
// @access  Private
const getSuggestions = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const allUsers = await User.find({
      _id: { $ne: user._id, $nin: [...user.friends, ...user.friendRequests] },
    }).select('name email avatar');

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests,
  getFriends,
  getSuggestions,
};