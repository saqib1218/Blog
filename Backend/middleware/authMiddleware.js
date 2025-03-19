const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(' ')[1];
      // console.log('Token:', token); // Log the token

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log('Decoded Token:', decoded); // Log the decoded token

      // Fetch the user from the database
      const user = await User.findById(decoded.id).select('-password');
      // console.log('User from DB:', user); // Log the user

      if (!user) {
        console.error('User not found in database'); // Log the error
        return res.status(404).json({ message: 'User not found' });
      }

      // Attach the user to the request object
      req.user = user;
      next();
    } catch (error) {
      console.error('Token verification failed:', error); // Log the error
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    console.error('No token provided'); // Log the error
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };