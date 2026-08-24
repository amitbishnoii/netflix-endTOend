import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import type { NextFunction, Response, Request } from "express";
import config from "../config/config.js";

export const signupUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { username, email, password, birthday } = req.body;

        if (!username || !email || !password || !birthday) {
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
            birthday: birthday,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { userID: newuser._id, role: newuser.role },
            config.jwtAccessSecret,
            { expiresIn: "7d" },
        );
        const { password: _, ...userData } = newuser.toObject();

        res.status(201).send({ success: true, data: userData, token });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
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
            config.jwtAccessSecret,
            { expiresIn: "15m" },
        );

        const refreshToken = jwt.sign(
            { userID: user._id },
            config.jwtRefreshSecret,
            { expiresIn: "7d" },
        );
        const { password: _, ...userInfo } = user.toObject();

        res.status(200).send({ success: true, token, refreshToken, userInfo });
    } catch (error) {
        next(error);
    }
};

export const refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const refresh = req.body.refresh;
        if (!refresh) {
            return next(new AppError("Refresh token is required", 401));
        }

        const decode = jwt.verify(refresh, config.jwtRefreshSecret);
        if (typeof decode === "string") {
            return next(new AppError("Invalid Token payload!", 401));
        }
        const userInfo = await User.findById(decode.userID);

        if (!userInfo) {
            return next(new AppError("User no longer exists", 401));
        }

        const token = jwt.sign(
            { userID: userInfo._id, role: userInfo.role },
            config.jwtAccessSecret,
            { expiresIn: "15m" },
        );
        res.status(200).send({ success: true, token });
    } catch (error) {
        next(error);
    }
};
