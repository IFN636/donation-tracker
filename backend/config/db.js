// config/db.js
import { config } from "dotenv";
import { connect } from "mongoose";

config();
// Set strictQuery explicitly to suppress the warning
//mongoose.set('strictQuery', true);

const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI); // Remove deprecated options
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

export default connectDB;
