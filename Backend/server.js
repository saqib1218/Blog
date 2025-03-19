const app = require('./app');
const PORT = process.env.PORT || 5000;
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);

// Socket.IO CORS Configuration
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
  },
});

// Attach io to the app for use in controllers
app.set('io', io);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join a room based on user ID
  socket.on('joinRoom', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});