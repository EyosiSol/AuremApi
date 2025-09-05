import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.url}`);
  next();
});

app.use(routes);

export default app;
