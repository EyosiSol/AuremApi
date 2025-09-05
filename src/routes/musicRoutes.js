import express from "express";
import {
  AddMusic,
  DeleteMusic,
  GetMusic,
  UpdateMusic,
} from "../controllers/music.controller.js";

const musicRouter = express.Router();

// READ | GET MUSICS with Search or Not
musicRouter.get("/:userId/musics", GetMusic);

// CREATE
musicRouter.post("/:userId/musics", AddMusic);

// UPDATE | PATCH & PUT
musicRouter.put("/:userId/musics/:musicId", UpdateMusic);
musicRouter.patch("/:userId/musics/:musicId", UpdateMusic);

// Delete

musicRouter.delete("/:userId/musics/:musicId", DeleteMusic);

export default musicRouter;
