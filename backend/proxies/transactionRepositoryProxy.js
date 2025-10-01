class TransactionRepositoryProxy {
    constructor(transactionRepository, currentUser = null) {
        this.transactionRepository = transactionRepository;
        this.user = currentUser;
    }

    // TODO: Add proxy methods as needed
}

export default TransactionRepositoryProxy;