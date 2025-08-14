import { Schema, model } from "mongoose";

const donationSchema = new Schema(
    {
        fundingNeedId: {
            type: Schema.Types.ObjectId,
            ref: "FundingNeed",
            index: true,
            required: true,
        },
        user: { type: Schema.Types.ObjectId, ref: "User", default: null },
        name: { type: String, trim: true, default: null },
        email: { type: String, trim: true, default: null },
        amount: { type: Number, required: true, min: 0 },
        currency: { type: String, default: "AUD", uppercase: true },
        message: { type: String, trim: true },
        isAnonymous: { type: Boolean, default: false },
        paidAt: { type: Date, default: Date.now, index: true },
        paymentMethod: {
            type: String,
            enum: ["card", "bank", "paypal", "other"],
            default: "other",
        },
        transactionId: { type: String, index: true },
    },
    { timestamps: true }
);

donationSchema.index({ fundingNeedId: 1, paidAt: -1 });
const Donation = model("Donation", donationSchema);

export default Donation;
