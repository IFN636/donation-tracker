class CampaignRepositoryProxy {
    #campaignRepository;
    constructor(campaignRepository, currentUser = null) {
        this.#campaignRepository = campaignRepository;
        this.user = currentUser;
    }

    async create(data) {
        const insertData = { ...data };
        if (this.user) {
            insertData.createdBy = this.user._id;
        } else {
            throw new Error("User must be authenticated to create a campaign.");
        }
        return await this.#campaignRepository.create(insertData);
    }

    async updateOne(filter, update) {
        const updateData = { ...update };
        let campaign = await this.#campaignRepository.findOne(filter);
        if (
            this.user.role === "admin" ||
            (this.user &&
                campaign &&
                campaign.createdBy.toString() === this.user._id.toString())
        ) {
            updateData.updatedBy = this.user._id;
            updateData.updatedAt = new Date();
            return await this.#campaignRepository.updateOne(filter, updateData);
        }
        throw new Error("User must be authenticated to update a campaign.");
    }

    async deleteOne(filter) {
        const campaign = await this.#campaignRepository.findOne(filter);
        if (
            this.user.role === "admin" ||
            (this.user &&
                campaign &&
                campaign.createdBy.toString() === this.user._id.toString())
        ) {
            return await this.#campaignRepository.deleteOne(filter);
        } else {
            throw new Error("User must be authenticated to delete a campaign.");
        }
    }
    async deleteById(campaignId) {
        const campaign = await this.#campaignRepository.findOne({
            _id: campaignId,
        });
        if (
            this.user.role === "admin" ||
            (this.user &&
                campaign &&
                campaign.createdBy.toString() === this.user._id.toString())
        ) {
            return await this.#campaignRepository.deleteOne({
                _id: campaignId,
            });
        } else {
            throw new Error("User must be authenticated to delete a campaign.");
        }
    }
}

export default CampaignRepositoryProxy;
