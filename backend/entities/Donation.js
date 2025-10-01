class Donation {
    #id;
    #amount;
    #currency;
    #campaignId;
    #userId;
    #name;
    #email;
    #isAnonymous;
    #paidAt;
    #transactionId;

    constructor({
        id,
        amount,
        currency,
        campaignId,
        userId,
        name,
        email,
        isAnonymous = false,
        paidAt = null,
        transactionId = null,
    }) {
        this.#id = id;
        this.#amount = amount;
        this.#currency = currency;
        this.#campaignId = campaignId;
        this.#userId = userId;
        this.#name = name;
        this.#email = email;
        this.#isAnonymous = isAnonymous;
        this.#paidAt = paidAt;
        this.#transactionId = transactionId;
    }

    getId() {
        return this.#id;
    }

    getAmount() {
        return this.#amount;
    }

    getCurrency() {
        return this.#currency;
    }

    getCampaignId() {
        return this.#campaignId;
    }

    getUserId() {
        return this.#userId;
    }

    getDonorName() {
        return this.#isAnonymous ? "Anonymous" : this.#name;
    }

    markAsPaid(transactionId) {
        this.#transactionId = transactionId;
        this.#paidAt = new Date();
    }

    toJSON() {
        return {
            id: this.#id,
            amount: this.#amount,
            currency: this.#currency,
            campaignId: this.#campaignId,
            userId: this.#userId,
            name: this.getDonorName(),
            email: this.#isAnonymous ? undefined : this.#email,
            isAnonymous: this.#isAnonymous,
            paidAt: this.#paidAt,
            transactionId: this.#transactionId,
        };
    }
}

export default Donation;
