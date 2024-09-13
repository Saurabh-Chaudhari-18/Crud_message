const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

// Create a new post
router.post("/create", async (req, res) => {
  const { name, message } = req.body;
  try {
    const newPost = new Post({ name, message });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a post
router.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { name, message } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { name, message },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a post
router.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
