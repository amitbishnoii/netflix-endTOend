import { AppError } from "../utils/AppError.js";
import type { Request, Response, NextFunction } from "express";

export const adminRequire = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (!req.user) {
        return next(new AppError("Invalid Token!", 401));
    }
    if (req.user.role !== "admin") {
        return next(new AppError("Forbidden route!", 403));
    }
    next();
};
