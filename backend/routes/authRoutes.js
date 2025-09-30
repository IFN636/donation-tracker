import { Router } from "express";
import AuthController from "../controllers/authController.js";
import { authRequired } from "../middleware/authMiddleware.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import { loginValidation, registerValidation } from "../utils/validation.js";
const router = Router();

const authController = new AuthController();

router.post(
    "/register",
    registerValidation,
    validationMiddleware,
    authController.registerUser.bind(authController)
);
router.post(
    "/login",
    loginValidation,
    validationMiddleware,
    authController.loginUser.bind(authController)
);
router.get(
    "/profile",
    authRequired,
    authController.getProfile.bind(authController)
);
router.put(
    "/profile",
    authRequired,
    authController.updateProfile.bind(authController)
);

export default router;
