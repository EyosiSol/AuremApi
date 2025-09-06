import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import User from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/password.js";
dotenv.config({ path: "./config.env" }); // load .env here too

async function check(email) {
  const result = await User.findOne({ email });
  return result;
}

export const SignUp = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPass = await hashPassword(password);

  try {
    const checked = await check(email);
    console.log("checked:", checked);
    if (checked) return res.json({ message: "User exists already" });

    let userdata = {
      name: name,
      email: email,
      password: hashedPass,
    };

    let result = await User.insertOne(userdata);

    console.log("result:", result);

    const token = jwt.sign(
      { id: result._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.json({
      token: token,
      user: {
        id: result._id,
        name: name,
        email: email,
        createdAt: result.createdAt,
      },
      status: {
        message: "User Created Successfully",
        // code: res.sendStatus(201),
      },
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const LogIn = async (req, res) => {
  const { email, password } = req.body;
  console.log({
    email: email,
    password: password,
  });

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check password
    const validPass = comparePassword(password, user.password);

    if (!validPass) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
      status: {
        message: "Logged In Successfully",
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
