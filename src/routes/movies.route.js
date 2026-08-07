import express from "express";
import {
    addMovie,
    getAllMovies,
    getMovieByID,
    deleteMovie,
} from "../controllers/movies.controller.js";
import { loggerMiddleware } from "../middlewares/loggerMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const movieRouter = express.Router();
movieRouter.use(loggerMiddleware);

movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieByID);
movieRouter.post("/add", roleMiddleware, addMovie);
movieRouter.delete("/delete/:movieID", roleMiddleware, deleteMovie);

export default movieRouter;
