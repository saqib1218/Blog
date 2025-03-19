const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog,getMyBlogs,addComment } = require('../controllers/blogControllers');
const upload = require('../middleware/upload'); // Import the upload middleware
const parseFormData = require('../middleware/upload'); 
const router = express.Router();

// Public routes
router.get('/',protect, getBlogs);
router.get('/:id',protect, getBlogById);
router.get('/me/my', protect, getMyBlogs);
router.post('/', protect,parseFormData, createBlog); 
router.put('/:id', protect,parseFormData, updateBlog); 
router.delete('/delete/:id', protect, deleteBlog);
// Add comment route
router.post('/:id/comments', protect, addComment);
module.exports = router;