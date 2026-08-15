import express from "express";
import {
    getUser,
    updateUser,
    addFavourite,
    getProfile,
} from "../controllers/user.controller.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminRequire } from "../middlewares/adminRequire.js";

const userRouter = express.Router();

userRouter.get("/profile", authMiddleware, getProfile);
userRouter.get("/:username", authMiddleware, adminRequire, getUser);
userRouter.post("/:username/add-favourite", authMiddleware, addFavourite);
userRouter.put("/edit/:username", authMiddleware, updateUser);

export default userRouter;
