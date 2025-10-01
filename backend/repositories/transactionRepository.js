import Transaction from "../models/Transaction.js";
import BaseRepository from "./baseRepository.js";

class TransactionRepository extends BaseRepository {
    constructor() {
        super(Transaction);
    }
}

export default TransactionRepository;