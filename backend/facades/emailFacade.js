import nodemailer from "nodemailer";

class EmailFacade {
    constructor() {
        if (EmailFacade.instance) return EmailFacade.instance;

        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        EmailFacade.instance = this;
    }

    async sendEmail(to, subject, text) {
        return this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            text,
        });
    }

    async sendInvoice(to, invoiceLink) {
        const subject = "Your Invoice";
        const text = `You can download your invoice from the following link: ${invoiceLink}`;
        return this.sendEmail(to, subject, text);
    }

    async sendThankYou(to, amount) {
        const subject = "Thank you for your donation!";
        const text = `We truly appreciate your generous donation of $${amount}.`;
        return this.sendEmail(to, subject, text);
    }

    async sendPasswordReset(to, resetLink) {
        const subject = "Password Reset Request";
        const text = `Click the link to reset your password: ${resetLink}`;
        return this.sendEmail(to, subject, text);
    }
}

export default new EmailFacade();
