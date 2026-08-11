import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 1900 },
    genre: { type: String, trim: true },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
