import { Router } from "express";
import PaymentController from "../controllers/paymentController.js";
import authRequiredMiddleware from "../middlewares/authRequiredMiddleware.js";
const router = Router();

router.post(
    "/create-checkout-session",
    authRequiredMiddleware.handler,
    PaymentController.createCheckoutSession.bind(PaymentController)
);

export default router;