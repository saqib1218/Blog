    const express = require('express');
    const mongoose = require('mongoose');
    const dotenv = require('dotenv');
    const path = require('path');
    const cors = require('cors'); // Import cors
    const authRoutes = require('./routes/authRoutes');
    const blogRoutes = require('./routes/blogRoutes');
    const friendRoutes = require('./routes/friendRoutes');
    const messageRoutes = require('./routes/messageRoutes');
    const connectDB = require('./config/db');

    dotenv.config();

    const app = express();

    // CORS Configuration
    app.use(cors());

    // Middleware
    app.use(express.json());
    app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
    connectDB();

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/blogs', blogRoutes);
    app.use('/api/friends', friendRoutes);
    app.use('/api/messages', messageRoutes);

    // MongoDB Connection
    mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .catch(err => console.log(err));

    module.exports = app;