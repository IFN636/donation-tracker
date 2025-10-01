import NodemailerAdapter from "../adapters/nodeMailAdapter.js";
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
        const emailFacade = new EmailFacade(new NodemailerAdapter());
        console.log("Sending welcome email to:", user.email);
        emailFacade.sendWelcomeEmail(user.email, user);
    });
}