import express from "express";
import {
    addMovie,
    getAllMovies,
    deleteMovie,
    getMovieByName,
    editMovie,
    getPopularMovies,
    getDetails,
    getReviews,
    getCredits,
    getImages,
} from "../controllers/movies.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminRequire } from "../middlewares/adminRequire.js";

const movieRouter = express.Router();

movieRouter.get("/all", getAllMovies);
movieRouter.get("/popularMovies", getPopularMovies);
movieRouter.get("/movieDetails/:id", getDetails);
movieRouter.get("/reviews/:id", getReviews);
movieRouter.get("/movieCredits/:id", getCredits);
movieRouter.get("/movieImages/:id", getImages);
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
