class User {
    #name;
    #lastName;
    #email;
    #password;
    #address;
    #stripeCustomerId;
    #paymentMethods;
    #_id;

    constructor({
        id,
        name,
        lastName,
        email,
        password,
        address = "",
        stripeCustomerId = "",
        paymentMethods = [],
    }) {
        this.#_id = id;
        this.#name = name;
        this.#lastName = lastName;
        this.#email = email.toLowerCase().trim();
        this.#password = password;
        this.#address = address;
        this.#stripeCustomerId = stripeCustomerId;
        this.#paymentMethods = paymentMethods;
    }

    getId() {
        return this.#_id;
    }

    getEmail() {
        return this.#email;
    }

    getFullName() {
        return `${this.#name} ${this.#lastName || ""}`.trim();
    }

    getAddress() {
        return this.#address;
    }

    // Abstract method
    getRole() {
        throw new Error("Method not implemented.");
    }

    getPaymentMethods() {
        return this.#paymentMethods;
    }

    addPaymentMethod(method) {
        this.#paymentMethods.push(method);
    }

    changeAddress(newAddress) {
        this.#address = newAddress;
    }

    // Abstract method
    toJSON() {
        throw new Error("Method not implemented.");
    }
}

export default User;
