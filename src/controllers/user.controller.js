import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Movie from "../models/Movie.js";
import { AppError } from "../utils/AppError.js";

export const createProfile = async (req, res, next) => {
    try {
        const { username, email, password, age } = req.body;

        if (!username || !email || !password || !age) {
            return next(new AppError("Please fill all the fields!", 400));
        }

        if (password.length < 8) {
            return next(
                new AppError("Password should be atleast 8 characters.", 400),
            );
        }

        const userExists = await User.findOne({ username: username });
        if (userExists) {
            return next(new AppError("username taken!", 409));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newuser = await User.create({
            username: username,
            email: email,
            age: age,
            password: hashedPassword,
            role: req.body.role,
        });

        const token = jwt.sign(
            { userID: newuser._id, role: newuser.role },
            process.env.JWT_SECRET,
        );
        const { password: _, ...userData } = newuser.toObject();

        res.status(201).send({ success: true, data: userData, token });
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

        if (!username || !password) {
            return next(new AppError("Provide username and password", 400));
        }

        const user = await User.findOne({ username: username });
        if (!user) {
            return next(new AppError("Invalid Credentials", 401));
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return next(new AppError("Invalid Credentials", 401));
        }

        const token = jwt.sign(
            { userID: user._id, role: user.role },
            process.env.JWT_SECRET,
        );
        const { password: _, ...userInfo } = user.toObject();

        res.status(200).send({ success: true, token, userInfo });
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
