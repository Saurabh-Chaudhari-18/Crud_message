const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');
require('dotenv').config();

const app = express();
app.use(
  cors({
    origin: '*', // Update with your frontend URL during production
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Use post routes
app.use('/api/posts', postRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
