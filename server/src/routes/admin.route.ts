import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminRequire } from "../middlewares/adminRequire.js";
import {
    addMovie,
    removeMovie,
    updateMovie,
} from "../controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.post("/add-movie", authMiddleware, adminRequire, addMovie);
adminRouter.patch("/update/:movieID", authMiddleware, adminRequire, updateMovie);
adminRouter.delete(
    "/delete/:movieID",
    authMiddleware,
    adminRequire,
    removeMovie,
);

export default adminRouter;
