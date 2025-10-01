import Campaign from "../entities/Campaign.js";

class CampaignFactory {
    static fromRequest(body) {
        const {
            title,
            description,
            goalAmount,
            currency,
            deadline,
            imageUrl,
            createdBy,
            createdAt = new Date(),
            updatedAt = new Date(),
        } = body;
        return {
            title: title.trim(),
            description: description,
            goalAmount: Number(goalAmount),
            currency: currency,
            deadline: deadline,
            imageUrl: imageUrl,
            createdBy: createdBy,
            createdAt: createdAt,
            updatedAt: updatedAt,
        };
    }

    static create(data) {
        return new Campaign(data);
    }
}

export default CampaignFactory;