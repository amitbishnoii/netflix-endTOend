import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import movieRouter from "./routes/movies.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import connectDB from "./config/db.js";
import userRouter from "./routes/users.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
connectDB();
app.use("/api/movies", movieRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use(errorHandler);

export default app;
