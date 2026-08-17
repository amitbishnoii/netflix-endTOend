import mongoose, { Document } from "mongoose";

interface IMovie extends Document {
    name: string;
    year: number;
    genre?: string;
}

const movieSchema = new mongoose.Schema<IMovie>({
    name: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 1900 },
    genre: { type: String, trim: true },
});

const Movie = mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;
export type { IMovie };
