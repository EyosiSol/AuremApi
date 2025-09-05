import { LogIn, SignUp } from "../controllers/auth.controller.js";
import express from "express";

const authRouter = express.Router();

//Register
authRouter.post("/signup", SignUp);
// Login
authRouter.post("/login", LogIn);

export default authRouter;
