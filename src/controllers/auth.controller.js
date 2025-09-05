import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDb } from "../config/db.js";
import mongo from "mongodb";

import dotenv from "dotenv";
dotenv.config({ path: "./config.env" }); // load .env here too

async function checkDB(email, db) {
  const result = await db.collection("users").findOne({ email });
  return result;
}

export const SignUp = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPass = bcrypt.hashSync(password, 8);
  const date = new Date();
  const formatted = date.toISOString().replace("Z", "+00:00");
  try {
    const db = getDb();
    const checkDb = await checkDB(email, db);

    if (!checkDb) {
      let userData = {
        name: name,
        email: email,
        password: hashedPass,
        created_at: formatted,
      };
      let result = await db.collection("users").insertOne(userData);
      const token = jwt.sign(
        { id: result.insertedId.toString() },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      res.json({
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
    }
    res.json({
      message: "User exists already",
      // code: res.sendStatus(201),
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const LogIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = getDb();
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) {
      return res.send(401).send({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.json({
      token: token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
      status: {
        message: "Logged In Successfully",
        // code: res.sendStatus(201),
      },
    });
  } catch (err) {
    res.status(401).json({ err: err.message });
  }
};
