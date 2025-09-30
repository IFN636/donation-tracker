import { Router } from "express";
import PaymentController from "../controllers/paymentController.js";
import { authRequired } from "../middleware/authMiddleware.js";
const router = Router();

router.post(
    "/create-checkout-session",
    authRequired,
    PaymentController.createCheckoutSession.bind(PaymentController)
);

export default router;
