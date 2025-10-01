import User, { ROLE } from "./User.js";

class Admin extends User {
    #isSuperAdmin;

    constructor({ id, name, email, password, address, isSuperAdmin = false }) {
        super({
            id,
            name,
            email,
            password,
            address,
            role: ROLE.ADMIN,
            isSuperAdmin,
        });
        this.#isSuperAdmin = isSuperAdmin;
    }

    isSuperAdmin() {
        return this.#isSuperAdmin;
    }

    getRole() {
        return ROLE.ADMIN;
    }

    toJSON() {
        return {
            id: this.getId(),
            name: this.getFullName(),
            email: this.getEmail(),
            role: ROLE.ADMIN,
            isSuperAdmin: this.#isSuperAdmin,
        };
    }
}

export default Admin;