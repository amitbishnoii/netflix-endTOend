import express from "express";
import { rateLimiter } from "../middlewares/rateLimiter.js";
import {
    signupUser,
    loginUser,
    refreshToken,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", rateLimiter, loginUser);
authRouter.post("/signup", signupUser);
authRouter.post("/refresh", refreshToken);

export default authRouter;
