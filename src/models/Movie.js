import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    genre: String,
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
