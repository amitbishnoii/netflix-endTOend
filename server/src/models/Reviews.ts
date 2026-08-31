import mongoose, { Document, Schema } from "mongoose";

interface MovieReview extends Document {
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
