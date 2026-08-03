import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import movieRouter from "./routes/movies.route.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use("/api/movies", movieRouter)

app.get("/", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    console.log(req.body);
    if (req.body.username === "admin") {
        res.render("home");
    } else {
        res.send("error");
    }
});

export default app;
