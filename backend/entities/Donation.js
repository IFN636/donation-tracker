class Donation {
    #_id;
    #campaign;
    #donor;
    #receiver;
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
        campaign,
        donor = null,
        receiver = null,
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
        this.setCampaign(campaign);
        this.setDonor(donor);
        this.setReceiver(receiver);
        this.setName(name);
        this.setEmail(email);
        this.setAmount(amount);
        this.setCurrency(currency);
        this.setIsAnonymous(isAnonymous);
        this.setPaidAt(paidAt);
        this.setTransaction(transactionId);
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    // --- Getters giữ nguyên ---
    get id() {
        return this.#_id?.toString() ?? null;
    }

    get campaign() {
        return this.#campaign;
    }

    get donor() {
        return this.#donor;
    }

    get receiver() {
        return this.#receiver;
    }

    get name() {
        return this.#name;
    }

    get email() {
        return this.#email;
    }

    get amount() {
        return this.#amount;
    }

    get currency() {
        return this.#currency;
    }

    get isAnonymous() {
        return this.#isAnonymous;
    }

    get paidAt() {
        return this.#paidAt;
    }

    get transaction() {
        return this.#transactionId;
    }

    get createdAt() {
        return this.#createdAt;
    }

    get updatedAt() {
        return this.#updatedAt;
    }

    setId(value) {
        this.#_id = value ?? null;
        this.#touch();
    }

    setCampaign(value) {
        if (!value) throw new Error("campaign is required");
        this.#campaign = value;
        this.#touch();
    }

    setDonor(value) {
        this.#donor = value ?? null;
        this.#touch();
    }

    setReceiver(value) {
        this.#receiver = value ?? null;
        this.#touch();
    }

    setName(value) {
        const v = value == null ? null : String(value).trim();
        this.#name = v === "" ? null : v;
        this.#touch();
    }

    setEmail(value) {
        const v = value == null ? null : String(value).trim();
        if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
            throw new Error("Invalid email");
        }
        this.#email = v || null;
        this.#touch();
    }

    setAmount(value) {
        const n = Number(value);
        if (!Number.isFinite(n) || n < 0)
            throw new Error("amount must be a non-negative number");
        this.#amount = n;
        this.#touch();
    }

    setCurrency(value) {
        const v = (value ?? "AUD").toString().toUpperCase();
        this.#currency = v;
        this.#touch();
    }

    setIsAnonymous(value) {
        this.#isAnonymous = Boolean(value);
        this.#touch();
    }

    setPaidAt(value) {
        this.#paidAt = value ? new Date(value) : new Date();
        this.#touch();
    }

    setTransaction(value) {
        this.#transactionId = value ?? null;
        this.#touch();
    }

    // --- Domain logic ---
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
            campaign: body.campaignId,
            donor: body.userId ?? null,
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
            campaign: plain.campaignId,
            donor: plain.userId ?? null,
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
            campaign: this.#campaign,
            donor: this.#donor,
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
            campaign: this.#campaign,
            receiver: this.#receiver,
            donor: this.#donor,
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
                campaign: this.#campaign,
                donor: this.#donor,
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
