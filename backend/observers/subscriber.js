import EmailFacade from "../facades/emailFacade.js";

export function subscribeToEvent(subject, eventType, fn) {
    subject.subscribe(eventType, fn);
}

export function initEventSubscribers(subject) {
    subscribeToEvent(subject, "DONATION_CREATED", (data) => {
        console.log("Global event triggered", data);
    });

    subscribeToEvent(subject, "USER_CREATED", (user) => {
        if (!user.email) return;
        const emailFacade = new EmailFacade();
        emailFacade.sendWelcomeEmail(user.email, user);
    });

    subscribeToEvent(subject, "DONATION_SUCCESS", (donation) => {
        if (!donation.email) return;
        const emailFacade = new EmailFacade();
        emailFacade.sendMailThankYou(donation);
    });
}
