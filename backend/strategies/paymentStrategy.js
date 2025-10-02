class PaymentStrategy {
    pay({
        campaign,
        amount,
        user,
        successUrl,
        cancelUrl,
        isAnonymous = false,
        currency = "aud",
    }) {
        throw new Error("This method should be overridden!");
    }
}

export class StripeStrategy extends PaymentStrategy {
    constructor(stripeAdapter) {
        if (!stripeAdapter) {
            throw new Error("Stripe adapter is required");
        }
        super();
        this.stripeAdapter = stripeAdapter;
    }

    async pay({
        campaign,
        amount,
        user,
        successUrl,
        cancelUrl,
        isAnonymous = false,
        currency = "aud",
    }) {
        const redirectUrl = `${process.env.CLIENT_URL}/fundraisers/${campaign._id}`;

        const metadata = {
            campaignId: campaign._id.toString(),
            receiverId: campaign.createdBy.toString(),
            userId: user._id.toString(),
            name: user.name,
            email: user.email,
            phone: user.phone,
            amount: amount,
            isAnonymous: isAnonymous,
            currency: currency,
        };

        return this.stripeAdapter.createCheckoutSession({
            amount,
            currency,
            customerEmail: user.email,
            successUrl: successUrl || redirectUrl,
            cancelUrl: cancelUrl || redirectUrl,
            metadata,
            description: `Donation to ${campaign.title}`,
            productName: "Donation",
        });
    }
}

export class PayPalStrategy extends PaymentStrategy {
    constructor(paypalAdapter) {
        if (!paypalAdapter) {
            throw new Error("PayPal adapter is required");
        }
        super();
        this.paypalAdapter = paypalAdapter;
    }

    pay({
        campaign,
        amount,
        user,
        successUrl,
        cancelUrl,
        currency = "aud",
        isAnonymous = false,
    }) {
        throw new Error("PayPal payment not implemented yet.");
    }
}

export class PaymentProcessor {
    setStrategy(strategy) {
        this.strategy = strategy;
    }

    pay({
        campaign,
        amount,
        user,
        successUrl,
        cancelUrl,
        currency = "aud",
        isAnonymous = false,
    }) {
        return this.strategy.pay({
            campaign,
            amount,
            user,
            isAnonymous,
            currency,
            successUrl,
            cancelUrl,
        });
    }
}
