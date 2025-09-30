import { Router } from "express";
import CampaignController from "../controllers/campaignController.js";
import { authRequired, requiredRoles } from "../middleware/authMiddleware.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import { createCampaignValidation } from "../utils/validation.js";

const router = Router();

router.post(
    "/",
    authRequired,
    requiredRoles("user", "admin"),
    createCampaignValidation,
    validationMiddleware,
    CampaignController.createCampaign.bind(CampaignController)
);
router.get("/", CampaignController.getCampaigns.bind(CampaignController));
router.get("/:id", CampaignController.getCampaignById.bind(CampaignController));
router.get(
    "/:campaignId/donors",
    CampaignController.getDonorsByCampaignId.bind(CampaignController)
);

export default router;
