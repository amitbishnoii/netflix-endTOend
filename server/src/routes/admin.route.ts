import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminRequire } from "../middlewares/adminRequire.js";
import {
    addMovie,
    getInfo,
    removeMovie,
    updateMovie,
} from "../controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.get("/movie/:tmdbID", authMiddleware, adminRequire, getInfo);
adminRouter.post("/add-movie", authMiddleware, adminRequire, addMovie);
adminRouter.patch(
    "/update/:movieID",
    authMiddleware,
    adminRequire,
    updateMovie,
);
adminRouter.delete(
    "/delete/:movieID",
    authMiddleware,
    adminRequire,
    removeMovie,
);

export default adminRouter;
