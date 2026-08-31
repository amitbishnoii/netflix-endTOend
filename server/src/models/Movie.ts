import mongoose, { Document, Mongoose, Schema } from "mongoose";

interface IMovie extends Document {
    tmdbID: number;
    title: string;
    releaseDate: string;
    genre?: string[];
    overview: string;
    tagLine?: string;
    posterPath: string;
    budget: number;
    homepage: string;
    originCountry: string[];
    productionCompanies: string[];
    runtime: number;
    rating: number;
    ratingCount: number;
    reviews: { review: Schema.Types.ObjectId }[];
}

const movieSchema = new mongoose.Schema<IMovie>({
    tmdbID: { type: Number, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    releaseDate: { type: String, required: true, trim: true },
    genre: [{ type: String, trim: true, required: true }],
    overview: { type: String, trim: true, required: true },
    tagLine: { type: String, trim: true },
    posterPath: { type: String, required: true },
    budget: { type: Number, required: true },
    homepage: { type: String },
    originCountry: [{ type: String, trim: true }],
    productionCompanies: [{ type: String, trim: true }],
    runtime: { type: Number, required: true },
    rating: { type: Number, required: true },
    ratingCount: { type: Number, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Reviews" }],
});

const Movie = mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;
export type { IMovie };
