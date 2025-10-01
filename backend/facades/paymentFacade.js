import Stripe from "stripe";
import {
    PaymentProcessor,
    PayPalStrategy,
    StripeStrategy,
} from "../strategies/paymentStrategy.js";

class PaymentFacade {
    constructor() {
        this.processor = new PaymentProcessor();
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    }

    async payWithStripe({ campaign, amount, user, isAnonymous, currency }) {
        this.processor.setStrategy(new StripeStrategy(this.stripe));
        return this.processor.pay({
            campaign,
            amount,
            user,
            isAnonymous,
            currency,
        });
    }

    async payWithPayPal({ campaign, amount, user, isAnonymous, currency }) {
        this.processor.setStrategy(new PayPalStrategy());
        return this.processor.pay({
            campaign,
            amount,
            user,
            isAnonymous,
            currency,
        });
    }
}

export default new PaymentFacade();
