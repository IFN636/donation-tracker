import { Router } from "express";
import AuthController from "../controllers/authController.js";
import authRequired from "../middlewares/authRequiredMiddleware.js";
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
    authRequired,
    AuthController.registerUser.bind(AuthController)
);
router.post(
    "/login",
    loginValidation,
    authRequired,
    AuthController.loginUser.bind(AuthController)
);

export default router;
