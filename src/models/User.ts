import mongoose, { Types } from "mongoose";

interface IUser extends mongoose.Document {
    username: string;
    password: string;
    email: string;
    age: number;
    role: "admin" | "user";
    favouriteMovies: { movie: Types.ObjectId }[];
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        minLength: [8, "minimum 8 characters are required"],
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
    },

    age: {
        type: Number,
        required: true,
        min: [12, "min age is 12 years"],
        max: [100, "max age is 100"],
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },

    favouriteMovies: [
        {
            movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
        },
    ],
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
export type { IUser };
