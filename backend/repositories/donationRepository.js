import Donation from "../models/Donation.js";
import BaseRepository from "./baseRepository.js";

class DonationRepository extends BaseRepository {
    constructor() {
        super(Donation);
    }

    async findByUserId(userId) {
        return this._model.find({ userId });
    }

    async getDonorsByCampaignId(campaignId) {
        return this._model.find({ campaignId });
    }

    async getTotalDonors(userId) {
        const docs = await this._model.find({
            receiver: userId,
            donor: { $ne: null },
        });
        const uniqueDonors = new Set(docs.map((doc) => String(doc.donor)));
        return uniqueDonors.size;
    }

    async getDonorsLeaderboardByCampaignId({
        campaignId,
        limit,
        page,
        sortBy,
        sortOrder,
    }) {
        return this._model
            .find({ campaign: campaignId })
            .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(limit);
    }

    async getRecentDonationsByCampaignId({ campaignId, limit }) {
        return this._model
            .find({ campaignId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .toJSON();
    }

    async getRecentDonationsByDonorId({ user, limit = 5 }) {
        return await this._model
            .find({ user })
            .populate("campaign")
            .sort({ createdAt: -1 })
            .limit(limit);
    }

    async getRecentDonationsByCreatorId({ receiver, limit = 5 }) {
        return await this._model
            .find({ receiver })
            .populate("campaign")
            .sort({ createdAt: -1 })
            .limit(limit);
    }
}

export default DonationRepository;
