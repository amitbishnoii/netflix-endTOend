import Movie from "../models/Movie.js";
import type { IMovie } from "../models/Movie.js";
import User from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import type { Request, Response, NextFunction } from "express";
import {
    getPopularMovies as fetchPopularMovies,
    getDetails as fetchDetails,
} from "../services/tmdb.js";

export const getAllMovies = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;
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

export const getMovieByName = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const name = String(req.params.name);
        const filter: Partial<IMovie> = { name };
        const movie = await Movie.findOne(filter);

        if (!movie) {
            return next(new AppError("Movie not found", 404));
        } else {
            res.status(200).send(movie);
        }
    } catch (err) {
        next(err);
    }
};

export const addMovie = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
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

export const editMovie = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
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

export const deleteMovie = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const movieName = String(req.params.movieName);
        const filter: Partial<IMovie> = { name: movieName };

        const movieDeletion = await Movie.findOneAndDelete(filter);

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

export const getPopularMovies = async (req: Request, res: Response) => {
    try {
        const data = await fetchPopularMovies();
        if (data.success === false) {
            res.status(500).send({
                success: false,
                message: data.message,
            });
            return;
        }
        res.status(200).send({ success: true, data });
    } catch (error) {
        const err = error as Error;
        res.status(500).send({
            success: false,
            message: err.message,
        });
    }
};

export const getDetails = async (req: Request, res: Response) => {
    try {
        const movieID = req.params.id;
        if (!movieID) {
            res.status(401).send({
                success: false,
                message: "MovieID is required.",
            });
            return;
        }
        const data = await fetchDetails(Number(movieID));
        if (data.success === false) {
            res.status(500).send({
                success: false,
                message: data.message,
            });
            return;
        }
        res.status(200).send({ success: true, data });
    } catch (error) {
        const err = error as Error;
        res.status(500).send({
            success: false,
            message: err.message,
            cause: err.cause,
        });
    }
};
