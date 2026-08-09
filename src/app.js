import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import movieRouter from "./routes/movies.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import connectDB from "./config/db.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use("/api/movies", movieRouter);
connectDB();

app.get("/", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    if (req.body.username === "admin") {
        res.render("home");
    } else {
        res.send("error");
    }
});

app.use(errorHandler);

export default app;
