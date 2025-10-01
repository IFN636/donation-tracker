const mongoose = require("mongoose");

const mailTemplateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    subject: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: [
            "welcome",
            "password_reset",
            "donation_receipt",
            "campaign_update",
        ],
        default: "welcome",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

mailTemplateSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const MailTemplate = mongoose.model("MailTemplate", mailTemplateSchema);

export default MailTemplate;
