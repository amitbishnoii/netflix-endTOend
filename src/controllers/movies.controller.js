import { movies } from "../data/movies.js";

export const getAllMovies = (req, res) => {
    res.json(movies);
};

export const getMovieByID = (req, res) => {
    try {
        const ID = req.params.id;
        const movie = movies.filter((movie) => {
            return movie.id == ID;
        });

        if (movie.length === 0) {
            res.status(404).json("Movie not Found!");
        } else {
            res.json(movie);
        }
    } catch (err) {
        next(err);
    }
};

export const updateMovie = (req, res) => {
    try {
        const ID = req.params.id;
        const name = req.body.name;
        const movie = movies.filter((movie) => {
            return movie.id == ID;
        });

        movie.name = name;
        res.json(movie);
    } catch (err) {
        next(err);
    }
};

export const addMovie = (req, res) => {
    try {
        const { movieName } = req.body;
        const { movieYear } = req.body;

        if (!movieName) {
            res.status(400).json("Title is Required!");
        } else {
            movies.push({
                id: movies.length + 1,
                name: movieName,
                year: movieYear,
            });
            res.json(movies);
        }
    } catch (err) {
        next(err);
    }
};

export const editMovie = (req, res) => {
    try {
        const {movieID, editInfo} = req.body;
        if (!movieID) {
            res.status(400).json("id is Required");
        }
    } catch (error) {
        next(error)
    }
}

export const deleteMovie = (req, res) => {
    try {
        const { movieID } = req.params;

        if (!movieID) {
            res.status(400).json("id is Required");
        } else {
            let results = movies.filter((movie) => {
                return movie.id !== parseInt(movieID);
            });
            res.status(200).send(results);
        }
    } catch (error) {
        next(error);
    }
};
