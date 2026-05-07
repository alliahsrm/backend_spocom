const express = require('express');
const router = express.Router();
const Album = require('../Models/spocomform');

// POST: Save a new album
router.post('/', async (req, res) => {
    try {
        const { userId, spotifyLink, albumTitle, artist, favSong, rating, comment, cover } = req.body;
        
        const newAlbum = new Album({
            userId, // This is the most important part!
            spotifyLink,
            albumTitle,
            artist,
            favSong,
            rating,
            comment,
            cover
        });

        const savedAlbum = await newAlbum.save();
        res.status(201).json(savedAlbum);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT: Update an existing album
router.put('/:id', async (req, res) => {
    try {
        const updatedAlbum = await Album.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(updatedAlbum);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: Remove an album
router.delete('/:id', async (req, res) => {
    try {
        await Album.findByIdAndDelete(req.params.id);
        res.json({ message: "Album deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;