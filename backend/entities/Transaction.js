class Transaction {
    #_id;
    #donationId;
    #campaignId;
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
        donationId = null,
        campaignId = null,
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
        this.donationId = donationId;
        this.campaignId = campaignId;
        this.checkoutSessionId = checkoutSessionId;
        this.chargeId = chargeId;
        this.paymentMethod = paymentMethod;
        this.status = status;
        this.amount = amount;
        this.currency = currency;
        this.paidAt = paidAt;
        this.cardBrand = cardBrand;
        this.cardLast4 = cardLast4;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    get id() {
        return this.#_id?.toString() ?? null;
    }
    get donationId() {
        return this.#donationId;
    }
    get campaignId() {
        return this.#campaignId;
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

    set donationId(v) {
        this.#donationId = v ?? null;
        this.#touch();
    }
    set campaignId(v) {
        this.#campaignId = v ?? null;
        this.#touch();
    }

    set checkoutSessionId(v) {
        if (!v) throw new Error("checkoutSessionId required");
        this.#checkoutSessionId = String(v).trim();
        this.#touch();
    }

    set chargeId(v) {
        this.#chargeId = v ? String(v).trim() : null;
        this.#touch();
    }
    set paymentMethod(v) {
        this.#paymentMethod = v ? String(v).trim() : null;
        this.#touch();
    }

    set status(v) {
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

    set amount(v) {
        const n = Number(v);
        if (!Number.isFinite(n) || n < 0)
            throw new Error("amount must be non-negative");
        this.#amount = n;
        this.#touch();
    }

    set currency(v) {
        this.#currency = (v ?? "AUD").toString().toUpperCase();
        this.#touch();
    }

    set paidAt(v) {
        this.#paidAt = v ? new Date(v) : null;
        this.#touch();
    }
    set cardBrand(v) {
        this.#cardBrand = v ? String(v).trim() : null;
        this.#touch();
    }
    set cardLast4(v) {
        this.#cardLast4 = v ? String(v).trim() : null;
        this.#touch();
    }

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
            donationId: this.#donationId,
            campaignId: this.#campaignId,
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
            donationId: this.#donationId,
            campaignId: this.#campaignId,
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
                donationId: this.#donationId,
                campaignId: this.#campaignId,
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