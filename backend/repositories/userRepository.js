import User from "../models/User.js";
import BaseRepository from "./baseRepository.js";

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async findByEmail(email) {
        return this._model.findOne({ email });
    }

    // TODO: Add more user-specific methods as needed
}

export default UserRepository;
