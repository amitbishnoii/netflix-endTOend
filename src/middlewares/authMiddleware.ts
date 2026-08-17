import jwt, { type JwtPayload } from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import type { NextFunction, Request, Response } from "express";
import config from "../config/config.js";
import type { Types } from "mongoose";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const headerAuth = req.headers.authorization;

        if (!headerAuth || !headerAuth.startsWith("Bearer ")) {
            return next(new AppError("Token is missing!", 401));
        }

        let token = headerAuth.split(" ")[1];
        if (typeof token !== "string") {
            return next(new AppError("Invalid Token", 401));
        }
        const decoded = jwt.verify(token, config.jwtAccessSecret);

        req.user = decoded as JwtPayload & {
            userID: Types.ObjectId;
            role: string;
        };
        next();
    } catch (error) {
        return next(new AppError("Invalid or expired token.", 401));
    }
};
