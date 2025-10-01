class DonationRepositoryProxy {
    #donationRepository;
    constructor(donationRepository, currentUser = null) {
        this.#donationRepository = donationRepository;
        this.user = currentUser;
    }

    async create(data) {
        const insertData = { ...data };
        if (this.user) {
            insertData.createdBy = this.user._id;
        } else {
            throw new Error("User must be authenticated to create a donation.");
        }
        return await this.#donationRepository.create(insertData);
    }

    async update(filter, update) {
        const updateData = { ...update };
        if (this.user) {
            updateData.updatedBy = this.user._id;
        } else {
            throw new Error("User must be authenticated to update a donation.");
        }import Donation from "../models/Donation.js";
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
}

export default DonationRepository;
        return await this.#donationRepository.updateOne(filter, updateData);
    }
}
export default DonationRepositoryProxy;