const Message = require('../models/Message');
const User = require('../models/User');

// @desc    Send a message
// @route   POST /api/messages/send
// @access  Private
const sendMessage = async (req, res) => {
    const { receiverId, text } = req.body;
    const senderId = req.user._id;
  
    try {
      // Check if the receiver is a friend
      const sender = await User.findById(senderId);
      if (!sender.friends.includes(receiverId)) {
        return res.status(403).json({ message: 'You can only message friends' });
      }
  
      // Save the message to the database
      const message = await Message.create({
        sender: senderId,
        receiver: receiverId,
        text,
      });
  
      // Emit the message to the receiver using Socket.IO
      const io = req.app.get('io'); // Access io from the app object
      io.to(receiverId).emit('receiveMessage', message);
      console.log(`Message emitted to receiver: ${receiverId}`); // Debug log
  
      res.status(201).json(message);
    } catch (error) {
      console.error('Error sending message:', error); // Log the error for debugging
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  }; 

// @desc    Get messages between two users
// @route   GET /api/messages/:userId
// @access  Private
const getMessages = async (req, res) => {
  const senderId = req.user._id;
  const receiverId = req.params.userId;

  try {
    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { sendMessage, getMessages };