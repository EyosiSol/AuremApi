const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config({ path: "./config.env" });

const uri = process.env.DATABASE_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database;

module.exports = {
  connectToserver: () => {
    database = client.db("musics");
  },
  getDb: () => {
    return database;
  },
};

console.log("hi from backend");
