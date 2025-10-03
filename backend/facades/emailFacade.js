import NodemailerAdapter from "../adapters/nodeMailAdapter.js";

class EmailFacade {
    constructor() {
        this.mailAdapter = new NodemailerAdapter();
    }

    sendMailWithTemplate({ to, subject, template }) {
        console.log("Sending email to:", to);
        this.mailAdapter.sendEmail({
            to,
            subject,
            content: template,
        });
    }

    sendInvoice(to, invoiceLink) {
        const subject = "Your Invoice";
        const text = `You can download your invoice from the following link: ${invoiceLink}`;
        return this.sendMailWithTemplate({
            to,
            subject,
            template: text,
        });
    }

    sendWelcomeEmail(to, user) {
        const subject = `Welcome to Online Donation Tracker App, ${user.name}!`;
        const welcomeEmailHtml = `
            <body style="font-family: Arial, sans-serif; line-height: 1.5; color: #333333; margin: 0; padding: 20px;">
            <p>Hi <strong>${user.name}</strong>,</p>
            
            <p>Welcome to <strong>Online Donation Tracker App</strong>! We’re happy to have you with us.</p>
            
            <p>With our app, you can easily track and manage all your donations in one place.</p>
            
            <p>
                👉 
                <a href="#" style="display: inline-block; padding: 10px 15px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px;">
                Log in to get started
                </a>
            </p>
            <p>If you have any questions, we’re always here to help at 
                <a href="mailto:support@donationtracker.com">support@donationtracker.com</a>.
            </p>
            <p>Thanks for joining us!<br>
            <strong>The Online Donation Tracker App Team</strong></p>
            </body>
        `;


        this.sendMailWithTemplate({
            to,
            subject,
            template: welcomeEmailHtml,
        });
    }

    sendMailThankYou(donation) {
        const subject = "Thank You for Your Donation!";
        const thankYouEmailHtml = `
            <body style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                <p>Hi ${donation.name},</p>
                <p>Thank you for your donation! Your support makes a real difference, and we’re very grateful.</p>
                <p>With appreciation,<br>The Team</p>
            </body>
        `;
        this.sendMailWithTemplate({
            to: donation.email,
            subject,
            template: thankYouEmailHtml,
        });
    }
}

export default EmailFacade;
