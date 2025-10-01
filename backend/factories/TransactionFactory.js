import Transaction from "../entities/Transaction.js";

class TransactionFactory {
    static fromRequest(body) {
        return new Transaction({ ...body });
    }

    static create(transaction) {
        return new Transaction({ ...transaction });
    }

    static toObject(transaction) {
        return {
            _id: transaction._id,
            donationId: transaction.donationId,
            donation: transaction.donation ?? null,
            campaign: transaction.campaign ?? null,
            campaignId: transaction.campaignId,
            checkoutSessionId: transaction.checkoutSessionId,
            chargeId: transaction.chargeId,
            customerId: transaction.customerId,
            status: transaction.status,
            amount: transaction.amount,
            paymentMethod: transaction.paymentMethod,
            currency: transaction.currency,
            paidAt: transaction.paidAt,
            cardBrand: transaction.cardBrand,
            cardLast4: transaction.cardLast4,
        };
    }

    static toObjects(transactions) {
        return transactions.map((transaction) => this.toObject(transaction));
    }
}

export default TransactionFactory;