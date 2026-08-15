import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    message: {
        success: false,
        message: "Limit reached try again later.",
    },
    legacyHeaders: false,
    standardHeaders: true,
});
