const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./Models/User"); // Import User Model
const Album = require("./Models/spocomform"); // Import Album Model

const app = express();
app.use(cors());
app.use(express.json());

// 1. LOGIN ROUTE (Checks DB for user)
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.json({ success: true, userId: user._id });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET USER ALBUMS (Filters by userId)
app.get("/api/albums/:userId", async (req, res) => {
  try {
    const userAlbums = await Album.find({ userId: req.params.userId });
    res.json(userAlbums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Your existing connection and setup...
mongoose.connect("your_mongodb_connection_string")
  .then(() => console.log("MongoDB Connected"));

const saveAlbum = require('./API/save');
app.use("/save", saveAlbum);

app.listen(5000, () => console.log("Server running on port 5000"));