import { Router } from "express";
import FundingNeedController from "../controllers/fundingNeedController.js";
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
    FundingNeedController.createFundingNeed.bind(FundingNeedController)
);
router.get(
    "/",
    FundingNeedController.getFundingNeeds.bind(FundingNeedController)
);
router.get(
    "/:id",
    FundingNeedController.getFundingNeedById.bind(FundingNeedController)
);
router.get(
    "/:fundingNeedId/donors",
    FundingNeedController.getDonorsByFundingNeedId.bind(FundingNeedController)
);

export default router;
