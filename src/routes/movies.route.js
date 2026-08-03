import express from "express";
import { addMovie, getAllMovies, getMovieByID } from "../controllers/movies.controller.js";

const movieRouter = express.Router();

movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieByID);
movieRouter.post("/add", addMovie);

export default movieRouter;
