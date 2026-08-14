import Movie from "../models/Movie.js";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

export const getAllMovies = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        const [movies, documents] = await Promise.all([
            Movie.find().skip(skip).limit(limit),
            Movie.countDocuments(),
        ]);

        const countPages = Math.ceil(documents / limit);

        if (movies.length !== 0) {
            res.status(200).send({ movies, countPages });
        } else {
            res.status(200).send("no movies found");
        }
    } catch (error) {
        next(error);
    }
};

export const getMovieByName = async (req, res, next) => {
    try {
        const name = req.params.name;
        const movie = await Movie.findOne({ name: name });

        if (!movie) {
            return next(new AppError("Movie not found", 404));
        } else {
            res.status(200).send(movie);
        }
    } catch (err) {
        next(err);
    }
};

export const addMovie = async (req, res, next) => {
    try {
        const { movieName, movieYear, genre } = req.body;

        if (!movieName) {
            return next(new AppError("Title is Required", 400));
        } else {
            const movie = await Movie.create({
                name: movieName,
                year: movieYear,
                genre: genre,
            });

            res.status(200).send(movie);
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
            { returnDocument: "after", runValidators: true },
        );

        if (!updateMovie) {
            return next(new AppError("movie not found", 404));
        } else {
            res.status(200).send(updateMovie);
        }
    } catch (error) {
        next(error);
    }
};

export const deleteMovie = async (req, res, next) => {
    try {
        const { movieName } = req.params;

        const movieDeletion = await Movie.findOneAndDelete({
            name: movieName,
        });

        if (!movieDeletion) {
            return next(new AppError("Movie not Found", 404));
        }

        await User.updateMany(
            {},
            { $pull: { favouriteMovies: { movie: movieDeletion._id } } },
        );

        res.status(200).send({ success: true, movieDeletion });
    } catch (error) {
        next(error);
    }
};
