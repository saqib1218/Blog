const Blog = require("../models/Blog");
const User = require("../models/User");

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Private
const createBlog = async (req, res) => {
  const { description, tags,title } = req.body;
  const image = req.file ? req.file.path : ""; 

  try {
    const blog = await Blog.create({
      title,
      description,
      image,
      tags: tags.split(","),
      author: req.user._id, 
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email"); // Populate author details
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get a single blog by ID
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email"
    ).populate({
      path: "comments.user",
      select: "name", 
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
// @desc    Get all blogs of the logged-in user
// @route   GET /api/blogs/me/my
// @access  Private
const getMyBlogs = async (req, res) => {
  try {
    console.log("Logged-in user ID:", req.user._id); // Log the user ID

    // Fetch all blogs where the author is the logged-in user
    const blogs = await Blog.find({ author: req.user._id }).populate(
      "author",
      "name"
    );

    console.log("Blogs found:", blogs); // Log the blogs
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error in getMyBlogs:", error.stack); // Log the full error stack trace
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private
const updateBlog = async (req, res) => {
  const { description, tags,title } = req.body;
  const image = req.file ? req.file.path : ""; // Get the file path if an image is uploaded

  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the logged-in user is the author of the blog
    if (blog.author.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this blog" });
    }

    // Update the blog fields
    blog.title=title || blog.title;
    blog.description = description || blog.description;
    blog.image = image || blog.image;
    blog.tags = tags.split(",") || blog.tags.split(",");

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the logged-in user is the author of the blog
    if (blog.author.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this blog" });
    }

    await blog.deleteOne(); // Use deleteOne() instead of remove()
    res.status(200).json({ message: "Blog deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error); // Log the error
    res.status(500).json({ message: "Server Error Delete blog", error: error.message });
  }
};
// @desc    Add a comment to a blog
// @route   POST /api/blogs/:id/comments
// @access  Private
const addComment = async (req, res) => {
  const { text } = req.body;
  const blogId = req.params.id;
  const userId = req.user._id;
  const userName = req.user.name;

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Create a new comment
    const newComment = {
      user: userId,
      text,
      name: userName,
    };

    // Add the comment to the blog
    blog.comments.push(newComment);
    await blog.save();

    res.status(201).json(blog.comments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Export the controller functions
module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getMyBlogs,
  addComment,
};
