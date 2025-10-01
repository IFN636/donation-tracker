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

    get isSuperAdmin() {
        return this.#isSuperAdmin;
    }

    toJSON() {
        return {
            id: this.getId(),
            name: this.getFullName(),
            email: this.getEmail(),
            role: this.role,
            isSuperAdmin: this.#isSuperAdmin,
        };
    }
}

export default Admin;