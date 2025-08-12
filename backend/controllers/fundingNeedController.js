import FundingNeed from "../models/FundingNeed.js";

export const createFundingNeed = async (req, res) => {
    const { title, description, goalAmount, currency, deadline, imageUrl } =
        req.body;

    try {
        const fundingNeed = await FundingNeed.create({
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
};
