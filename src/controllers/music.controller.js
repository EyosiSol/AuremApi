import mongo from "mongodb";
import Music from "../models/music.model.js";

export const GetMusic = async (req, res) => {
  const { userId } = req.params;
  const search = req.query.q?.trim();

  try {
    let query = { userId };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { artist: { $regex: search, $options: "i" } },
        { album: { $regex: search, $options: "i" } },
      ];
    }

    const data = await Music.find(query);
    console.log("data:", data);
    data.length > 0
      ? res.json(data)
      : res.status(404).json({ message: "no music found" });
  } catch (err) {
    res.status(401).json({ err: err.message });
  }
};

export const AddMusic = async (req, res) => {
  const { userId } = req.params;
  try {
    let data = {
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      releaseYear: req.body.releaseYear,
      genre: req.body.genre,
      userId: userId,
    };
    console.log("data:", data);
    let result = Music.insertOne(data);
    res.json({
      status: 200,
      message: "Created Successfully",
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const UpdateMusic = async (req, res) => {
  const { userId, musicId } = req.params;
  try {
    let data = {
      $set: {
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        releaseYear: req.body.releaseYear,
        genre: req.body.genre,
      },
    };
    const result = await Music.updateOne({ _id: musicId, userId }, data);
    result.modifiedCount > 0
      ? res.json({
          status: 200,
          result: result,
          message: "Updated Successfully",
        })
      : res.json({
          status: 500,
          result: result,
          message: "Updated Failed",
        });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const DeleteMusic = async (req, res) => {
  const { userId, musicId } = req.params;
  try {
    const result = await Music.deleteOne({ _id: musicId, userId });
    result.deletedCount > 0
      ? res.json({
          status: 200,
          result: result,
          message: "Deleted Successfully",
        })
      : res.json({
          status: 500,
          result: result,
          message: "Deleting Failed",
        });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
