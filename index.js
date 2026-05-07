const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./Models/Users"); // Ensure this file exists
const Album = require("./Models/spocomform"); // Ensure this file exists

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://alliahsrm:happybirthday@ac-pvsdhso-shard-00-00.neffb5j.mongodb.net:27017,ac-pvsdhso-shard-00-01.neffb5j.mongodb.net:27017,ac-pvsdhso-shard-00-02.neffb5j.mongodb.net:27017/?ssl=true&replicaSet=atlas-m7bzb9-shard-0&authSource=admin&appName=spocomdb")
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => {
    console.error("MongoDB error:", error.message);
    process.exit(1);
  });

// --- AUTHENTICATION ROUTES ---

// 1. Sign Up Route
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username already taken" });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ success: true, message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Login Route
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
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- ALBUM ROUTES ---

// 3. Get Albums for a Specific User
app.get("/api/albums/:userId", async (req, res) => {
  try {
    const userAlbums = await Album.find({ userId: req.params.userId });
    res.json(userAlbums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Import and use your existing save/delete logic
// Ensure your 'save.js' is updated to handle the userId in the request body
const saveAlbum = require('./API/save');
app.use("/save", saveAlbum);

// Base Route
app.get("/", (req, res) => {
  res.send("SpoCom Backend is running and connected to MongoDB!");
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});