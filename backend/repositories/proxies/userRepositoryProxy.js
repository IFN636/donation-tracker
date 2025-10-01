class UserRepositoryProxy {
    constructor(userRepository, currentUser = null) {
        this.userRepository = userRepository;
        this.user = currentUser;
    }
}

export default UserRepositoryProxy;
