class UserRepositoryProxy {
    constructor(userRepository, currentUser = null) {
        this.userRepository = userRepository;
        this.user = currentUser;
    }

    // TODO: Add proxy methods as needed
}

export default UserRepositoryProxy;import User from "../models/User.js";
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