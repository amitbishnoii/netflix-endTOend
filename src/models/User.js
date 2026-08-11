import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    password: {
        type: String,
        required: true,
        minLength: [8, "minimum 8 characters are required"],
        maxLength: [55, "limit exceeded"],
        trim: true,
    },
    email: { type: String, required: true, trim: true },
    age: {
        type: Number,
        required: true,
        min: [12, "min age is 12 years"],
        max: [100, "max age is 100"],
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = mongoose.model("User", userModel);

export default User;
