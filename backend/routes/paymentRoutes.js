import { Router } from "express";
import PaymentController from "../controllers/paymentController.js";
import { authRequired } from "../middleware/authMiddleware.js";
const router = Router();

const paymentController = new PaymentController();

router.post(
    "/create-checkout-session",
    authRequired,
    paymentController.createCheckoutSession.bind(paymentController)
);

export default router;
