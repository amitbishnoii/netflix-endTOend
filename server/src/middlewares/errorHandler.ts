import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        const statusCode = err.statusCode;
        const message = err.message;
        return res.status(statusCode).send({
            success: false,
            error: message,
        });
    }

    return res.status(500).send({ success: false, message: "something went wrong" });
};
