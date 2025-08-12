import { Router } from "express";
import {
    createFundingNeed,
    getFundingNeeds,
} from "../controllers/fundingNeedController.js";
import { authRequired, requiredRoles } from "../middleware/authMiddleware.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import { createFundingNeedValidation } from "../utils/validation.js";

const router = Router();

router.post(
    "/",
    authRequired,
    requiredRoles("user", "admin"),
    createFundingNeedValidation,
    validationMiddleware,
    createFundingNeed
);
router.get("/", getFundingNeeds);

export default router;
