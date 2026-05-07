// Models/spocomform.js
const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  spotifyLink: String,
  albumTitle: String,
  artist: String,
  favSong: String,
  rating: Number,
  comment: String,
  cover: String
});

module.exports = mongoose.model("Album", AlbumSchema);