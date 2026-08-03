import express from "express";
import { getAllMovies } from "../controllers/movies.controller.js";

const movieRouter = express.Router();

movieRouter.get("/", getAllMovies);

export default movieRouter;
