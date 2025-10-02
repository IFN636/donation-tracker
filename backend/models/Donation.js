import { Schema, model } from "mongoose";

const donationSchema = new Schema(
    {
        campaign: {
            type: Schema.Types.ObjectId,
            ref: "Campaign",
            index: true,
            required: true,
        },
        donor: { type: Schema.Types.ObjectId, ref: "User", default: null },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: { type: String, trim: true, default: null },
        email: { type: String, trim: true, default: null },
        amount: { type: Number, required: true, min: 0 },
        currency: { type: String, default: "AUD", uppercase: true },
        isAnonymous: { type: Boolean, default: false },
        paidAt: { type: Date, default: Date.now, index: true },
        transaction: { type: String, index: true, ref: "Transaction" },
    },
    { timestamps: true }
);

donationSchema.index({ campaign: 1, paidAt: -1 });
donationSchema.index({ user: 1, paidAt: -1 });
donationSchema.index({ receiver: 1, paidAt: -1 });
const Donation = model("Donation", donationSchema);

export default Donation;
