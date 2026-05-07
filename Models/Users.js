// Models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // In a real app, use bcrypt to hash this!
});

module.exports = mongoose.model("User", UserSchema);