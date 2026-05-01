const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
  spotifyLink: { type: String },
  albumTitle: { type: String, required: true },
  artist: { type: String, required: true },
  favSong: { type: String },
  rating: { type: Number, required: true },
  comment: { type: String },
  cover: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Album", FormSchema);