import express from "express";
import {
    getPopularMovies,
    getDetails,
    getReviews,
    getCredits,
} from "../controllers/movies.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminRequire } from "../middlewares/adminRequire.js";

const movieRouter = express.Router();

movieRouter.get("/popularMovies", getPopularMovies);
movieRouter.get("/movieDetails/:id", getDetails);
movieRouter.get("/reviews/:id", getReviews);
movieRouter.get("/movieCredits/:id", getCredits);

export default movieRouter;
