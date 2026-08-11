import User from "../models/User.js";

export const createProfile = async (req, res, next) => {
    try {
        const { username, email } = req.body;
        const newuser = await User.create({
            username: username,
            email: email,
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
        const users = await User.find({ age: { $eq: 30 } });
        res.send(users);
    } catch (error) {
        next(error);
    }
};
