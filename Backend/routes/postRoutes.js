const express = require("express");
const Post = require("../Post");
const { error } = require("server/router");
const router = express.Router();

// Create a new post
router.post("/create", async (req, res) => {
  try {
    const { name, message } = req.body;
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
  try {
    const { name, message } = req.body;
    const updatePost = await Post.findByIdAndUpdate(
      req.params.id,
      { name, message },
      { new: true }
    );
    if (!updatePost) {
      return res.status(404).json({ error: "Post not Found" });
    }
    res.status(200).json(updatePost);
  } catch (error) {
    res.status(500).json({ reeor: error.message });
  }
});

// Delete a post
router.delete("/posts/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
