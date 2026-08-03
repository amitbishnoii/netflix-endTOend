export const roleMiddleware = (req, res, next) => {
    const role = req.query.role;
    if (role === "admin") {
        next()
    } else {
        res.status(403).json("Access Denied!");
        return;
    }
}