import { movies } from "../data/movies.js";

export const getAllMovies = (req, res) => {
    res.json(movies);
};

export const getMovieByID = (req, res) => {
    const ID = req.params.id;
    const movie = movies.filter((movie) => {
        return movie.id == ID;
    });
    res.json(movie);
};

export const updateMovie = (req, res) => {
    const ID = req.params.id;
    const name = req.body.name;
    const movie = movies.filter((movie) => {
        return movie.id == ID;
    });

    movie.name = name;
    res.json(movie);
};

export const addMovie = (req, res) => {
    const { movieName } = req.body;
    const { movieYear } = req.body;

    movies.push({ id: movies.length + 1, name: movieName, year: movieYear });
    res.json(movies)
};
