import Campaign from "../models/Campaign.js";
import BaseRepository from "./baseRepository.js";

class CampaignRepository extends BaseRepository {
    constructor() {
        super(Campaign);
    }

    // TODO: Add campaign-specific methods as needed
}

export default CampaignRepository;
