class Campaign {
    #id;
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
        id,
        title,
        description,
        goalAmount,
        currency,
        deadline,
        imageUrl,
        createdBy,
        createdAt = new Date(),
        updatedAt = new Date(),
        currentAmount = 0,
        backers = 0,
        status = "active",
    }) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#goalAmount = goalAmount;
        this.#currency = currency;
        this.#deadline = deadline;
        this.#imageUrl = imageUrl;
        this.#createdBy = createdBy;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
        this.#currentAmount = currentAmount;
        this.#backers = backers;
        this.#status = status;
    }

    getId() {
        return this.#id;
    }

    getTitle() {
        return this.#title;
    }

    getProgressPercent() {
        if (this.#goalAmount === 0) return 0;
        return Math.min((this.#currentAmount / this.#goalAmount) * 100, 100);
    }

    getDaysLeft() {
        return Math.ceil(
            (new Date(this.#deadline) - new Date()) / (1000 * 60 * 60 * 24)
        );
    }

    isExpired() {
        return this.getDaysLeft() < 0;
    }

    getStatus() {
        if (this.isExpired()) return "expired";
        if (this.getDaysLeft() <= 7) return "closing soon";
        return "active";
    }

    setCurrentAmount(amount) {
        this.#currentAmount += amount;
        this.#updatedAt = new Date();
        if (this.#currentAmount >= this.#goalAmount) {
            this.#status = "completed";
        }
    }

    setBackers(backers) {
        this.#backers = backers;
    }
    setStatus(status) {
        this.#status = status;
    }

    toJSON() {
        return {
            id: this.#id,
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
            _id: this.#id,
            title: this.#title,
            description: this.#description,
            goalAmount: this.#goalAmount,
            currentAmount: this.#currentAmount,
            backers: this.#backers,
            currency: this.#currency,
            deadline: this.#deadline,
            imageUrl: this.#imageUrl,
            status: this.getStatus(),
            createdBy: this.#createdBy,
            createdAt: this.#createdAt,
            updatedAt: this.#updatedAt,
        };
    }
}

export default Campaign;