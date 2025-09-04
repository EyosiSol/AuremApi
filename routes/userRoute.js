import express from "express";
import { getDb } from "../connect.js";
import mongo from "mongodb";

const ObjectId = mongo.ObjectId;
const userRoutes = express.Router();

userRoutes.route("/:userId/profile").get(async (req, res) => {
  const { userId } = req.params;
  try {
    const db = getDb();

    const data = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    console.log("data:", data);
    res.json(data);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

userRoutes.route("/:userId/profile").patch(async (req, res) => {
  const { userId } = req.params;
  const { name, oldPassword, newPassword } = req.body;
  try {
    const db = getDb();
    let user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    const isMatch = bcrypt.compareSync(oldPassword, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Password Doesn't match" });
    }

    const hashedNew = bcrypt.hashSync(newPassword, 8);

    const update = {
      $set: {
        ...(name && { name }),
        password: hashedNew,
      },
    };

    let response = await db.collection("users").updateOne(
      {
        _id: new ObjectId(userId),
      },
      update
    );
    if (response.modifiedCount === 0) {
      return res.status(400).json({ message: "No changes applied" });
    }
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

export default userRoutes;
