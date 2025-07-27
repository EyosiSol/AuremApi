const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const musics = require("./musicRoutes");

require("dotenv").config({ path: "./config.env" }); // load .env here too

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.url}`);
  next();
});

app.use(musics);

connect.connectToServer().then(() => {
  console.log("DB connected");
  app.listen(PORT, () => {
    console.log("🚀 Server running on PORT:", PORT);
  });
});
