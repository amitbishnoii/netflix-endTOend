import express from "express";
import {
    addMovie,
    getAllMovies,
    deleteMovie,
    getMovieByName,
    editMovie,
} from "../controllers/movies.controller.js";
import { loggerMiddleware } from "../middlewares/loggerMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const movieRouter = express.Router();
movieRouter.use(loggerMiddleware);

movieRouter.get("/", getAllMovies);
movieRouter.get("/:name", getMovieByName);
movieRouter.post("/add", roleMiddleware, addMovie);
movieRouter.put("/update", editMovie)
movieRouter.delete("/delete/:movieName", roleMiddleware, deleteMovie);

export default movieRouter;
