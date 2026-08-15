import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Movie from "../models/Movie.js";
import { AppError } from "../utils/AppError.js";

export const getUser = async (req, res, next) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({
            username: username,
        })
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

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { username: req.params.username },
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

export const addFavourite = async (req, res, next) => {
    try {
        const movie = await Movie.findOne({ name: req.body.movieName });
        const user = await User.findOne({
            username: req.params.username,
        }).select("username favouriteMovies");

        if (!movie) {
            return next(new AppError("movie not found", 404));
        }

        if (!user) {
            return next(new AppError("user not found", 404));
        }

        const alreadyFavourite = user.favouriteMovies.some((obj) => {
            return obj.movie.toString() === movie._id.toString();
        });

        if (alreadyFavourite) {
            return next(
                new AppError("movie already exists in favourites", 400),
            );
        }

        user.favouriteMovies.push({ movie: movie._id });
        await user.save();

        res.status(200).send({ success: true, user });
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (req, res, next) => {
    try {
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
