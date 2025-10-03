class Transaction {
    #_id;
    #donation;
    #campaign;
    #checkoutSessionId;
    #chargeId;
    #paymentMethod;
    #status;
    #amount;
    #currency;
    #paidAt;
    #cardBrand;
    #cardLast4;
    #createdAt;
    #updatedAt;

    constructor({
        _id = null,
        donation = null,
        campaign = null,
        checkoutSessionId,
        chargeId = null,
        paymentMethod = null,
        status,
        amount,
        currency = "AUD",
        paidAt = null,
        cardBrand = null,
        cardLast4 = null,
        createdAt = new Date(),
        updatedAt = new Date(),
    }) {
        this.#_id = _id;
        this.setDonation(donation);
        this.setCampaign(campaign);
        this.setCheckoutSessionId(checkoutSessionId);
        this.setChargeId(chargeId);
        this.setPaymentMethod(paymentMethod);
        this.setStatus(status);
        this.setAmount(amount);
        this.setCurrency(currency);
        this.setPaidAt(paidAt);
        this.setCardBrand(cardBrand);
        this.setCardLast4(cardLast4);
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    // --- Getters giữ nguyên ---
    get id() {
        return this.#_id?.toString() ?? null;
    }
    get donation() {
        return this.#donation;
    }
    get campaign() {
        return this.#campaign;
    }
    get checkoutSessionId() {
        return this.#checkoutSessionId;
    }
    get chargeId() {
        return this.#chargeId;
    }
    get paymentMethod() {
        return this.#paymentMethod;
    }
    get status() {
        return this.#status;
    }
    get amount() {
        return this.#amount;
    }
    get currency() {
        return this.#currency;
    }
    get paidAt() {
        return this.#paidAt;
    }
    get cardBrand() {
        return this.#cardBrand;
    }
    get cardLast4() {
        return this.#cardLast4;
    }
    get createdAt() {
        return this.#createdAt;
    }
    get updatedAt() {
        return this.#updatedAt;
    }

    // --- Setter -> method ---
    setId(v) {
        this.#_id = v ?? null;
        this.#touch();
    }
    setDonation(v) {
        this.#donation = v ?? null;
        this.#touch();
    }
    setCampaign(v) {
        this.#campaign = v ?? null;
        this.#touch();
    }
    setCheckoutSessionId(v) {
        if (!v) throw new Error("checkoutSessionId required");
        this.#checkoutSessionId = String(v).trim();
        this.#touch();
    }
    setChargeId(v) {
        this.#chargeId = v ? String(v).trim() : null;
        this.#touch();
    }
    setPaymentMethod(v) {
        this.#paymentMethod = v ? String(v).trim() : null;
        this.#touch();
    }
    setStatus(v) {
        const allowed = [
            "pending",
            "requires_action",
            "processing",
            "succeeded",
            "failed",
            "canceled",
        ];
        if (!allowed.includes(v)) throw new Error(`Invalid status: ${v}`);
        this.#status = v;
        this.#touch();
    }
    setAmount(v) {
        const n = Number(v);
        if (!Number.isFinite(n) || n < 0)
            throw new Error("amount must be non-negative");
        this.#amount = n;
        this.#touch();
    }
    setCurrency(v) {
        this.#currency = (v ?? "AUD").toString().toUpperCase();
        this.#touch();
    }
    setPaidAt(v) {
        this.#paidAt = v ? new Date(v) : null;
        this.#touch();
    }
    setCardBrand(v) {
        this.#cardBrand = v ? String(v).trim() : null;
        this.#touch();
    }
    setCardLast4(v) {
        this.#cardLast4 = v ? String(v).trim() : null;
        this.#touch();
    }

    // --- Domain helpers ---
    isSuccessful() {
        return this.#status === "succeeded";
    }
    isPending() {
        return this.#status === "pending" || this.#status === "requires_action";
    }

    static fromRequest(body) {
        return new Transaction(body);
    }
    static fromDocument(doc) {
        if (!doc) return null;
        const o = typeof doc.toObject === "function" ? doc.toObject() : doc;
        return new Transaction(o);
    }

    toJSON() {
        return {
            id: this.id,
            donation: this.#donation,
            campaign: this.#campaign,
            checkoutSessionId: this.#checkoutSessionId,
            chargeId: this.#chargeId,
            paymentMethod: this.#paymentMethod,
            status: this.#status,
            amount: this.#amount,
            currency: this.#currency,
            paidAt: this.#paidAt,
            cardBrand: this.#cardBrand,
            cardLast4: this.#cardLast4,
            createdAt: this.#createdAt,
            updatedAt: this.#updatedAt,
        };
    }

    toInsertDB() {
        return {
            _id: this.#_id ?? undefined,
            donation: this.#donation,
            campaign: this.#campaign,
            checkoutSessionId: this.#checkoutSessionId,
            chargeId: this.#chargeId,
            paymentMethod: this.#paymentMethod,
            status: this.#status,
            amount: this.#amount,
            currency: this.#currency,
            paidAt: this.#paidAt,
            cardBrand: this.#cardBrand,
            cardLast4: this.#cardLast4,
            createdAt: this.#createdAt,
            updatedAt: this.#updatedAt,
        };
    }

    toUpdateDB() {
        return {
            $set: {
                donation: this.#donation,
                campaign: this.#campaign,
                checkoutSessionId: this.#checkoutSessionId,
                chargeId: this.#chargeId,
                paymentMethod: this.#paymentMethod,
                status: this.#status,
                amount: this.#amount,
                currency: this.#currency,
                paidAt: this.#paidAt,
                cardBrand: this.#cardBrand,
                cardLast4: this.#cardLast4,
                updatedAt: new Date(),
            },
        };
    }

    #touch() {
        this.#updatedAt = new Date();
    }
}

export default Transaction;
