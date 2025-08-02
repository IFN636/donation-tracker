import { Router } from "express";
import {
    getProfile,
    loginUser,
    registerUser,
    updateUserProfile,
} from "../controllers/authController";
import { authRequired } from "../middleware/authMiddleware";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authRequired, getProfile);
router.put("/profile", authRequired, updateUserProfile);

export default router;
