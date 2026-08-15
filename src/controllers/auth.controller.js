import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";

export const signupUser = async (req, res, next) => {
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
            { expiresIn: "7d" },
        );
        const { password: _, ...userData } = newuser.toObject();

        res.status(201).send({ success: true, data: userData, token });
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
            { expiresIn: "15m" },
        );

        const refreshToken = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET_REFRESH,
            { expiresIn: "7d" },
        );
        const { password: _, ...userInfo } = user.toObject();

        res.status(200).send({ success: true, token, refreshToken, userInfo });
    } catch (error) {
        next(error);
    }
};

export const refreshToken = async (req, res, next) => {
    try {
        const refresh = req.body.refresh;
        if (!refresh) {
            return next(new AppError("Refresh token is required", 401));
        }

        const decode = jwt.verify(refresh, process.env.JWT_SECRET_REFRESH);
        const userInfo = await User.findById(decode.userID);

        if (!userInfo) {
            return next(new AppError("User no longer exists", 401));
        }

        const token = jwt.sign(
            { userID: userInfo._id, role: userInfo.role },
            process.env.JWT_SECRET,
            { expiresIn: "15m" },
        );
        res.status(200).send({ success: true, token });
    } catch (error) {
        next(error);
    }
};
