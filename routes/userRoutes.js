import express from "express";
import { getDb } from "../connect.js";
import mongo from "mongodb";

const ObjectId = mongo.ObjectId;

const userRoutes = express.Router();

userRoutes.route("/users").get(async (req, res) => {
  console.log("route user hit");
  try {
    const db = getDb();
    const data = await db.collection("users").find({}).toArray();

    data.length > 0
      ? res.json(data)
      : res.status(404).json({ message: "No users found" });
  } catch (err) {
    res.status(500).json({
      message: `${err}`,
    });
  }
});

export default userRoutes;
