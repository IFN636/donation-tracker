import { Router } from "express";
import AuthController from "../controllers/authController.js";
import authRequired from "../middlewares/authRequiredMiddleware.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";
import { loginValidation, registerValidation } from "../utils/validation.js";

const router = Router();

router.get(
    "/profile",
    authRequired,
    AuthController.getProfile.bind(AuthController)
);
router.put(
    "/profile",
    authRequired,
    AuthController.updateProfile.bind(AuthController)
);

router.post(
    "/register",
    registerValidation,
    validationMiddleware,
    AuthController.registerUser.bind(AuthController)
);
router.post(
    "/login",
    loginValidation,
    validationMiddleware,
    AuthController.loginUser.bind(AuthController)
);

export default router;
