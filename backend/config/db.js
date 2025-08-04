// config/db.js
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
// Set strictQuery explicitly to suppress the warning
//mongoose.set('strictQuery', true);

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // Remove deprecated options
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};
