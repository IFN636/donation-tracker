export class StripeStrategy {
    constructor(stripe) {
        this.stripe = stripe;
    }

    async pay({
        campaign,
        amount,
        user,
        isAnonymous = false,
        currency = "aud",
    }) {
        const redirectUrl = `${process.env.CLIENT_URL}/fundraisers/${campaign._id}`;

        const metadata = {
            campaignId: campaign._id.toString(),
            userId: user._id.toString(),
            name: user.name,
            email: user.email,
            phone: user.phone,
            amount: amount,
            isAnonymous: isAnonymous,
            currency: currency,
        };

        const checkoutSession = await this.stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency,
                        product_data: {
                            name: "Donation",
                            description: "Thank you for your support",
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],
            metadata: metadata,
            customer_email: user.email || undefined,
            success_url: redirectUrl,
            cancel_url: redirectUrl,
        });

        return { sessionId: checkoutSession.id, url: checkoutSession.url };
    }
}

export class PayPalStrategy {
    pay({ campaign, amount, user, isAnonymous = false, currency = "aud" }) {
        throw new Error("PayPal payment not implemented yet.");
    }
}

export class PaymentProcessor {
    setStrategy(strategy) {
        this.strategy = strategy;
    }

    pay({ campaign, amount, user, isAnonymous = false, currency = "aud" }) {
        return this.strategy.pay({
            campaign,
            amount,
            user,
            isAnonymous,
            currency,
        });
    }
}