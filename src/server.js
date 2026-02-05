import { connectDb } from "./config/db.js";
import app from "./app.js";
import dotenv from "dotenv";

const env = dotenv.config({ path: "./config.env" }); // load .env here too

console.log(env);

const PORT = 3000;

connectDb();

app.listen(PORT, () => {
  console.log("🚀 Server running on PORT:", PORT);
});
