import { getDb } from "../config/db.js";
import mongo from "mongodb";

const ObjectId = mongo.ObjectId;

export const GetMusic = async (req, res) => {
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
};

export const AddMusic = async (req, res) => {
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
};

export const UpdateMusic = async (req, res) => {
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
};

export const DeleteMusic = async (req, res) => {
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
};
