import User from "./User.js";

class Participant extends User {
    #campaigns;
    #donations;
    #role;

    constructor({
        id,
        name,
        lastName,
        email,
        password,
        address = "",
        stripeCustomerId = "",
        paymentMethods = [],
    }) {
        super({
            id,
            name,
            lastName,
            email,
            password,
            address,
            stripeCustomerId,
            paymentMethods,
        });
        this.#role = "participant";
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

    getRole() {
        return this.#role;
    }

    toJSON() {
        return {
            id: this.getId(),
            name: this.getFullName(),
            email: this.getEmail(),
            address: this.getAddress(),
            role: this.getRole(),
            campaigns: this.#campaigns,
            donations: this.#donations,
            paymentMethods: this.getPaymentMethods(),
        };
    }
}

export default Participant;
