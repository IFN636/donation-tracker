import Stripe from "stripe";

function stringifyMetadata(obj) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        if (value === null || value === undefined) continue;
        result[key] = String(value);
    }
    return result;
}

class StripeAdapter {
    constructor(apiKey = process.env.STRIPE_SECRET_KEY) {
        if (!apiKey) {
            throw new Error("Stripe API key is required");
        }
        this.stripe = new Stripe(apiKey);
    }

    async createCheckoutSession(input) {
        const {
            amount,
            currency = "aud",
            customerEmail,
            successUrl,
            cancelUrl,
            metadata = {},
            description = "Thank you for your support",
            productName = "Donation",
            idempotencyKey,
        } = input;

        const unitAmount = Math.round(amount * 100);

        const session = await this.stripe.checkout.sessions.create(
            {
                mode: "payment",
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: currency.toLowerCase(),
                            product_data: { name: productName, description },
                            unit_amount: unitAmount,
                        },
                        quantity: 1,
                    },
                ],
                metadata: stringifyMetadata(metadata),
                customer_email: customerEmail || undefined,
                success_url: successUrl,
                cancel_url: cancelUrl,
            },
            idempotencyKey ? { idempotencyKey } : undefined
        );

        return { sessionId: session.id, url: session.url };
    }

    async retrieveSession(sessionId) {
        return this.stripe.checkout.sessions.retrieve(sessionId);
    }

    constructWebhookEvent(payload, signature, endpointSecret) {
        return this.stripe.webhooks.constructEvent(
            payload,
            signature,
            endpointSecret
        );
    }
}
export const stripeAdapter = new StripeAdapter();
export default StripeAdapter;