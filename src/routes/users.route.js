import express from "express";
import {
    createProfile,
    getUser,
    updateUser,
    loginUser,
    getLessThanThirty,
} from "../controllers/user.controller.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { loggerMiddleware } from "../middlewares/loggerMiddleware.js";

const userRouter = express.Router();

userRouter.get("/less", getLessThanThirty);
userRouter.get("/login", loginUser);
userRouter.get("/:username", getUser);
userRouter.post("/create", createProfile);
userRouter.put("/edit/:username", updateUser);

export default userRouter;
