import { AppError } from "../utils/AppError.js";

export const adminRequire = (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(new AppError("Forbidden route!", 403));
    }
    next();
};
