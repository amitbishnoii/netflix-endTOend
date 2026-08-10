import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
});

const User = mongoose.model("User", userModel);

export default User;
