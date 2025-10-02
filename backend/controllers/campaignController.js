import CampaignFactory from "../factories/CampaignFactory.js";
import Campaign from "../models/Campaign.js";
import CampaignRepositoryProxy from "../proxies/campaignRepositoryProxy.js";
import CampaignRepository from "../repositories/campaignRepository.js";
import DonationRepository from "../repositories/donationRepository.js";

class CampaignController {
    constructor() {
        this._campaignRepository = new CampaignRepository();
        this._donationRepository = new DonationRepository();
    }

    async createCampaign(req, res) {
        try {
            const campaignData = CampaignFactory.fromRequest({
                ...req.body,
                createdBy: req.user.id,
            });

            // Use proxy to enforce business rules
            const campaignRepositoryProxy = new CampaignRepositoryProxy(
                this._campaignRepository,
                req.user
            );

            const campaign = await campaignRepositoryProxy.create(
                campaignData.toInsertDB()
            );

            res.status(201).json({
                success: true,
                message: "Campaign created successfully",
                campaign,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to create campaign",
                error: error.message,
            });
        }
    }

    async getCampaigns(req, res) {
        const {
            page = 1,
            limit = 10,
            search = "",
            sortBy = "createdAt",
            sortOrder = "desc",
        } = req.query;

        try {
            const [campaigns, total] = await Promise.all([
                this._campaignRepository.find(
                    {
                        title: { $regex: search, $options: "i" },
                    },
                    {
                        populate: "createdBy",
                        skip: (page - 1) * limit,
                        limit: limit,
                        sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 },
                    }
                ),
                this._campaignRepository.count(),
            ]);
            res.status(200).json({
                success: true,
                total: Number(total),
                page: Number(page),
                limit: Number(limit),
                data: campaigns,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get campaigns",
                error: error.message,
            });
        }
    }

    async getCampaignById(req, res) {
        const { id } = req.params;
        try {
            const campaign = await Campaign.findById(id).populate("createdBy");
            if (!campaign) {
                return res.status(404).json({
                    success: false,
                    message: "Campaign not found",
                });
            }

            res.status(200).json({
                success: true,
                data: campaign,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get campaign by id",
                error: error.message,
            });
        }
    }

    async getDonorsByCampaignId(req, res) {
        const { campaignId } = req.params;
        const {
            page = 1,
            limit = 5,
            sortBy = "amount",
            sortOrder = "desc",
        } = req.query;
        try {
            const [donors, total] = await Promise.all([
                this._donationRepository.getDonorsLeaderboardByCampaignId({
                    campaignId,
                    limit,
                    page,
                    sortBy,
                    sortOrder,
                }),
                this._donationRepository.count({ campaignId: campaignId }),
            ]);
            res.status(200).json({
                success: true,
                data: donors,
                total: total,
                page,
                limit,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async getCampaignStats(req, res) {
        const { id } = req.params;
        try {
            const campaign = await Campaign.findById(id);
            if (!campaign) {
                return res.status(404).json({
                    success: false,
                    message: "Campaign not found",
                });
            }
            const totalDonations =
                await this._donationRepository.getTotalDonationsByCampaignId(
                    id
                );
            const totalDonors =
                await this._donationRepository.getTotalDonorsByCampaignId(id);
            res.status(200).json({
                success: true,
                data: {
                    totalDonations,
                    totalDonors,
                },
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get campaign stats",
                error: error.message,
            });
        }
    }

    async getOwnedCampaigns(req, res) {
        const {
            page = 1,
            limit = 8,
            search = "",
            sortBy = "createdAt",
            sortOrder = "desc",
        } = req.query;
        try {
            const userId = req.user.id;
            const paginatedCampaigns =
                await this._campaignRepository.findWithPagination(
                    {
                        createdBy: userId,
                        title: { $regex: search, $options: "i" },
                    },
                    page,
                    limit,
                    {
                        populate: {
                            path: "createdBy",
                            select: "email name",
                        },
                        sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 },
                    }
                );
            res.status(200).json({
                success: true,
                ...paginatedCampaigns,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get campaigns by user",
                error: error.message,
            });
        }
    }

    async deleteCampaign(req, res) {
        const { campaignId } = req.params;
        try {
            const campaign = await this._campaignRepository.findOneById(
                campaignId
            );
            if (!campaign) {
                return res.status(404).json({
                    success: false,
                    message: "Campaign not found",
                });
            }
            await this._campaignRepository.deleteById(campaignId);
            res.status(200).json({
                success: true,
                message: "Campaign deleted successfully",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to delete campaign",
                error: error.message,
            });
        }
    }

    async updateCampaign(req, res) {
        const { id } = req.params;
        const { title, description, goalAmount, startDate, endDate } = req.body;
    }
}

export default new CampaignController();
