import express from "express";
import { GetProfile, UpdateProfile } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/:userId/profile", GetProfile);
userRouter.patch("/:userId/profile", UpdateProfile);

export default userRouter;
