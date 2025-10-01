import User from "./User.js";

class Admin extends User {
    #isSuperAdmin;
    #role;

    constructor({
        id,
        name,
        email,
        password,
        address,
        stripeCustomerId,
        paymentMethods,
        isSuperAdmin = false,
    }) {
        super({
            id,
            name,
            email,
            password,
            address,
            stripeCustomerId,
            paymentMethods,
        });
        this.#role = "admin";
        this.#isSuperAdmin = isSuperAdmin;
    }

    isSuperAdmin() {
        return this.#isSuperAdmin;
    }

    getRole() {
        return this.#role;
    }

    toJSON() {
        return {
            id: this.getId(),
            name: this.getFullName(),
            email: this.getEmail(),
            role: this.#role,
            isSuperAdmin: this.#isSuperAdmin,
        };
    }
}

export default Admin;
