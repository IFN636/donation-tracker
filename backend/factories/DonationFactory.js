class DonationFactory {
    static fromRequest(body) {
        const {
            amount,
            currency,
            campaignId,
            userId,
            name,
            email,
            isAnonymous,
            paidAt,
            transactionId,
        } = body;
        return this.create({
            amount: Number(amount),
            currency: String(currency),
            campaignId: String(campaignId),
            userId: String(userId),
            name: String(name),
            email: String(email),
            isAnonymous: Boolean(isAnonymous),
            paidAt: paidAt,
            transactionId: String(transactionId),
        });
    }

    static create(data) {
        return new Donation(data);
    }

    static toObject(donation) {
        return {
            _id: donation._id,
            campaignId: donation.campaignId,
            userId: donation.userId,
            name: donation.name,
            email: donation.email,
        };
    }

    static toObjects(donations) {
        return donations.map((donation) => this.toObject(donation));
    }
}

export default DonationFactory;