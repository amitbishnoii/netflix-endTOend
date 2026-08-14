import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const getAllMovies = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        const movies = await Movie.find().skip(skip).limit(limit);

        if (movies) {
            res.send(movies);
        } else {
            res.send("no movies found!");
        }
    } catch (error) {
        next(err);
    }
};

export const getMovieByName = async (req, res, next) => {
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

export const addMovie = async (req, res, next) => {
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

export const editMovie = async (req, res, next) => {
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

export const deleteMovie = async (req, res, next) => {
    try {
        const { movieName } = req.params;
        console.log(movieName);

        const movieDeletion = await Movie.findOneAndDelete({
            name: movieName,
        });

        await User.updateMany(
            {},
            { $pull: { favouriteMovies: { movie: movieDeletion._id } } },
        );

        if (!movieDeletion) {
            res.status(400).json("id is Required");
        } else {
            res.status(200).json(movieDeletion);
        }
    } catch (error) {
        next(error);
    }
};
