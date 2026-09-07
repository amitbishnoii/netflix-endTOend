import type { NextFunction, Request, Response } from "express";

export const loggerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log("got request: ", req.method, req.url);
    next();
};
