import express from "express";
import {
    createProfile,
    getUser,
    updateUser,
    loginUser,
    addFavourite,
} from "../controllers/user.controller.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminRequire } from "../middlewares/adminRequire.js";

const userRouter = express.Router();

userRouter.get("/login", loginUser);
userRouter.get("/:username", authMiddleware, adminRequire, getUser);
userRouter.post("/create", createProfile);
userRouter.post("/:username/add-favourite", authMiddleware, addFavourite);
userRouter.put("/edit/:username", authMiddleware, updateUser);

export default userRouter;
