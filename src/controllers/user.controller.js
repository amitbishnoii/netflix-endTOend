import User from "../models/User.js";
import Movie from "../models/Movie.js";
import { AppError } from "../utils/AppError.js";

export const createProfile = async (req, res, next) => {
    try {
        const { username, email, password, age } = req.body;

        const newuser = await User.create({
            username: username,
            email: email,
            age: age,
            password: password,
        });

        res.status(201).send({ success: true, newuser });
    } catch (error) {
        next(error);
    }
};

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

export const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
    } catch (error) {
        next(error);
    }
};

export const addFavourite = async (req, res, next) => {
    try {
        const movie = await Movie.findOne({ name: req.body.movieName });
        const user = await User.findOne({ username: req.params.username });

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
