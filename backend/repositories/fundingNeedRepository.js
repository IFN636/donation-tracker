import FundingNeed from "../models/FundingNeed.js";
import BaseRepository from "./baseRepository.js";

class FundingNeedRepository extends BaseRepository {
    constructor() {
        super(FundingNeed);
    }
}

export default FundingNeedRepository;
