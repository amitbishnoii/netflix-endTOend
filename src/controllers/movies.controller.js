import Movie from "../models/Movie.js";

export const getAllMovies = (req, res) => {
    // try {
    // } catch (error) {
    // }
};

export const getMovieByName = async (req, res) => {
    try {
        const name = req.params.name;
        const movie = await Movie.findOne({ name: name });
        console.log(name);

        if (!movie) {
            res.status(404).json("Movie not Found!");
        } else {
            res.json(movie);
        }
    } catch (err) {
        next(err);
    }
};

export const addMovie = async (req, res) => {
    try {
        const { movieName, movieYear, genre } = req.body;

        if (!movieName) {
            res.status(400).json("Title is Required!");
        } else {
            const movie = await Movie.create({
                name: movieName,
                year: movieYear,
                genre: genre,
            });

            res.json(movie);
        }
    } catch (err) {
        next(err);
    }
};

export const editMovie = async (req, res) => {
    try {
        const { movieName, movieYear } = req.body;

        const updateMovie = await Movie.findOneAndUpdate(
            { name: movieName },
            { year: movieYear },
            { new: true },
        );

        if (!updateMovie) {
            res.send("updation failed");
        } else {
            res.send(updateMovie);
        }
    } catch (error) {
        next(error);
    }
};

export const deleteMovie = async (req, res) => {
    try {
        const { movieName } = req.params;
        console.log(movieName);

        const movieDeletion = await Movie.findOneAndDelete({
            name: movieName,
        });

        if (!movieDeletion) {
            res.status(400).json("id is Required");
        } else {
            res.status(200).json(movieDeletion);
        }
    } catch (error) {
        next(error);
    }
};
