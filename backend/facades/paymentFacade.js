import StripeAdapter from "../adapters/stripeAdapter.js";
import {
    PaymentProcessor,
    PayPalStrategy,
    StripeStrategy,
} from "../strategies/paymentStrategy.js";

export const PAYMENT_METHODS = {
    STRIPE: "stripe",
    PAYPAL: "paypal",
};

class PaymentFacade {
    constructor() {
        this.processor = new PaymentProcessor();
        this.stripeAdapter = new StripeAdapter(process.env.STRIPE_SECRET_KEY);
        this.paypal = null; // Init PayPal Adapter later
    }

    async payWithStripe({
        campaign,
        amount,
        donationId,
        successUrl,
        cancelUrl,
        user,
        isAnonymous,
        currency,
    }) {
        this.processor.setStrategy(new StripeStrategy(this.stripeAdapter));
        return this.processor.pay({
            campaign,
            amount,
            donationId,
            successUrl,
            cancelUrl,
            user,
            isAnonymous,
            currency,
        });
    }

    async payWithPayPal({
        campaign,
        amount,
        donationId,
        successUrl,
        cancelUrl,
        user,
        isAnonymous,
        currency,
    }) {
        this.processor.setStrategy(new PayPalStrategy(this.paypal));
        return this.processor.pay({
            campaign,
            amount,
            donationId,
            successUrl,
            cancelUrl,
            user,
            isAnonymous,
            currency,
        });
    }
}

export default new PaymentFacade();
