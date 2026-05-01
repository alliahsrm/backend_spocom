const express = require("express");
const router = express.Router();
const Album = require("../Models/spocomform");

// CREATE album
router.post("/", async (req, res) => {
  try {
    const album = new Album(req.body);
    const saved = await album.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all albums
router.get("/", async (req, res) => {
  try {
    const albums = await Album.find().sort({ createdAt: -1 });
    res.json(albums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE album
router.put("/:id", async (req, res) => {
  try {
    const updated = await Album.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE album
router.delete("/:id", async (req, res) => {
  try {
    await Album.findByIdAndDelete(req.params.id);
    res.json({ message: "Album deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;