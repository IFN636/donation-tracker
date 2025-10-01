import NodemailerAdapter from "../adapters/nodeMailAdapter.js";
import UserFactory from "../factories/UserFactory.js";

export function subscribeToEvent(subject, eventType, fn) {
    subject.subscribe(eventType, fn);
}

export function initEventSubscribers(subject) {
    subscribeToEvent(subject, "DONATION_CREATED", (data) => {
        console.log("Global event triggered", data);
    });

    subscribeToEvent(subject, "USER_CREATED", (data) => {
        const user = UserFactory.userToDomain(data);

        // TODO: Add to Facade Pattern
        const mailAdapter = new NodemailerAdapter();
        mailAdapter.sendEmail(
            user.email,
            "Welcome to our platform",
            "Welcome to our platform"
        );
    });
}