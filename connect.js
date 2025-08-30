import { MongoClient, ServerApiVersion } from "mongodb";

import dotenv from "dotenv";

dotenv.config({ path: "./config.env" }); // load .env here too

const uri = process.env.DATABASE_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export let database;

export const connectToServer = async () => {
  try {
    await client.connect(); // Actually connects to MongoDB
    database = client.db("musics");
    database
    console.log("✅ Successfully connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // Exit if connection fails
  }
};

export const getDb = () => database;

