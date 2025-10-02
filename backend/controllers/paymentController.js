import { stripeAdapter } from "../adapters/stripeAdapter.js";
import PaymentFacade from "../facades/paymentFacade.js";
import CampaignFactory from "../factories/CampaignFactory.js";
import DonationFactory from "../factories/DonationFactory.js";
import TransactionFactory from "../factories/TransactionFactory.js";
import CampaignRepository from "../repositories/campaignRepository.js";
import DonationRepository from "../repositories/donationRepository.js";
import TransactionRepository from "../repositories/transactionRepository.js";

class PaymentController {
    constructor() {
        this.campaignRepository = new CampaignRepository();
        this.transactionRepository = new TransactionRepository();
        this.donationRepository = new DonationRepository();
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

            const transaction = TransactionFactory.create({
                campaign: campaignId,
                checkoutSessionId: checkoutSession.sessionId,
                status: "pending",
                currency: currency,
                amount: amount,
            });

            await this.transactionRepository.create(transaction.toInsertDB());

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
                    const receiverId = metadata.receiverId;

                    let campaign = await this.campaignRepository.findOneById(
                        campaignId
                    );

                    if (!campaign) {
                        return res.status(404).json({
                            success: false,
                            message: "Failed to find campaign",
                        });
                    }

                    campaign = CampaignFactory.create(campaign);
                    campaign.currentAmount = amount + campaign.currentAmount;
                    campaign.backers = campaign.backers + 1;

                    await this.campaignRepository.updateOne(
                        { _id: campaignId },
                        {
                            currentAmount: campaign.currentAmount,
                            backers: campaign.backers,
                        }
                    );

                    const transaction =
                        await this.transactionRepository.updateOne(
                            { checkoutSessionId: checkoutSessionId },
                            {
                                status: "completed",
                                amount: amount,
                                paymentMethod: paymentMethod,
                            }
                        );

                    const donation = DonationFactory.create({
                        campaign: campaignId,
                        donor: userId,
                        name: name,
                        email: email,
                        amount: amount,
                        currency: currency,
                        transaction: transaction._id,
                        receiver: receiverId,
                        isAnonymous: isAnonymous,
                    });
                    await this.donationRepository.create(donation.toInsertDB());
                    break;
                case "payment_intent.succeeded":
                    // TODO: Handle payment intent succeeded
                    break;
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }

            res.json({ received: true });
        }
    }
}

export default new PaymentController();
