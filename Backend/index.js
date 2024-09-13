const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const postRoutes = require("../routes/postRoutes.js");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Use post routes
app.use("/api/posts", postRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
