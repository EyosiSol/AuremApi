import express from "express";
import { getDb } from "../connect.js";
import mongo from "mongodb";

const ObjectId = mongo.ObjectId;
const musicRoutes = express.Router();

// READ | GET MUSICS with Search or Not
musicRoutes.route("/:userId/musics").get(async (req, res) => {
  const { userId } = req.params;
  const search = req.query.q?.trim(); // <- updated to extract `q`

  try {
    const db = getDb();
    let query = { userId };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { artist: { $regex: search, $options: "i" } },
        { album: { $regex: search, $options: "i" } },
      ];
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
musicRoutes.route("/:userId/musics").post(async (req, res) => {
  const { userId } = req.params;
  try {
    const db = getDb();
    let data = {
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      releaseYear: req.body.releaseYear,
      genre: req.body.genre,
      createdAt: new Date(),
      userId: userId,
    };
    let result = await db.collection("musics").insertOne(data);
    res.json(result);
  } catch (err) {
    res.status(401).json({ err: err.message });
  }
});

// UPDATE | PATCH & PUT
musicRoutes.route("/:userId/musics/:musicId").put(async (req, res) => {
  const { userId, musicId } = req.params;
  try {
    const db = getDb();
    let data = {
      $set: {
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        releaseYear: req.body.releaseYear,
        genre: req.body.genre,
      },
    };
    let result = await db
      .collection("musics")
      .updateOne({ _id: new ObjectId(musicId), userId: userId }, data);
    res.json(result);
  } catch (err) {
    res.status(401).json({ err: err.message });
  }
});

musicRoutes.route("/:userId/musics/:musicId").patch(async (req, res) => {
  const { userId, musicId } = req.params;
  try {
    const db = getDb();
    let data = {
      $set: {
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        releaseYear: req.body.releaseYear,
        genre: req.body.genre,
      },
    };
    let result = await db
      .collection("musics")
      .updateOne({ _id: new ObjectId(musicId), userId: userId }, data);
    res.json(result);
  } catch (err) {
    res.status(401).json({ err: err.message });
  }
});

// Delete

musicRoutes.route("/:userId/musics/:musicId").delete(async (req, res) => {
  const { userId, musicId } = req.params;

  try {
    const db = getDb();
    let result = await db
      .collection("musics")
      .deleteOne({ _id: new ObjectId(musicId), userId: userId });
    res.json(result);
  } catch (err) {
    res.status(401).json({ err: err.message });
  }
});

export default musicRoutes;
