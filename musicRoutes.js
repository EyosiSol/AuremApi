const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;

const musicRoutes = express.Router();
//GET MUSICS with Search or Not

musicRoutes.route("/musics").get(async (req, res) => {
  const search = req.query.q?.trim(); // <- updated to extract `q`
  console.log("Search:", search);

  try {
    const db = database.getDb();
    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { artist: { $regex: search, $options: "i" } },
          { album: { $regex: search, $options: "i" } },
        ],
      };
    }

    const data = await db.collection("musics").find(query).toArray();
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
