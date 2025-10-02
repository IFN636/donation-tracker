import { Router } from "express";
import DonationController from "../controllers/donationController.js";
import authRequired from "../middlewares/authRequiredMiddleware.js";

const router = Router();

// router.get(
//     "/:campaignId/recent",
//     DonationController.getRecentDonationsByCampaignId.bind(DonationController)
// );

// Your recent donations as a donor
router.get(
    "/donors/recent",
    authRequired,
    DonationController.getRecentDonationsByDonorId.bind(DonationController)
);

router.get(
    "/creators/recent",
    authRequired,
    DonationController.getRecentDonationsByCreatorId.bind(DonationController)
);

export default router;
