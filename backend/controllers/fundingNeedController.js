import FundingNeed from "../models/FundingNeed.js";
import DonationRepository from "../repositories/donationRepository.js";
import FundingNeedRepository from "../repositories/fundingNeedRepository.js";

class FundingNeedController {
    constructor() {
        this._fundingNeedRepository = new FundingNeedRepository();
        this._donationRepository = new DonationRepository();
    }

    async createFundingNeed(req, res) {
        const { title, description, goalAmount, currency, deadline, imageUrl } =
            req.body;

        try {
            const fundingNeed = await this._fundingNeedRepository.create({
                title,
                description,
                goalAmount,
                currency,
                deadline,
                imageUrl,
                createdBy: req.user.id,
            });
            res.status(201).json({
                success: true,
                message: "Funding need created successfully",
                fundingNeed,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to create funding need",
                error: error.message,
            });
        }
    }

    async getFundingNeeds(req, res) {
        const {
            page = 1,
            limit = 10,
            search = "",
            sortBy = "createdAt",
            sortOrder = "desc",
        } = req.query;

        try {
            const [fundingNeeds, total] = await Promise.all([
                this._fundingNeedRepository.find(
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
            ]);
            res.status(200).json({
                success: true,
                total,
                page,
                limit,
                data: fundingNeeds,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get funding needs",
                error: error.message,
            });
        }
    }

    async getFundingNeedById(req, res) {
        const { id } = req.params;
        try {
            const fundingNeed = await FundingNeed.findById(id).populate(
                "createdBy"
            );
            if (!fundingNeed) {
                return res.status(404).json({
                    success: false,
                    message: "Funding need not found",
                });
            }

            res.status(200).json({
                success: true,
                data: fundingNeed,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get funding need by id",
                error: error.message,
            });
        }
    }

    async getDonorsByFundingNeedId(req, res) {
        const { fundingNeedId } = req.params;
        const {
            page = 1,
            limit = 10,
            sortBy = "amount",
            sortOrder = "desc",
        } = req.query;
        const skip = (page - 1) * limit;
        try {
            const donors = await this._donationRepository
                .find({ fundingNeedId: fundingNeedId })
                .skip(skip)
                .limit(limit)
                .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 });
            const total = await this._donationRepository.countDocuments({
                fundingNeedId: fundingNeedId,
            });
            res.status(200).json({
                success: true,
                data: donors,
                total,
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
}

export default new FundingNeedController();
