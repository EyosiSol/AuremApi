import { connectToServer } from "./connect.js";
import express from "express";
import cors from "cors";
import musics from "./routes/musicRoutes.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config({ path: "./config.env" }); // load .env here too

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.url}`);
  next();
});

app.use(authRoutes);
app.use(authMiddleware, musics);

connectToServer().then(() => {
  console.log("DB connected");
  app.listen(PORT, () => {
    console.log("🚀 Server running on PORT:", PORT);
  });
});
