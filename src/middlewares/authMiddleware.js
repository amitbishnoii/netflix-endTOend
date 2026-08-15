import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

export const authMiddleware = (req, res, next) => {
    try {
        const headerAuth = req.headers.authorization;

        if (!headerAuth || !headerAuth.startsWith("Bearer ")) {
            return next(new AppError("Token is missing!", 401));
        }

        let token = headerAuth.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        return next(new AppError("Invalid or expired token.", 401));
    }
};
