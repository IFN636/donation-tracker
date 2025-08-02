import cors from "cors";
import { config } from "dotenv";
import express, { json } from "express";
import morgan from "morgan";
import connectDB from "./config/db";

config();

const app = express();

app.use(cors());
app.use(json());
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));

app.use("/api/auth", require("./routes/authRoutes"));
//app.use('/api/tasks', require('./routes/taskRoutes'));

// Export the app object for testing
if (require.main === module) {
    connectDB();
    // If the file is run directly, start the server
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
