class Donation {
    #_id;
    #campaignId;
    #userId;
    #name;
    #email;
    #amount;
    #currency;
    #isAnonymous;
    #paidAt;
    #transactionId;
    #createdAt;
    #updatedAt;

    constructor({
        _id,
        campaignId,
        userId = null,
        name = null,
        email = null,
        amount,
        currency = "AUD",
        isAnonymous = false,
        paidAt = new Date(),
        transactionId = null,
        createdAt = new Date(),
        updatedAt = new Date(),
    }) {
        this.#_id = _id ?? null;
        this.campaignId = campaignId;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.amount = amount;
        this.currency = currency;
        this.isAnonymous = isAnonymous;
        this.paidAt = paidAt;
        this.transactionId = transactionId;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    get id() {
        return this.#_id?.toString() ?? null;
    }
    set id(value) {
        this.#_id = value ?? null;
        this.#touch();
    }

    get campaignId() {
        return this.#campaignId;
    }
    set campaignId(value) {
        if (!value) throw new Error("campaignId is required");
        this.#campaignId = value;
        this.#touch();
    }

    get userId() {
        return this.#userId;
    }
    set userId(value) {
        this.#userId = value ?? null;
        this.#touch();
    }

    get name() {
        return this.#name;
    }
    set name(value) {
        const v = value == null ? null : String(value).trim();
        this.#name = v === "" ? null : v;
        this.#touch();
    }

    get email() {
        return this.#email;
    }
    set email(value) {
        const v = value == null ? null : String(value).trim();
        if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
            throw new Error("Invalid email");
        }
        this.#email = v || null;
        this.#touch();
    }

    get amount() {
        return this.#amount;
    }
    set amount(value) {
        const n = Number(value);
        if (!Number.isFinite(n) || n < 0)
            throw new Error("amount must be a non-negative number");
        this.#amount = n;
        this.#touch();
    }

    get currency() {
        return this.#currency;
    }
    set currency(value) {
        const v = (value ?? "AUD").toString().toUpperCase();
        this.#currency = v;
        this.#touch();
    }

    get isAnonymous() {
        return this.#isAnonymous;
    }
    set isAnonymous(value) {
        this.#isAnonymous = Boolean(value);
        this.#touch();
    }

    get paidAt() {
        return this.#paidAt;
    }
    set paidAt(value) {
        this.#paidAt = value ? new Date(value) : new Date();
        this.#touch();
    }

    get transactionId() {
        return this.#transactionId;
    }

    get createdAt() {
        return this.#createdAt;
    }
    get updatedAt() {
        return this.#updatedAt;
    }

    getDisplayName() {
        if (this.#isAnonymous) return "Anonymous";
        return this.#name || this.#email || "Supporter";
    }

    isPaid() {
        return (
            !!this.#paidAt && !Number.isNaN(new Date(this.#paidAt).getTime())
        );
    }

    static fromRequest(body) {
        return new Donation({
            _id: body._id ?? null,
            campaignId: body.campaignId,
            userId: body.userId ?? null,
            name: body.name ?? null,
            email: body.email ?? null,
            amount: body.amount,
            currency: body.currency ?? "AUD",
            isAnonymous: body.isAnonymous ?? false,
            paidAt: body.paidAt ?? new Date(),
            transactionId: body.transactionId ?? null,
            createdAt: body.createdAt ?? new Date(),
            updatedAt: body.updatedAt ?? new Date(),
        });
    }

    static fromDocument(doc) {
        if (!doc) return null;
        const plain = typeof doc.toObject === "function" ? doc.toObject() : doc;
        return new Donation({
            _id: plain._id,
            campaignId: plain.campaignId,
            userId: plain.userId ?? null,
            name: plain.name ?? null,
            email: plain.email ?? null,
            amount: plain.amount,
            currency: plain.currency ?? "AUD",
            isAnonymous: plain.isAnonymous ?? false,
            paidAt: plain.paidAt ?? plain.createdAt ?? new Date(),
            transactionId: plain.transactionId ?? null,
            createdAt: plain.createdAt ?? new Date(),
            updatedAt: plain.updatedAt ?? new Date(),
        });
    }

    toJSON() {
        return {
            _id: this.#_id,
            campaignId: this.#campaignId,
            userId: this.#userId,
            name: this.#name,
            email: this.#email,
            amount: this.#amount,
            currency: this.#currency,
            isAnonymous: this.#isAnonymous,
            paidAt: this.#paidAt,
            transactionId: this.#transactionId,
            createdAt: this.#createdAt,
            updatedAt: this.#updatedAt,
            displayName: this.getDisplayName(),
            isPaid: this.isPaid(),
        };
    }

    toInsertDB() {
        return {
            _id: this.#_id ?? undefined,
            campaignId: this.#campaignId,
            userId: this.#userId,
            name: this.#name,
            email: this.#email,
            amount: this.#amount,
            currency: this.#currency,
            isAnonymous: this.#isAnonymous,
            paidAt: this.#paidAt,
            transactionId: this.#transactionId,
            createdAt: this.#createdAt,
            updatedAt: this.#updatedAt,
        };
    }

    toUpdateDB() {
        return {
            $set: {
                campaignId: this.#campaignId,
                userId: this.#userId,
                name: this.#name,
                email: this.#email,
                amount: this.#amount,
                currency: this.#currency,
                isAnonymous: this.#isAnonymous,
                paidAt: this.#paidAt,
                transactionId: this.#transactionId,
                updatedAt: new Date(),
            },
        };
    }

    #touch() {
        this.#updatedAt = new Date();
    }
}

export default Donation;