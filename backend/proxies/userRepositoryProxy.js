class UserRepositoryProxy {
    constructor(userRepository, currentUser = null) {
        this.userRepository = userRepository;
        this.user = currentUser;
    }

    // TODO: Add proxy methods as needed
}

export default UserRepositoryProxy;