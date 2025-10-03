import Campaign from "../models/Campaign.js";
import BaseRepository from "./baseRepository.js";

class CampaignRepository extends BaseRepository {
    constructor() {
        super(Campaign);
    }

    async sumCurrentAmount(userId) {
        const result = await this._model.find({ createdBy: userId });
        const total = result.reduce((sum, doc) => {
            return sum + (doc.currentAmount ?? 0);
        }, 0);

        return total;
    }

    // TODO: Add campaign-specific methods as needed
}

export default CampaignRepository;
