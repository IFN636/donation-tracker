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
        this.setTitle(title);
        this.setDescription(description);
        this.setGoalAmount(goalAmount);
        this.setCurrency(currency);
        this.setDeadline(deadline);
        this.setImageUrl(imageUrl);
        this.#createdBy = createdBy;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
        this.setCurrentAmount(currentAmount);
        this.setBackers(backers);
        this.setStatus(status);
    }

    get _id() {
        return this.#_id;
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get goalAmount() {
        return this.#goalAmount;
    }

    get currentAmount() {
        return this.#currentAmount;
    }

    get backers() {
        return this.#backers;
    }

    get currency() {
        return this.#currency;
    }

    get deadline() {
        return this.#deadline;
    }

    get imageUrl() {
        return this.#imageUrl;
    }

    get status() {
        return this.#status;
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

    setTitle(value) {
        this.#title = value?.trim();
        this.#touch();
    }

    setDescription(value) {
        this.#description = value?.trim();
        this.#touch();
    }

    setGoalAmount(value) {
        if (value < 0) throw new Error("goalAmount cannot be negative");
        this.#goalAmount = Number(value);
        this.#touch();
    }

    setCurrentAmount(value) {
        if (value < 0) throw new Error("currentAmount cannot be negative");
        this.#currentAmount = Number(value);
        if (this.#currentAmount >= this.#goalAmount) {
            this.#status = "completed";
        }
        this.#touch();
    }

    setBackers(value) {
        if (value < 0) throw new Error("backers cannot be negative");
        this.#backers = Number(value);
        this.#touch();
    }

    setCurrency(value) {
        this.#currency = value.toUpperCase();
        this.#touch();
    }

    setDeadline(value) {
        this.#deadline = value ? new Date(value) : null;
        this.#touch();
    }

    setImageUrl(value) {
        this.#imageUrl = value || "https://via.placeholder.com/150";
        this.#touch();
    }

    setStatus(value) {
        const valid = ["active", "completed", "cancelled"];
        if (!valid.includes(value)) throw new Error(`Invalid status: ${value}`);
        this.#status = value;
        this.#touch();
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
        this.setCurrentAmount(this.#currentAmount + amount);
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
