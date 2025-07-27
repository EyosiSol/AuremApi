const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;

const musicRoutes = express.Router();

// GET all musics
musicRoutes.route("/musics").get(async (req, res) => {
  console.log("you hit me mam");
  try {
    const db = database.getDb();
    const data = await db.collection("musics").find({}).toArray();
    if (data.length > 0) {
      res.json(data);
    } else {
      res.status(404).json({ message: "No musics found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = musicRoutes;
