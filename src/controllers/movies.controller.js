import { movies } from "../data/movies.js";

export const getAllMovies = (req, res) => {
    res.json(movies);
};
