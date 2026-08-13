import express from "express";
import {
    createProfile,
    getUser,
    updateUser,
    loginUser,
    addFavourite,
} from "../controllers/user.controller.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { loggerMiddleware } from "../middlewares/loggerMiddleware.js";

const userRouter = express.Router();

userRouter.get("/login", loginUser);
userRouter.get("/:username", getUser);
userRouter.post("/create", createProfile);
userRouter.post("/:username/add-favourite", addFavourite);
userRouter.put("/edit/:username", updateUser);

export default userRouter;
