import { connectDb } from "./config/db.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" }); // load .env here too

const PORT = 3000;

connectDb();

app.listen(PORT, () => {
  console.log("🚀 Server running on PORT:", PORT);
});
