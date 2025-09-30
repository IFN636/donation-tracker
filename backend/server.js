import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import PaymentController from "./controllers/paymentController.js";
import authRoutes from "./routes/authRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import fundingNeedRoutes from "./routes/fundingNeedRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();
connectDB();

app.use(cors());

const paymentController = new PaymentController();

app.post(
    "/webhook/stripe",
    bodyParser.raw({ type: "application/json" }),
    paymentController.webhookStripe.bind(paymentController)
);

app.use(express.json());

//Logging
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/funding-needs", fundingNeedRoutes);
app.use("/api/payment", paymentRoutes);

// Export the app object for testing
// If the file is run directly, start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
