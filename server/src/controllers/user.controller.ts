import type { NextFunction, Request, Response } from "express";
import Movie from "../models/Movie.js";
import type { IUser } from "../models/User.js";
import User from "../models/User.js";
import { AppError } from "../utils/AppError.js";

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const username = String(req.params.username);
        const filter: Partial<IUser> = { username };
        const user = await User.findOne(filter)
            .populate("favouriteMovies.movie", "name year")
            .select("-password -email -role");

        if (!user) {
            return next(new AppError("user not found", 404));
        } else {
            res.status(200).send({ success: true, user });
        }
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const username = String(req.params.username);
        const filter: Partial<IUser> = { username };
        const updatedUser = await User.findOneAndUpdate(
            filter,
            { age: req.body.age },
            { returnDocument: "after", runValidators: true },
        );

        if (!updatedUser) {
            return next(new AppError("username not found", 404));
        } else {
            res.status(200).send({ success: true, updatedUser });
        }
    } catch (error) {
        next(error);
    }
};

export const addFavourite = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const movie = await Movie.findOne({ tmdbID: Number(req.body.tmdbID) });
        const username = String(req.params.username);
        const filter: Partial<IUser> = { username };
        const user = await User.findOne(filter).select(
            "username favouriteMovies",
        );

        if (!movie) {
            return next(new AppError("Movie not Found", 404));
        }

        if (!user) {
            return next(new AppError("User not Found", 404));
        }

        const alreadyFavourite = user.favouriteMovies.some((obj) => {
            return obj.movie.toString() === movie._id.toString();
        });

        if (alreadyFavourite) {
            return next(
                new AppError("Movie already exists in favourites.", 400),
            );
        }

        user.favouriteMovies.push(movie._id);
        await user.save();

        res.status(200).send({ success: true, user });
    } catch (error) {
        next(error);
    }
};

export const getFavourites = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const movies = await User.findOne({
            username: req.body.username,
        })
            .select("favouriteMovies")
            .populate("favouriteMovies.movie");
        if (!movies) {
            res.status(404).send({
                success: false,
                message: "No favourite Movies!",
            });
            return;
        }

        res.status(200).send({
            success: true,
            favourites: movies.favouriteMovies,
        });
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        if (!req.user) {
            return next(new AppError("Unauthorized", 401));
        }

        const userInfo = await User.findOne({ _id: req.user.userID }).select(
            "-password",
        );
        if (!userInfo) {
            return next(new AppError("User not Found", 404));
        } else {
            res.status(200).send({ success: true, userInfo });
        }
    } catch (error) {
        next(error);
    }
};
