const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.get("/", (req, res) => {
  res.send("Backend is officially running!");
});

//to mongodb
mongoose
  .connect("mongodb://alliahsrm:happybirthday@ac-iq2xxjs-shard-00-00.eloblkc.mongodb.net:27017,ac-iq2xxjs-shard-00-01.eloblkc.mongodb.net:27017,ac-iq2xxjs-shard-00-02.eloblkc.mongodb.net:27017/?ssl=true&replicaSet=atlas-tzl0ct-shard-0&authSource=admin&appName=spocomDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => {
    console.error("MongoDB error:", error.message);
    process.exit(1);
  });

//middleware
app.use(cors());
app.use(express.json());

//import API
const saveAlbum = require('./API/save')

//use api
app.use("/save", saveAlbum);

//start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});