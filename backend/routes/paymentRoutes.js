import { Router } from "express";
import PaymentController from "../controllers/paymentController.js";
import authRequired from "../middlewares/authRequiredMiddleware.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";

const router = Router();

router.post(
    "/create-checkout-session",
    authRequired,
    validationMiddleware,
    PaymentController.createCheckoutSession.bind(PaymentController)
);

export default router;