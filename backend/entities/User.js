export const ROLE = Object.freeze({
    ADMIN: "admin",
    PARTICIPANT: "participant",
});
export const STATUS = Object.freeze({
    ACTIVE: "active",
    BLOCKED: "blocked",
    PENDING: "pending",
});

class User {
    #_id;
    #name;
    #email;
    #password;
    #address;
    #role;
    #isSuperAdmin;
    #status;
    #createdAt;
    #updatedAt;

    constructor({
        _id = null,
        name,
        email,
        password,
        address = null,
        role = ROLE.PARTICIPANT,
        isSuperAdmin = false,
        status = STATUS.ACTIVE,
        createdAt = new Date(),
        updatedAt = new Date(),
    }) {
        this.#_id = _id ?? null;
        this.name = name;
        this.email = email;
        this.#password = password ?? null;
        this.address = address;
        this.role = role;
        this.isSuperAdmin = isSuperAdmin;
        this.status = status;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    get id() {
        return this.#_id?.toString() ?? null;
    }
    set _id(v) {
        this.#_id = v ?? null;
        this.#touch();
    }

    get name() {
        return this.#name;
    }
    set name(v) {
        if (!v) throw new Error("name is required");
        const t = String(v).trim();
        if (!t) throw new Error("name cannot be empty");
        this.#name = t;
        this.#touch();
    }

    get email() {
        return this.#email;
    }
    set email(v) {
        if (!v) throw new Error("email is required");
        const t = String(v).trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))
            throw new Error("Invalid email");
        this.#email = t;
        this.#touch();
    }

    get hasPassword() {
        return Boolean(this.#password);
    }
    get passwordHash() {
        return this.#password;
    }

    get address() {
        return this.#address;
    }
    set address(v) {
        this.#address = v == null ? null : String(v).trim();
        this.#touch();
    }

    get role() {
        return this.#role;
    }
    set role(v) {
        const val = String(v);
        if (![ROLE.ADMIN, ROLE.PARTICIPANT].includes(val))
            throw new Error("Invalid role");
        this.#role = val;
        this.#touch();
    }

    get isSuperAdmin() {
        return this.#isSuperAdmin;
    }
    set isSuperAdmin(v) {
        this.#isSuperAdmin = Boolean(v);
        this.#touch();
    }

    get status() {
        return this.#status;
    }
    set status(v) {
        const val = String(v);
        if (![STATUS.ACTIVE, STATUS.BLOCKED, STATUS.PENDING].includes(val)) {
            throw new Error("Invalid status");
        }
        this.#status = val;
        this.#touch();
    }

    get createdAt() {
        return this.#createdAt;
    }
    get updatedAt() {
        return this.#updatedAt;
    }

    async setPasswordPlain(plain, saltRounds = 10) {
        if (!plain || String(plain).length < 6) {
            throw new Error("Password must be at least 6 characters");
        }
        const salt = await genSalt(saltRounds);
        this.#password = await bcryptHash(String(plain), salt);
        this.#touch();
    }

    async comparePassword(plain) {
        if (!this.#password) return false;
        return bcryptCompare(String(plain), this.#password);
    }

    isAdmin() {
        return this.#role === ROLE.ADMIN;
    }
    isParticipant() {
        return this.#role === ROLE.PARTICIPANT;
    }

    static fromRequest(body) {
        return new this({
            _id: body._id ?? null,
            name: body.name,
            email: body.email,
            password: body.password ?? null,
            address: body.address ?? null,
            role: body.role ?? ROLE.PARTICIPANT,
            isSuperAdmin: body.isSuperAdmin ?? false,
            status: body.status ?? STATUS.ACTIVE,
            createdAt: body.createdAt ?? new Date(),
            updatedAt: body.updatedAt ?? new Date(),
        });
    }

    static fromDocument(doc) {
        if (!doc) return null;
        const o = typeof doc.toObject === "function" ? doc.toObject() : doc;
        return new this({
            _id: o._id,
            name: o.name,
            email: o.email,
            password: o.password,
            address: o.address ?? null,
            role: o.role ?? ROLE.PARTICIPANT,
            isSuperAdmin: o.isSuperAdmin ?? false,
            status: o.status ?? STATUS.ACTIVE,
            createdAt: o.createdAt ?? new Date(),
            updatedAt: o.updatedAt ?? new Date(),
        });
    }

    toJSON({ includeSensitive = false } = {}) {
        const base = {
            id: this.id,
            _id: this.#_id,
            name: this.#name,
            email: this.#email,
            address: this.#address,
            role: this.#role,
            isSuperAdmin: this.#isSuperAdmin,
            status: this.#status,
            createdAt: this.#createdAt,
            updatedAt: this.#updatedAt,
        };
        if (includeSensitive) base.password = this.#password;
        return base;
    }

    toInsertDB() {
        return {
            _id: this.#_id ?? undefined,
            name: this.#name,
            email: this.#email,
            password: this.#password,
            address: this.#address,
            role: this.#role,
            isSuperAdmin: this.#isSuperAdmin,
            status: this.#status,
            createdAt: this.#createdAt,
            updatedAt: this.#updatedAt,
        };
    }

    toUpdateDB() {
        return {
            $set: {
                name: this.#name,
                email: this.#email,
                ...(this.#password ? { password: this.#password } : {}),
                address: this.#address,
                role: this.#role,
                isSuperAdmin: this.#isSuperAdmin,
                status: this.#status,
                updatedAt: new Date(),
            },
        };
    }

    #touch() {
        this.#updatedAt = new Date();
    }
}
export default User;