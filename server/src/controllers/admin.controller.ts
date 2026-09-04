import type { Request, Response, NextFunction } from "express";
import Movie, { type IMovie } from "../models/Movie.js";
import { fetchMovieFromTMDB } from "../services/adminService.js";

export const getInfo = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const response = await fetchMovieFromTMDB(Number(req.params.tmdbID));
        if (!response.success) {
            res.status(500).send({ message: "error occured", error: response });
            return;
        }
        res.status(200).send({ info: response });
    } catch (error) {
        next(error);
    }
};

export const addMovie = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        console.log(
            "got request to create a movie with data: ",
            req.body.movie,
        );
        const movie = await Movie.create(req.body.movie);
        res.status(200).send({ success: true, movie });
    } catch (error) {
        next(error);
    }
};

export const removeMovie = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const movieID = req.params.movieID;
        const removed = await Movie.findOneAndDelete({
            tmdbID: Number(movieID),
        });
        if (!removed) {
            res.status(404).send({
                success: false,
                message: "Movie not found!",
            });
            return;
        }
        res.status(200).send({ success: true, message: "Movie Deleted!" });
    } catch (error) {
        next(error);
    }
};

export const updateMovie = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { movieID } = req.params;

        const movie = await Movie.findByIdAndUpdate(
            movieID,
            { $set: req.body },
            { returnDocument: "after", runValidators: true },
        );

        if (!movie) {
            res.status(404).send({
                success: false,
                message: "Movie not found!",
            });
            return;
        }

        res.status(200).send({ success: true, movie });
    } catch (error) {
        next(error);
    }
};
