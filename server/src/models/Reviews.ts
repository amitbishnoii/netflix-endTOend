import mongoose, { Document, Schema } from "mongoose";

interface MovieReview extends Document {
    reviewID: string;
    movieID: number;
    author: {
        name: string;
        username: string;
        avatarPath: string;
        rating: number;
    };
    content: string;
    createdAt: string;
    updatedAt: string;
}

const reviewSchema = new Schema<MovieReview>({
    reviewID: { type: String, unique: true, required: true, trim: true },
    movieID: { type: Number, required: true },
    author: {
        name: { type: String, required: true, trim: true },
        username: { type: String, required: true, trim: true },
        avatarPath: { type: String, required: true, trim: true },
        rating: { type: Number, required: true },
    },
    content: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
});

const Review = mongoose.model<MovieReview>("Review", reviewSchema);
export default Review;
export type { MovieReview };
