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
        }
        return await this.#donationRepository.updateOne(filter, updateData);
    }
}
export default DonationRepositoryProxy;