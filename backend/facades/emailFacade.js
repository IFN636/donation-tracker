class EmailFacade {
    constructor(mailAdapter) {
        if (!mailAdapter) {
            throw new Error("Mail adapter is required");
        }
        this.mailAdapter = mailAdapter;
    }

    async sendInvoice(to, invoiceLink) {
        const subject = "Your Invoice";
        const text = `You can download your invoice from the following link: ${invoiceLink}`;
        return this.mailAdapter.sendMail({
            to,
            subject,
            text,
        });
    }

    async sendMailWithTemplate(to, subject, template) {
        return this.mailAdapter.sendMail({
            to,
            subject,
            html: template,
        });
    }

    async sendMailThankYou(to, subject, template) {
        return this.mailAdapter.sendMail({
            to,
            subject,
            html: template,
        });
    }
}

export default EmailFacade;