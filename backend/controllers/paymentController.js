import { stripeAdapter } from "../adapters/stripeAdapter.js";
import PaymentFacade from "../facades/paymentFacade.js";
import CampaignFactory from "../factories/CampaignFactory.js";
import CampaignRepository from "../repositories/campaignRepository.js";

class PaymentController {
    constructor() {
        this.campaignRepository = new CampaignRepository();
    }

    async createCheckoutSession(req, res) {
        const {
            amount,
            currency = "aud",
            campaignId,
            isAnonymous,
            paymentMethod = "creadit-card",
        } = req.body;
        const user = req.user;
        try {
            const campaign = await this.campaignRepository.findOneById(
                campaignId
            );

            if (!campaign) {
                return res.status(404).json({
                    success: false,
                    message: "Campaign not found",
                });
            }

            const redirectUrl = `${process.env.CLIENT_URL}/fundraisers/${campaignId}`;
            let checkoutSession;

            if (paymentMethod === "credit-card") {
                checkoutSession = await PaymentFacade.payWithStripe({
                    campaign,
                    amount,
                    user,
                    isAnonymous,
                    currency,
                    successUrl: redirectUrl,
                    cancelUrl: redirectUrl,
                });
            } else if (paymentMethod === "paypal") {
                throw new Error("PayPal payment not implemented yet.");
            }

            await Transaction.create({
                campaignId: campaignId,
                checkoutSessionId: checkoutSession.id,
                status: "pending",
                currency: currency,
                amount: amount,
            });

            console.log(checkoutSession);

            res.status(200).json({
                success: true,
                message: "Checkout session created successfully",
                data: checkoutSession,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async webhookStripe(req, res) {
        let event = req.body;
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
        if (endpointSecret) {
            const signature = req.headers["stripe-signature"];
            try {
                event = stripeAdapter.constructWebhookEvent(
                    req.body,
                    signature,
                    endpointSecret
                );
            } catch (err) {
                console.log(
                    `⚠️  Webhook signature verification failed.`,
                    err.message
                );
                return res.sendStatus(400);
            }

            switch (event.type) {
                case "checkout.session.completed":
                    const session = event.data.object;
                    const amount = session.amount_total / 100;
                    const metadata = session.metadata;
                    const campaignId = metadata.campaignId;
                    const checkoutSessionId = session.id;
                    const isAnonymous = metadata.isAnonymous;
                    const paymentMethod = metadata.paymentMethod;
                    const userId = metadata.userId;
                    const name = metadata.name;
                    const email = metadata.email;
                    const currency = metadata.currency;

                    let campaign = await this.campaignRepository.findOneById(
                        campaignId
                    );

                    if (!campaign) {
                        return res.status(404).json({
                            success: false,
                            message: "Campaign not found",
                        });
                    }

                    //Update campaign current amount and backers
                    campaign = CampaignFactory.create(campaign);
                    campaign.setCurrentAmount(
                        amount + campaign.getCurrentAmount()
                    );
                    campaign.setBackers(campaign.getBackers() + 1);

                    const transaction = await Transaction.findOneAndUpdate(
                        { checkoutSessionId: checkoutSessionId },
                        {
                            status: "completed",
                            amount: amount,
                            paymentMethod: paymentMethod,
                        }
                    );

                    await Donation.create({
                        fundingNeedId: fundingNeedId,
                        userId: userId,
                        name: name,
                        email: email,
                        amount: amount,
                        currency: currency,
                        transactionId: transaction._id,
                        isAnonymous: isAnonymous,
                    });

                    break;

                case "payment_intent.succeeded":
                    const intent = event.data.object;
                    const amountPI = intent.amount_received;
                    break;

                default:
                    console.log(`Unhandled event type ${event.type}`);
            }

            // Return a response to acknowledge receipt of the event
            res.json({ received: true });
        }
    }
}

export default new PaymentController();