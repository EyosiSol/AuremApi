const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;

const musicRoutes = express.Router();

// READ | GET MUSICS with Search or Not
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

// CREATE
musicRoutes.route("/musics").post(async (req, res) => {
  try {
    const db = database.getDb();
    let data = {
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      releaseDate: req.body.releaseDate,
      genre: req.body.genre,
    };
    let result = await db.collection("musics").insertOne(data);
    res.json(result);
  } catch (err) {
    res.status(401).json({ err: err.message });
  }
});

// UPDATE | PATCH & PUT
musicRoutes.route("/musics/:id").put(async (req, res) => {
  try {
    const db = database.getDb();
    let data = {
      $set: {
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        releaseDate: req.body.releaseDate,
        genre: req.body.genre,
      },
    };
    let result = await db
      .collection("musics")
      .updateOne({ _id: new ObjectId(req.params.id) }, data);
    res.json(result);
  } catch (err) {
    res.status(401).json({ err: err.message });
  }
});

musicRoutes.route("/musics/:id").patch(async (req, res) => {
  try {
    const db = database.getDb();
    let data = {
      $set: {
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        releaseDate: req.body.releaseDate,
        genre: req.body.genre,
      },
    };
    let result = await db
      .collection("musics")
      .updateOne({ _id: new ObjectId(req.params.id) }, data);
    res.json(result);
  } catch (err) {
    res.status(401).json({ err: err.message });
  }
});

// Delete

musicRoutes.route("/musics/:id").delete(async (req, res) => {
  try {
    const db = database.getDb();
    let result = await db
      .collection("musics")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (err) {
    res.status(401).json({ err: err.message });
  }
});

module.exports = musicRoutes;
