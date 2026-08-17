import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongodbUri);
        console.log("db connected!");
    } catch (error) {
        console.log(error, "error occured");
    }
};

export default connectDB;
