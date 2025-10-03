import nodemailer from "nodemailer";

class NodemailerAdapter {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    sendEmail({ to, subject, content }) {
        return this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            html: content,
        });
    }
}

export default NodemailerAdapter;
