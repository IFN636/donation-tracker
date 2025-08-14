import { Router } from "express";
import { createCheckoutSession } from "../controllers/paymentController.js";
import { authRequired } from "../middleware/authMiddleware.js";
const router = Router();

router.post("/create-checkout-session", authRequired, createCheckoutSession);

export default router;
