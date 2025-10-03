import { compare, genSalt, hash } from "bcrypt";
import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: { type: String, required: true },
        address: { type: String, trim: true },
        phone: { type: String, trim: true },
        role: {
            type: String,
            enum: ["admin", "participant"],
            default: "participant",
        },
        isSuperAdmin: { type: Boolean, default: false },
        status: {
            type: String,
            enum: ["active", "blocked", "pending"],
            default: "active",
            index: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return compare(candidatePassword, this.password);
};

const User = model("User", userSchema);
export default User;
