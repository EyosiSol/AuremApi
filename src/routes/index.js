import express from "express";
import musicRouter from "./musicRoutes.js";
import authRouter from "./authRoutes.js";
import userRouter from "./userRoute.js";
import authMiddleware from "../middleware/auth.middleware.js";
const routes = express.Router();

routes.use(authRouter);
routes.use(authMiddleware, musicRouter);
routes.use(authMiddleware, userRouter);

export default routes;
