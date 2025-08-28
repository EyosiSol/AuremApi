import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDb } from "../connect.js";
import mongo from "mongodb";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" }); // load .env here too

const ObjectId = mongo.ObjectId;

const authRoutes = express.Router();

//Register
authRoutes.route("/register").post(async (req, res) => {
  console.log("reg hit");
  const { name, email, password } = req.body;
  const hashedPass = bcrypt.hashSync(password, 8);
  const date = new Date();
  const formatted = date.toISOString().replace("Z", "+00:00");
  try {
    const db = getDb();
    let userData = {
      name: name,
      email: email,
      password: hashedPass,
      created_at: formatted,
    };
    let result = await db.collection("users").insertOne(userData);
    const token = jwt.sign({ id: result.insertedId }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return res.json({
      token: token,
      user: {
        id: result.insertedId,
        name: name,
        email: email,
        createdAt: formatted,
      },
      status: {
        message: "User Created Successfully",
        // code: res.sendStatus(201),
      },
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

export default authRoutes;
