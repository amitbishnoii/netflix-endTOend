import express from "express";
import {
    getUser,
    updateUser,
    addFavourite,
    getProfile,
    getFavourites,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminRequire } from "../middlewares/adminRequire.js";

const userRouter = express.Router();

userRouter.get("/profile", authMiddleware, getProfile);
userRouter.get("/favourites/:username", authMiddleware, getFavourites);
userRouter.get("/profile/:username", authMiddleware, adminRequire, getUser);
userRouter.post("/:username/add-favourite", authMiddleware, addFavourite);
userRouter.put("/edit/:username", authMiddleware, updateUser);

export default userRouter;
