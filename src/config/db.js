// src/config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" }); // load env

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      dbName: "musics",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Successfully connected to MongoDB (Mongoose)");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};
