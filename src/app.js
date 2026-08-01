import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/login", (req, res) => {
    // res.render("login");
    if (req.query.username = "admin") {
        res.send("admin page");
    } else {
        res.send("hello world");
    }
});

export default app;
