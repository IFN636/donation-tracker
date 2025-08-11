import { compare, genSalt, hash } from "bcrypt";
import { Schema, model } from "mongoose";
    
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    stripeCustomerId: {
        type: String,
        index: true,
        sparse: true,
        default: null,
    },
    paymentMethods: [
        {
            provider: { type: String, enum: ["stripe"], default: "stripe" },
            stripePaymentMethodId: { type: String },
            brand: String,
            last4: String,
            expMonth: Number,
            expYear: Number,
            country: String,
            isDefault: { type: Boolean, default: false },
            addedAt: { type: Date, default: Date.now },
        },
    ],
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await compare(candidatePassword, this.password);
};

const User = model("User", userSchema);
export default User;
