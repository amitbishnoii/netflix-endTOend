import express from "express";
import {
    addMovie,
    getAllMovies,
    deleteMovie,
    getMovieByName,
    editMovie,
} from "../controllers/movies.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminRequire } from "../middlewares/adminRequire.js";

const movieRouter = express.Router();

movieRouter.get("/", getAllMovies);
movieRouter.get("/:name", getMovieByName);
movieRouter.post("/add", authMiddleware, adminRequire, addMovie);
movieRouter.put("/update", authMiddleware, adminRequire, editMovie);
movieRouter.delete(
    "/delete/:movieName",
    authMiddleware,
    adminRequire,
    deleteMovie,
);

export default movieRouter;
