import User, { ROLE } from "./User.js";

class Participant extends User {
    #campaigns;
    #donations;

    constructor({ id, name, lastName, email, password, address = "" }) {
        super({
            id,
            name,
            lastName,
            email,
            password,
            address,
            role: ROLE.PARTICIPANT,
        });
        this.#campaigns = [];
        this.#donations = [];
    }

    createCampaign(campaignData) {
        const campaign = {
            id: campaignData.id,
            title: campaignData.title,
            goalAmount: campaignData.goalAmount,
            createdAt: new Date(),
        };
        this.#campaigns.push(campaign);
        return campaign;
    }

    getCampaigns() {
        return this.#campaigns;
    }

    donate(campaignId, amount, currency = "AUD") {
        const donation = {
            campaignId,
            amount,
            currency,
            date: new Date(),
        };
        this.#donations.push(donation);
        return donation;
    }

    getDonations() {
        return this.#donations;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            address: this.address,
            role: this.role,
            campaigns: this.#campaigns,
            donations: this.#donations,
        };
    }
}

export default Participant;
