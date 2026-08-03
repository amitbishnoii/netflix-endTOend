export const errorHandler = (err, req, res, next) => {
    res.status(500).json({
        message: "server side error",
        error: err,
    });
};
