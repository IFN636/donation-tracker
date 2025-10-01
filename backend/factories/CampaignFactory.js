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
        console.log("CampaignFactory body", body);
        return this.create({
            title: title.trim(),
            description: description.trim(),
            goalAmount: Number(goalAmount),
            currency: String(currency),
            deadline: deadline,
            imageUrl: String(imageUrl),
            createdBy: String(createdBy),
            createdAt: createdAt,
            updatedAt: updatedAt,
        });
    }

    static create(data) {
        return new Campaign(data);
    }

    static toObject(campaign) {
        if (!campaign) return null;
        return {
            _id: campaign._id,
            title: campaign.title,
            description: campaign.description,
            goalAmount: campaign.goalAmount,
            currency: campaign.currency,
            deadline: campaign.deadline,
            imageUrl: campaign.imageUrl,
            createdBy: campaign.createdBy,
            createdAt: campaign.createdAt,
            updatedAt: campaign.updatedAt,
        };
    }

    static toObjects(campaigns) {
        if (!Array.isArray(campaigns)) return [];
        return campaigns.map((campaign) => this.toObject(campaign));
    }
}

export default CampaignFactory;
