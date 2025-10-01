class Campaign {
    #_id;
    #title;
    #description;
    #goalAmount;
    #currency;
    #deadline;
    #imageUrl;
    #createdBy;
    #createdAt;
    #updatedAt;
    #currentAmount;
    #backers;
    #status;

    constructor({
        _id,
        title,
        description = "",
        goalAmount,
        currency = "AUD",
        deadline,
        imageUrl = "https://via.placeholder.com/150",
        createdBy,
        createdAt = new Date(),
        updatedAt = new Date(),
        currentAmount = 0,
        backers = 0,
        status = "active",
    }) {
        this.#_id = _id;
        this.title = title;
        this.description = description;
        this.goalAmount = goalAmount;
        this.currency = currency;
        this.deadline = deadline;
        this.imageUrl = imageUrl;
        this.#createdBy = createdBy;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
        this.currentAmount = currentAmount;
        this.backers = backers;
        this.status = status;
    }

    get _id() {
        return this.#_id;
    }

    get title() {
        return this.#title;
    }
    set title(value) {
        this.#title = value?.trim();
        this.#touch();
    }

    get description() {
        return this.#description;
    }
    set description(value) {
        this.#description = value?.trim();
        this.#touch();
    }

    get goalAmount() {
        return this.#goalAmount;
    }
    set goalAmount(value) {
        if (value < 0) throw new Error("goalAmount cannot be negative");
        this.#goalAmount = Number(value);
        this.#touch();
    }

    get currentAmount() {
        return this.#currentAmount;
    }
    set currentAmount(value) {
        if (value < 0) throw new Error("currentAmount cannot be negative");
        this.#currentAmount = Number(value);
        if (this.#currentAmount >= this.#goalAmount) {
            this.#status = "completed";
        }
        this.#touch();
    }

    get backers() {
        return this.#backers;
    }
    set backers(value) {
        if (value < 0) throw new Error("backers cannot be negative");
        this.#backers = Number(value);
        this.#touch();
    }

    get currency() {
        return this.#currency;
    }
    set currency(value) {
        this.#currency = value.toUpperCase();
        this.#touch();
    }

    get deadline() {
        return this.#deadline;
    }
    set deadline(value) {
        this.#deadline = value ? new Date(value) : null;
        this.#touch();
    }

    get imageUrl() {
        return this.#imageUrl;
    }
    set imageUrl(value) {
        this.#imageUrl = value || "https://via.placeholder.com/150";
        this.#touch();
    }

    get status() {
        return this.#status;
    }
    set status(value) {
        const valid = ["active", "completed", "cancelled"];
        if (!valid.includes(value)) throw new Error(`Invalid status: ${value}`);
        this.#status = value;
        this.#touch();
    }

    get createdBy() {
        return this.#createdBy;
    }

    get createdAt() {
        return this.#createdAt;
    }

    get updatedAt() {
        return this.#updatedAt;
    }

    getProgressPercent() {
        if (this.#goalAmount === 0) return 0;
        return Math.min((this.#currentAmount / this.#goalAmount) * 100, 100);
    }

    getDaysLeft() {
        if (!this.#deadline) return null;
        return Math.ceil(
            (new Date(this.#deadline) - new Date()) / (1000 * 60 * 60 * 24)
        );
    }

    isExpired() {
        return this.getDaysLeft() !== null && this.getDaysLeft() < 0;
    }

    getStatus() {
        if (this.isExpired()) return "expired";
        if (this.getDaysLeft() !== null && this.getDaysLeft() <= 7)
            return "closing soon";
        return this.#status;
    }

    addContribution(amount) {
        if (amount <= 0) throw new Error("Contribution must be positive");
        this.currentAmount = this.#currentAmount + amount; // uses setter
    }

    #touch() {
        this.#updatedAt = new Date();
    }

    toJSON() {
        return {
            _id: this.#_id,
            title: this.#title,
            description: this.#description,
            goalAmount: this.#goalAmount,
            currency: this.#currency,
            deadline: this.#deadline,
            imageUrl: this.#imageUrl,
            createdBy: this.#createdBy,
            createdAt: this.#createdAt,
            updatedAt: this.#updatedAt,
            currentAmount: this.#currentAmount,
            backers: this.#backers,
            progressPercent: this.getProgressPercent(),
            status: this.getStatus(),
            daysLeft: this.getDaysLeft(),
        };
    }

    toInsertDB() {
        return {
            _id: this.#_id,
            title: this.#title,
            description: this.#description,
            goalAmount: this.#goalAmount,
            currentAmount: this.#currentAmount,
            backers: this.#backers,
            currency: this.#currency,
            deadline: this.#deadline,
            imageUrl: this.#imageUrl,
            createdBy: this.#createdBy,
            createdAt: this.#createdAt,
            updatedAt: this.#updatedAt,
        };
    }
}

export default Campaign;