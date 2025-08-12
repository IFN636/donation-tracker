import { Router } from "express";
import {
    getProfile,
    loginUser,
    registerUser,
    updateUserProfile,
} from "../controllers/authController.js";
import { authRequired } from "../middleware/authMiddleware.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import { loginValidation, registerValidation } from "../utils/validation.js";
const router = Router();

router.post(
    "/register",
    registerValidation,
    validationMiddleware,
    registerUser
);
router.post("/login", loginValidation, validationMiddleware, loginUser);
router.get("/profile", authRequired, getProfile);
router.put("/profile", authRequired, updateUserProfile);

export default router;
