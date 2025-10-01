import { Schema, model } from "mongoose";

const donationSchema = new Schema(
    {
        campaignId: {
            type: Schema.Types.ObjectId,
            ref: "Campaign",
            index: true,
            required: true,
        },
        userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
        name: { type: String, trim: true, default: null },
        email: { type: String, trim: true, default: null },
        amount: { type: Number, required: true, min: 0 },
        currency: { type: String, default: "AUD", uppercase: true },
        isAnonymous: { type: Boolean, default: false },
        paidAt: { type: Date, default: Date.now, index: true },
        transactionId: { type: String, index: true },
    },
    { timestamps: true }
);

donationSchema.index({ campaignId: 1, paidAt: -1 });
const Donation = model("Donation", donationSchema);

export default Donation;