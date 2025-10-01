import MailTemplate from "../models/MailTemplate.js";
import BaseRepository from "./baseRepository.js";

class MailTemplateRepository extends BaseRepository {
    constructor() {
        super(MailTemplate);
    }
}

export default MailTemplateRepository;
