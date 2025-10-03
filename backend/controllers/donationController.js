import DonationRepository from "../repositories/donationRepository.js";

class DonationController {
    constructor() {
        this._donationRepository = new DonationRepository();
    }

    async getRecentDonationsByCampaignId(req, res) {
        const { campaignId } = req.params;
        const { limit = 5 } = req.query;
        try {
            if (!campaignId) {
                return res.status(400).json({
                    success: false,
                    message: "campaignId parameter is required",
                });
            }

            const donations =
                await this._donationRepository.getRecentDonationsByCampaignId({
                    campaignId,
                    limit,
                });
            res.status(200).json({
                success: true,
                data: donations,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Your recent donations as a donor, who donated to others
    async getRecentDonationsByDonorId(req, res) {
        const { limit = 5 } = req.query;
        try {
            const donations =
                await this._donationRepository.getRecentDonationsByDonorId({
                    userId: req.user.id,
                    limit,
                });
            res.status(200).json({
                success: true,
                data: donations,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Recent donations to your campaigns as a creator
    async getRecentDonationsByCreatorId(req, res) {
        const { limit = 5 } = req.query;
        try {
            const donations =
                await this._donationRepository.getRecentDonationsByCreatorId({
                    receiver: req.user.id,
                    limit,
                });
            res.status(200).json({
                success: true,
                data: donations,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async getDonationById(req, res) {
        const { donationId } = req.params;
        try {
            if (!donationId) {
                return res.status(400).json({
                    success: false,
                    message: "donationId parameter is required",
                });
            }
            const donation = await this._donationRepository.findOneById(
                donationId
            );
            if (!donation) {
                return res.status(404).json({
                    success: false,
                    message: "Donation not found",
                });
            }
            res.status(200).json(donation);
        } catch (error) {
            console.error("Error fetching donation:", error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}
export default new DonationController();
