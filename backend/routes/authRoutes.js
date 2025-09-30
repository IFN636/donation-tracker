import { Router } from "express";
import AuthController from "../controllers/authController.js";
import { authRequired } from "../middleware/authMiddleware.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import { loginValidation, registerValidation } from "../utils/validation.js";
const router = Router();

// const authController = new AuthController();

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

export default router;
