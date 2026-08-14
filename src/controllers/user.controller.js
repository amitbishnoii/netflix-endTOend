import User from "../models/User.js";
import Movie from "../models/Movie.js";

export const createProfile = async (req, res, next) => {
    try {
        const { username, email, password, age } = req.body;

        const newuser = await User.create({
            username: username,
            email: email,
            age: age,
            password: password,
        });

        if (!newuser) {
            res.send("error");
        } else {
            res.send(newuser);
        }
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({
            username: username,
        }).populate("favouriteMovies.movie");

        if (!user) {
            res.send("error");
        } else {
            res.send(user);
        }
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const username = req.params.username;
        const age = req.body.age;

        const updatedUser = await User.findOneAndUpdate(
            { username: username },
            { age: age },
            { returnDocument: "after", runValidators: true },
        );

        if (!updatedUser) {
            res.send("error");
        } else {
            res.send(updatedUser);
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
        const { username } = req.params;
        const movie = await Movie.findOne({ name: req.body.movieName });
        const user = await User.findOne({ username: username });

        if (!movie) {
            return res.status(404).send("movie not found!");
        }

        const alreadyFavourite = user.favouriteMovies.some((obj) => {
            return obj.movie.toString() === movie._id.toString();
        });

        if (alreadyFavourite) {
            return res.send("movie already favourite");
        }

        user.favouriteMovies.push({ movie: movie._id });
        await user.save();

        res.send(user);
    } catch (error) {
        next(error);
    }
};
