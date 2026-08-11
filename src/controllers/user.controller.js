import User from "../models/User.js";

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
        });

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

export const getLessThanThirty = async (req, res, next) => {
    try {
        const users = await User.find({ username: { $regex: /^a/i } });
        res.send(users);
    } catch (error) {
        next(error);
    }
};
