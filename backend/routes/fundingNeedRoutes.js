import { Router } from "express";
import FundingNeedController from "../controllers/fundingNeedController.js";
import { authRequired, requiredRoles } from "../middleware/authMiddleware.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import { createFundingNeedValidation } from "../utils/validation.js";

const router = Router();
const fundingNeedController = new FundingNeedController();

router.post(
    "/",
    authRequired,
    requiredRoles("user", "admin"),
    createFundingNeedValidation,
    validationMiddleware,
    fundingNeedController.createFundingNeed.bind(fundingNeedController)
);
router.get(
    "/",
    fundingNeedController.getFundingNeeds.bind(fundingNeedController)
);
router.get(
    "/:id",
    fundingNeedController.getFundingNeedById.bind(fundingNeedController)
);
router.get(
    "/:fundingNeedId/donors",
    fundingNeedController.getDonorsByFundingNeedId.bind(fundingNeedController)
);

export default router;
